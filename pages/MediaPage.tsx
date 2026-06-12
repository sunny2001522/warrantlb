import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "../components/Reveal";
import { SiteHeader, SiteFooter, usePageMeta } from "../components/SiteChrome";
import {
  YOUTUBE_CHANNEL_URL,
  EBC_SHOW_CHANNEL_URL,
  FEATURED_VIDEOS,
  CMONEY_COURSES,
  SOCIAL_LINKS,
} from "../siteContent";
import { DAREN_SHOW_VIDEOS, CHIP_REPORT_VIDEOS, type PlaylistVideo } from "../mediaVideos";

/* ── 播放清單定義 ── */
interface Playlist {
  key: string;
  title: string;
  desc: string;
  videos: PlaylistVideo[];
  moreUrl: string;
}

const FEATURED_AS_PLAYLIST: PlaylistVideo[] = FEATURED_VIDEOS.filter((v) => v.videoId).map((v) => ({
  title: v.title,
  videoId: v.videoId!,
  duration: "",
  date: "",
}));

const PLAYLISTS: Playlist[] = [
  {
    key: "daren",
    title: "理財達人秀|權證小哥",
    desc: "東森《理財達人秀》常駐嘉賓,每集拆解盤面籌碼與處置股動態",
    videos: DAREN_SHOW_VIDEOS,
    moreUrl: EBC_SHOW_CHANNEL_URL,
  },
  {
    key: "chip",
    title: "哥有籌必爆",
    desc: "小哥的籌碼觀察固定單元,主力分點、大戶買賣超有籌必報",
    videos: CHIP_REPORT_VIDEOS,
    moreUrl: EBC_SHOW_CHANNEL_URL,
  },
  {
    key: "featured",
    title: "精選籌碼教學",
    desc: "關鍵分點、主力籌碼、短線戰法",
    videos: FEATURED_AS_PLAYLIST,
    moreUrl: YOUTUBE_CHANNEL_URL,
  },
];

const fmtViews = (n?: number) => {
  if (!n) return "";
  if (n >= 10000) return `${(n / 10000).toFixed(1)}萬 次觀看`;
  return `${n.toLocaleString()} 次觀看`;
};

/** 橫向列影片卡 (YT 風格) */
const RowCard: React.FC<{ video: PlaylistVideo; onPlay: () => void }> = ({ video, onPlay }) => (
  <button
    onClick={onPlay}
    className="flex-shrink-0 w-64 md:w-80 snap-start text-left bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.25rem] overflow-hidden hover:border-[#d4af37] hover:-translate-y-1 transition-all group"
  >
    <div className="relative aspect-video bg-black overflow-hidden">
      <img
        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
        alt={video.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors flex items-center justify-center">
        <div className="w-11 h-11 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
          <i className="fas fa-play text-white text-sm ml-0.5"></i>
        </div>
      </div>
      {video.duration && (
        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] md:text-xs font-black">
          {video.duration}
        </span>
      )}
    </div>
    <div className="p-3 md:p-4">
      <h3 className="text-white text-sm md:text-base font-bold leading-snug line-clamp-2 group-hover:text-[#d4af37] transition-colors">
        {video.title}
      </h3>
      <p className="text-gray-600 text-[10px] md:text-xs font-bold mt-2">
        {fmtViews(video.views)}
        {video.views && video.date ? " · " : ""}
        {video.date}
      </p>
    </div>
  </button>
);

/** 影音專區 — 一行橫向滑動 + 點擊進入播放器(含系列清單) */
const MediaPage: React.FC = () => {
  usePageMeta({
    title: "影音專區|理財達人秀・哥有籌必爆・線上課程 - 權證小哥官網",
    description:
      "權證小哥影音專區:東森《理財達人秀》節目精華、哥有籌必爆籌碼觀察單元、精選籌碼教學影片與 CMoney 線上影音課程,站內直接播放。",
    keywords: "權證小哥影片,理財達人秀,哥有籌必爆,籌碼教學,權證小哥課程",
    url: "https://warrantlb8888.cmoney.tw/media",
  });

  const [playing, setPlaying] = useState<{ playlistKey: string; videoId: string } | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const activePlaylist = playing ? PLAYLISTS.find((p) => p.key === playing.playlistKey) : null;
  const activeVideo = activePlaylist?.videos.find((v) => v.videoId === playing?.videoId);

  useEffect(() => {
    if (playing && playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [playing]);

  const play = (playlistKey: string, videoId: string) => setPlaying({ playlistKey, videoId });

  return (
    <div className="min-h-screen bg-[#0a1228] text-white selection:bg-[#d4af37] selection:text-black">
      <SiteHeader active="/media" />

      {/* Hero */}
      <section className="relative pt-24 md:pt-36 pb-8 md:pb-12 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#0d1d42] to-[#0a1228]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#2563eb]/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="text-[#d4af37] text-sm md:text-base font-black tracking-[0.3em] mb-3">
              VIDEO & COMMUNITY
            </p>
            <h1 className="text-3xl md:text-6xl font-black serif-font italic text-gold-gradient leading-tight mb-5">
              影音專區
            </h1>
            <p className="text-gray-300 text-[15px] md:text-lg leading-relaxed serif-font max-w-3xl mx-auto mb-6">
              理財達人秀節目精華、哥有籌必爆籌碼觀察,小哥親自拆解每一個賺賠背後的籌碼真相。
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-7 md:px-10 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm md:text-base font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              <i className="fab fa-youtube text-lg md:text-xl"></i>
              訂閱權證小哥頻道
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── 播放器 + 系列清單 (點擊影片後出現) ── */}
      {playing && activePlaylist && (
        <section ref={playerRef} className="scroll-mt-20 md:scroll-mt-28 px-4 md:px-6 pb-8 md:pb-12">
          <div className="max-w-7xl mx-auto bg-[#0d1830] border border-[#2563eb]/30 rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden">
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/10">
              <p className="text-[#d4af37] text-sm md:text-base font-black tracking-widest">
                {activePlaylist.title}
              </p>
              <button
                onClick={() => setPlaying(null)}
                aria-label="關閉播放器"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/15 text-gray-400 hover:text-white hover:border-white/40 transition-all flex items-center justify-center"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>
            <div className="flex flex-col lg:flex-row">
              {/* 播放器 */}
              <div className="lg:flex-1 min-w-0">
                <div className="aspect-video bg-black">
                  <iframe
                    key={playing.videoId}
                    src={`https://www.youtube.com/embed/${playing.videoId}?autoplay=1&rel=0`}
                    title={activeVideo?.title ?? "影片播放"}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4 md:p-5">
                  <h2 className="text-white text-base md:text-xl font-black leading-snug">
                    {activeVideo?.title}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm font-bold mt-2">
                    {fmtViews(activeVideo?.views)}
                    {activeVideo?.views && activeVideo?.date ? " · " : ""}
                    {activeVideo?.date}
                  </p>
                </div>
              </div>

              {/* 系列影片清單 */}
              <div className="lg:w-96 lg:flex-shrink-0 border-t lg:border-t-0 lg:border-l border-white/10">
                <p className="px-4 py-3 text-gray-400 text-xs md:text-sm font-black tracking-widest border-b border-white/10">
                  系列影片({activePlaylist.videos.length})
                </p>
                <div className="max-h-[28rem] lg:max-h-[34rem] overflow-y-auto">
                  {activePlaylist.videos.map((v) => (
                    <button
                      key={v.videoId}
                      onClick={() => play(activePlaylist.key, v.videoId)}
                      className={`w-full flex gap-3 p-3 text-left transition-colors ${
                        v.videoId === playing.videoId
                          ? "bg-[#2563eb]/20 border-l-2 border-[#d4af37]"
                          : "hover:bg-white/5 border-l-2 border-transparent"
                      }`}
                    >
                      <div className="relative w-28 md:w-32 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-black">
                        <img
                          src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                          alt={v.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        {v.duration && (
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-black">
                            {v.duration}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-xs md:text-sm font-bold leading-snug line-clamp-2 ${
                            v.videoId === playing.videoId ? "text-[#d4af37]" : "text-white"
                          }`}
                        >
                          {v.title}
                        </p>
                        <p className="text-gray-600 text-[10px] md:text-xs font-bold mt-1">
                          {fmtViews(v.views)}
                          {v.views && v.date ? " · " : ""}
                          {v.date}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 各播放清單:一行橫向滑動 ── */}
      {PLAYLISTS.map((pl, idx) => (
        <section
          key={pl.key}
          className={`py-8 md:py-14 px-4 md:px-6 border-t border-white/5 ${
            idx % 2 === 0 ? "bg-gradient-to-b from-[#091022] to-[#0a1228]" : "bg-[#0a1228]"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="flex items-end justify-between gap-4 mb-5 md:mb-8">
                <div>
                  <h2 className="text-xl md:text-4xl font-black serif-font italic text-gold-gradient mb-1 md:mb-2">
                    {pl.title}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-base">{pl.desc}</p>
                </div>
                <a
                  href={pl.moreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full border border-[#d4af37]/60 text-[#d4af37] text-xs md:text-sm font-black tracking-widest hover:bg-[#d4af37] hover:text-black transition-all whitespace-nowrap"
                >
                  看更多
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </Reveal>
            <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-3 yt-row">
              {pl.videos.map((v) => (
                <RowCard key={v.videoId} video={v} onPlay={() => play(pl.key, v.videoId)} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 線上影音課程 — 一行橫向滑動 */}
      <section className="py-8 md:py-14 px-4 md:px-6 bg-gradient-to-b from-[#091022] to-[#0a1228] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between gap-4 mb-5 md:mb-8">
              <div>
                <h2 className="text-xl md:text-4xl font-black serif-font italic text-gold-gradient mb-1 md:mb-2">
                  線上影音課程
                </h2>
                <p className="text-gray-500 text-xs md:text-base">從新手班到 VVIP 進階戰法,完整課程體系</p>
              </div>
            </div>
          </Reveal>
          <div className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-3 yt-row">
            {CMONEY_COURSES.map((c) => (
              <a
                key={c.title}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 w-64 md:w-80 snap-start bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.25rem] overflow-hidden hover:border-[#d4af37] hover:-translate-y-1 transition-all group"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/75 border border-[#d4af37]/40 text-[#d4af37] text-[10px] md:text-xs font-black tracking-widest">
                    {c.tag}
                  </span>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-white text-sm md:text-base font-black serif-font leading-snug mb-1.5 group-hover:text-[#d4af37] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{c.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 社群矩陣 */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#0a1228] to-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              小哥的社群版圖
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">每日籌碼觀察、處置股情報,在這裡同步更新</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {SOCIAL_LINKS.map((s, i) => (
              <Reveal key={s.platform} delay={i * 80}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.25rem] p-5 md:p-6 hover:border-[#d4af37] hover:-translate-y-1 transition-all group h-full"
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 ${s.hoverColor} group-hover:text-white transition-all flex-shrink-0`}
                  >
                    <i className={`${s.icon} text-lg md:text-xl`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white text-base md:text-lg font-black serif-font group-hover:text-[#d4af37] transition-colors">
                      {s.platform}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm font-bold truncate">{s.handle}</p>
                    <p className="text-[#d4af37] text-xs md:text-sm font-black mt-0.5">{s.stat}</p>
                  </div>
                  <i className="fas fa-external-link-alt text-gray-600 group-hover:text-[#d4af37] text-xs ml-auto flex-shrink-0 transition-colors"></i>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default MediaPage;
