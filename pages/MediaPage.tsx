import React from "react";
import { Reveal } from "../components/Reveal";
import { SiteHeader, SiteFooter, usePageMeta } from "../components/SiteChrome";
import {
  YOUTUBE_CHANNEL_URL,
  TUTORIAL_SERIES,
  FEATURED_VIDEOS,
  SOCIAL_LINKS,
  type VideoItem,
} from "../siteContent";

const VideoCard: React.FC<{ video: VideoItem; index: number }> = ({ video, index }) => {
  const href = video.videoId
    ? `https://www.youtube.com/watch?v=${video.videoId}`
    : YOUTUBE_CHANNEL_URL;

  return (
    <Reveal delay={index * 100}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block bg-[#0b0f1a] border border-[#d4af37]/25 rounded-[1.25rem] overflow-hidden hover:border-[#d4af37] hover:-translate-y-1 transition-all group h-full"
      >
        <div className="relative aspect-video bg-gradient-to-br from-[#10182a] to-black flex items-center justify-center overflow-hidden">
          {video.videoId ? (
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <i className="fab fa-youtube text-red-600/70 text-5xl md:text-6xl"></i>
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="fas fa-play text-white text-base md:text-lg ml-0.5"></i>
            </div>
          </div>
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-[#d4af37]/40 text-[#d4af37] text-[10px] md:text-xs font-black tracking-widest">
            {video.tag}
          </span>
        </div>
        <div className="p-4 md:p-6">
          <h3 className="text-white text-base md:text-lg font-black serif-font leading-snug mb-2 group-hover:text-[#d4af37] transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{video.desc}</p>
        </div>
      </a>
    </Reveal>
  );
};

/** 影音與社群專區 — 仿 enru community/內容頁,聚合 YouTube 與社群平台 */
const MediaPage: React.FC = () => {
  usePageMeta({
    title: "影音專區|新手教學・籌碼分析影片 - 權證小哥官網",
    description:
      "權證小哥 YouTube 頻道超過 9 萬訂閱:新手教學系列(賺到第一桶金、如何分辨主力、強勢股為何也賠錢)、關鍵分點教學、主力籌碼短線戰法。同步追蹤 FB、IG、Telegram 與 PressPlay 交易筆記本。",
    keywords: "權證小哥 YouTube,新手教學,籌碼分析影片,關鍵分點,主力籌碼,權證小哥社群,交易筆記本",
    url: "https://warrantlb8888.cmoney.tw/media",
  });

  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-[#d4af37] selection:text-black">
      <SiteHeader active="/media" />

      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-10 md:pb-16 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="text-[#d4af37] text-sm md:text-base font-black tracking-[0.3em] mb-3">
              VIDEO & COMMUNITY
            </p>
            <h1 className="text-3xl md:text-6xl font-black serif-font italic text-gold-gradient leading-tight mb-6">
              影音專區
            </h1>
            <p className="text-gray-300 text-[15px] md:text-lg leading-relaxed serif-font max-w-3xl mx-auto mb-8">
              超過 9 萬人訂閱的 YouTube 頻道,從新手教學到主力籌碼實戰,
              小哥親自拆解每一個賺賠背後的籌碼真相。
            </p>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-base md:text-lg font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(220,38,38,0.3)]"
            >
              <i className="fab fa-youtube text-xl md:text-2xl"></i>
              訂閱權證小哥頻道
            </a>
          </Reveal>
        </div>
      </section>

      {/* 新手教學系列 */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#080c14] to-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              新手教學系列
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">三集打好籌碼基本功,從第一桶金開始</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {TUTORIAL_SERIES.map((v, i) => (
              <VideoCard key={v.title} video={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 精選影片 */}
      <section className="py-10 md:py-20 px-4 md:px-6 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              精選籌碼教學
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">關鍵分點、主力籌碼、短線戰法</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {FEATURED_VIDEOS.map((v, i) => (
              <VideoCard key={v.title} video={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 社群矩陣 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-black to-[#0a1528] border-t border-white/5">
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
                  className="flex items-center gap-4 bg-[#0b0f1a] border border-[#d4af37]/25 rounded-[1.25rem] p-5 md:p-6 hover:border-[#d4af37] hover:-translate-y-1 transition-all group h-full"
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
