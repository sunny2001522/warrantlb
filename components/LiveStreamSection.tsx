import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../auth/AuthContext";
import { fetchLiveStream, type LiveStreamData } from "../firebase";

async function fetchYouTubeTitle(videoId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.title || null;
  } catch {
    return null;
  }
}

interface LiveStreamSectionProps {
  onStatusChange: (hasLiveStream: boolean) => void;
}

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) {
      // /live/VIDEO_ID or ?v=VIDEO_ID
      const liveMatch = u.pathname.match(/\/live\/([^/?]+)/);
      if (liveMatch) return liveMatch[1];
      return u.searchParams.get("v");
    }
  } catch {}
  return null;
}

function isInTimeWindow(scheduledTime: string): boolean {
  const scheduled = new Date(scheduledTime).getTime();
  const now = Date.now();
  const before30min = scheduled - 30 * 60 * 1000;
  const after3h = scheduled + 3 * 60 * 60 * 1000;
  return now >= before30min && now <= after3h;
}

const LiveStreamSection: React.FC<LiveStreamSectionProps> = ({ onStatusChange }) => {
  const { isAuthenticated, login, isLoginInProgress } = useAuth();
  const [liveData, setLiveData] = useState<LiveStreamData | null>(null);
  const [showStream, setShowStream] = useState(false);
  const [resolvedTitle, setResolvedTitle] = useState<string>("投資體驗課");
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    fetchLiveStream().then((data) => {
      setLiveData(data);
    }).catch(() => {
      setLiveData(null);
    });
  }, []);

  useEffect(() => {
    const active = !!(liveData && liveData.isActive &&
      (!liveData.scheduledTime || isInTimeWindow(liveData.scheduledTime)));
    setShowStream(active);
    onStatusChange(active);
  }, [liveData, onStatusChange]);

  // 標題解析：admin 有填就用，沒填就抓 YouTube 標題
  useEffect(() => {
    if (!liveData) return;
    if (liveData.title) {
      setResolvedTitle(liveData.title);
      return;
    }
    const videoId = extractVideoId(liveData.youtubeUrl);
    if (videoId) {
      fetchYouTubeTitle(videoId).then((ytTitle) => {
        setResolvedTitle(ytTitle || "投資體驗課");
      });
    }
  }, [liveData]);

  if (!showStream || !liveData) return null;

  const videoId = extractVideoId(liveData.youtubeUrl);
  if (!videoId) return null;

  const embedDomain = window.location.hostname;

  // 標題區塊（共用）
  const header = (
    <div className="text-center mt-16 mb-6 md:mb-10">
      <h2 className="text-xl
       md:text-4xl font-black text-gold-gradient serif-font leading-tight mb-3 md:mb-5  overflow-hidden text-ellipsis max-w-full px-2">
        {resolvedTitle}
      </h2>
      <div className="inline-flex items-center gap-2 md:gap-3 bg-black/40 border border-[#d4af37]/30 rounded-full px-5 md:px-8 py-2 md:py-3">
        <span className="relative flex h-3 w-3 md:h-4 md:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-red-600"></span>
        </span>
        <span className="text-white text-sm md:text-xl font-bold tracking-widest">
          限時免費直播中
        </span>
      </div>
    </div>
  );

  // 已登入：顯示 YT iframe + 聊天室
  if (isAuthenticated) {
    return (
      <section className="w-full py-8 md:py-14 px-4 md:px-6 bg-[#0a0806]">
        <div className="max-w-7xl mx-auto">
          {header}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 影片 */}
            <div className="flex-1 min-w-0">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={liveData.title || "直播"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            {/* 聊天室 */}
            <div className="w-full lg:w-[360px] flex-shrink-0">
              <iframe
                className="w-full rounded-2xl shadow-2xl"
                style={{ height: "500px" }}
                src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${embedDomain}`}
                title="直播聊天室"
                allow="clipboard-write"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 未登入：模糊縮圖 + 登入按鈕
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleLogin = useCallback(async () => {
    setLoginError(null);

    try {
      await login();
    } catch {
      setLoginError("登入服務目前忙碌，請稍後再試一次。");
    }
  }, [login]);

  return (
    <section className="w-full py-8 md:py-14 px-4 md:px-6 bg-[#0a0806]">
      <div className="max-w-5xl mx-auto">
        {header}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl" style={{ paddingBottom: "56.25%" }}>
          {/* 模糊背景 */}
          <div className="absolute inset-0">
            <img
              src={thumbnailUrl}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "blur(12px)", transform: "scale(1.1)" }}
            />
          </div>
          {/* 暗色覆蓋層 */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-white text-lg md:text-2xl font-bold mb-2">
                {liveData.title || "直播進行中"}
              </div>
              <p className="text-white/70 text-sm md:text-base mb-4">
                登入後即可觀看完整直播
              </p>
              {loginError && (
                <p className="text-red-300 text-xs md:text-sm mb-4">
                  {loginError}
                </p>
              )}
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoginInProgress}
              className="px-8 py-3 bg-[#d4af37] hover:bg-[#b8962e] disabled:bg-[#8f7b35] disabled:text-black/70 text-black font-bold text-sm md:text-base rounded-xl transition-colors shadow-lg cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoginInProgress ? "登入跳轉中..." : "立即登入觀看"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamSection;
