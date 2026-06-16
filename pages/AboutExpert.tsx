import React, { useEffect } from "react";
import { Reveal } from "../components/Reveal";
import { SiteHeader, SiteFooter, usePageMeta } from "../components/SiteChrome";
import lecturerImg from "../assets/man look.png";
import {
  EXPERT_NAME,
  EXPERT_TAGLINE,
  EXPERT_INTRO,
  EXPERT_STATS,
  EXPERT_TIMELINE,
  EXPERT_AWARDS,
  EXPERT_EXPERIENCES,
  EXPERT_BOOKS,
  PHILOSOPHY_PILLARS,
  SOCIAL_LINKS,
  TOOL_CARDS,
  FEATURED_VIDEOS,
  YOUTUBE_SHOWS,
  YOUTUBE_CHANNEL_URL,
} from "../siteContent";

/** 首頁 — 關於權證小哥 (仿 enru 首頁:講師 hub + 影音 + 工具導流) */
const AboutExpert: React.FC = () => {
  usePageMeta({
    title: "權證小哥官網|破解主力籌碼 × 精通金融商品",
    description:
      "權證小哥官方網站。素人起家的專職交易人,2009 年以 10 萬元本金搭配權證滾出千萬資產,專精籌碼流向與量價結構。處置神器、全方位監控、當沖飆股神手等實戰工具,與處置股策略免費體驗課。",
    keywords: "權證小哥,權證小哥官網,處置股,處置神器,籌碼分析,主力籌碼,當沖,權證",
    url: "https://warrantlb8888.cmoney.tw/",
  });

  // Person JSON-LD
  useEffect(() => {
    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: EXPERT_NAME,
      alternateName: "warrantlb",
      description: EXPERT_INTRO,
      jobTitle: "專職交易人・財經講師・暢銷作家",
      url: "https://warrantlb8888.cmoney.tw/",
      sameAs: SOCIAL_LINKS.map((s) => s.url),
    });
    document.head.appendChild(jsonLd);
    return () => { document.head.removeChild(jsonLd); };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1228] text-white selection:bg-[#d4af37] selection:text-black">
      <SiteHeader active="/" />

      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#0d1d42] via-[#0a1530] to-[#0a1228]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#2563eb]/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
          <Reveal className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/40"></div>
              <div className="absolute inset-2 rounded-full border border-[#2563eb]/30"></div>
              <div className="absolute inset-3 md:inset-4 rounded-full overflow-hidden border-2 border-[#d4af37]/50 shadow-[0_0_60px_rgba(37,99,235,0.35)]">
                <img src={lecturerImg} alt={EXPERT_NAME} className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
          <div className="text-center md:text-left">
            <Reveal>
              <p className="text-[#d4af37] text-sm md:text-base font-black tracking-[0.3em] mb-3">
                {EXPERT_TAGLINE}
              </p>
              <h1 className="text-4xl md:text-7xl font-black serif-font italic text-gold-gradient leading-tight mb-6">
                {EXPERT_NAME}
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-gray-300 text-[15px] md:text-lg leading-relaxed serif-font max-w-2xl">
                {EXPERT_INTRO}
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6 md:mt-8">
                <a
                  href="/course"
                  className="inline-flex items-center gap-2 px-7 md:px-10 py-3 md:py-4 rounded-full bg-[#d4af37] text-black text-sm md:text-lg font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                >
                  免費處置體驗課
                  <i className="fas fa-arrow-right text-xs"></i>
                </a>
                <a
                  href="/software"
                  className="inline-flex items-center gap-2 px-7 md:px-10 py-3 md:py-4 rounded-full border border-blue-400/60 text-blue-300 text-sm md:text-lg font-black tracking-widest hover:bg-blue-500/20 transition-all"
                >
                  實戰工具箱
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 數據統計卡 */}
        <div className="max-w-5xl mx-auto mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 relative z-10">
          {EXPERT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="bg-[#0d1830]/80 border border-[#2563eb]/30 rounded-2xl p-4 md:p-6 text-center hover:border-[#d4af37] hover:-translate-y-1 transition-all h-full">
                <i className={`${s.icon} text-[#d4af37] text-lg md:text-2xl mb-2 md:mb-3`}></i>
                <p className="text-xl md:text-3xl font-black text-white serif-font">{s.value}</p>
                <p className="text-gray-500 text-[11px] md:text-sm font-bold mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 影音精選 (串接 dispostock-web 影音資料) */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#0a1228] to-[#091022]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              影音精選
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">每一個賺賠背後的籌碼真相,小哥親自拆解</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
            {FEATURED_VIDEOS.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <a
                  href={v.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.25rem] overflow-hidden hover:border-[#d4af37] hover:-translate-y-1 transition-all group h-full"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-[#10182a] to-black overflow-hidden">
                    {v.videoId && (
                      <img
                        src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                        alt={v.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fas fa-play text-white ml-0.5"></i>
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-[#d4af37]/40 text-[#d4af37] text-[10px] md:text-xs font-black tracking-widest">
                      {v.tag}
                    </span>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-white text-base md:text-lg font-black serif-font leading-snug group-hover:text-[#d4af37] transition-colors">
                      {v.title}
                    </h3>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* 節目單元 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {YOUTUBE_SHOWS.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.25rem] p-5 md:p-6 hover:border-[#d4af37] hover:-translate-y-1 transition-all group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#2563eb]/15 border border-[#2563eb]/40 flex items-center justify-center flex-shrink-0">
                    <i className={`${s.icon} text-blue-300 text-lg`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white text-base md:text-lg font-black serif-font group-hover:text-[#d4af37] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm font-bold">{s.desc}</p>
                  </div>
                  <i className="fas fa-external-link-alt text-gray-600 group-hover:text-[#d4af37] text-xs ml-auto flex-shrink-0 transition-colors"></i>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center">
            <a
              href="/media"
              className="inline-flex items-center gap-2 px-8 md:px-12 py-3 md:py-4 rounded-full border border-[#d4af37] text-[#d4af37] text-sm md:text-lg font-black tracking-widest hover:bg-[#d4af37] hover:text-black transition-all"
            >
              前往影音專區
              <i className="fas fa-arrow-right text-xs"></i>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 工具一覽 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#091022] to-[#0a1228] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-14">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              小哥的實戰工具
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">把主力手法拆解成可重複執行的 SOP</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {TOOL_CARDS.slice(0, 3).map((tool, i) => (
              <Reveal key={tool.title} delay={i * 100}>
                <a
                  href={tool.href}
                  className={`relative flex flex-col bg-gradient-to-br ${tool.theme} border border-[#2563eb]/25 rounded-[1.5rem] p-6 md:p-8 hover:border-[#d4af37] hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(212,175,55,0.12)] transition-all group h-full overflow-hidden`}
                >
                  {/* 角落光暈 */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d4af37]/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-[#d4af37]/20 transition-all"></div>

                  {/* APP 圖示 */}
                  <div className="relative mb-5">
                    <img
                      src={tool.iconImg}
                      alt={tool.title}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-[1.25rem] border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform"
                    />
                    {tool.badge && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#d4af37] text-black text-[9px] md:text-[10px] font-black tracking-wide whitespace-nowrap shadow-lg">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-white text-xl md:text-2xl font-black serif-font group-hover:text-[#d4af37] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[#d4af37] text-xs md:text-sm font-bold tracking-widest mt-1 mb-4">
                    {tool.subtitle}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {tool.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-gray-300 text-xs md:text-sm font-bold">
                        <i className="fas fa-check text-[#d4af37] mt-0.5 text-[10px] flex-shrink-0"></i>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[#d4af37] text-sm font-black mt-auto flex items-center gap-2">
                    {tool.cta}
                    <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-8">
            <a
              href="/software"
              className="inline-flex items-center gap-2 px-8 md:px-12 py-3 md:py-4 rounded-full border border-blue-400/60 text-blue-300 text-sm md:text-lg font-black tracking-widest hover:bg-blue-500/20 transition-all"
            >
              全部工具總覽
              <i className="fas fa-arrow-right text-xs"></i>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 故事時間軸 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#0a1228] to-[#091022] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              從三次歸零到千萬身價
            </h2>
            <div className="w-16 md:w-24 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d4af37]/60 via-[#2563eb]/30 to-transparent md:-translate-x-1/2"></div>
            <div className="space-y-8 md:space-y-14">
              {EXPERT_TIMELINE.map((item, i) => (
                <Reveal key={item.period} delay={i * 100}>
                  <div
                    className={`relative pl-12 md:pl-0 md:flex md:items-center md:gap-10 ${
                      i % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.8)] -translate-x-1/2"></div>
                    <div className={`md:w-1/2 ${i % 2 === 1 ? "md:text-left md:pl-10" : "md:text-right md:pr-10"}`}>
                      <span className="inline-block px-3 py-1 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-xs md:text-sm font-black tracking-widest mb-2">
                        {item.period}
                      </span>
                      <h3 className="text-lg md:text-2xl font-black text-white serif-font mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 投資哲學 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-[#091022] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              小哥的交易哲學
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">不看新聞做股票,只跟著籌碼走</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {PHILOSOPHY_PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div className="bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.5rem] p-6 md:p-10 text-center hover:border-[#d4af37] hover:-translate-y-1 transition-all h-full">
                  <div className="w-14 h-14 md:w-20 md:h-20 mx-auto rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center mb-4 md:mb-6">
                    <i className={`${p.icon} text-[#d4af37] text-xl md:text-3xl`}></i>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white serif-font mb-3">{p.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 得獎紀錄 + 經歷 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#091022] to-[#0a1a3a] border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-black serif-font italic text-gold-gradient mb-6 md:mb-10">
                <i className="fas fa-trophy text-[#d4af37] mr-3 not-italic"></i>得獎紀錄
              </h2>
            </Reveal>
            <div className="space-y-3">
              {EXPERT_AWARDS.map((award, i) => (
                <Reveal key={award} delay={i * 60}>
                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-[#d4af37]/50 transition-colors">
                    <i className="fas fa-medal text-[#d4af37] mt-1 flex-shrink-0"></i>
                    <span className="text-gray-200 text-sm md:text-base font-bold">{award}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-black serif-font italic text-gold-gradient mb-6 md:mb-10">
                <i className="fas fa-chalkboard-teacher text-[#d4af37] mr-3 not-italic"></i>媒體與授課經歷
              </h2>
            </Reveal>
            <div className="space-y-3">
              {EXPERT_EXPERIENCES.map((exp, i) => (
                <Reveal key={exp} delay={i * 60}>
                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-[#d4af37]/50 transition-colors">
                    <i className="fas fa-check-circle text-[#d4af37] mt-1 flex-shrink-0"></i>
                    <span className="text-gray-200 text-sm md:text-base font-bold">{exp}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 出版著作 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-[#0a1a3a] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              出版著作
            </h2>
            <p className="text-gray-400 text-sm md:text-lg">六本暢銷書,完整公開小哥的實戰方法論</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {EXPERT_BOOKS.map((book, i) => (
              <Reveal key={book.title} delay={i * 80}>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-[#0d1830] border border-[#d4af37]/30 rounded-xl overflow-hidden hover:border-[#d4af37] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(212,175,55,0.2)] transition-all group h-full"
                >
                  <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 md:p-5">
                    <h3 className="text-white text-sm md:text-lg font-black serif-font leading-snug group-hover:text-[#d4af37] transition-colors">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p className="text-[#d4af37] text-[10px] md:text-sm font-bold mt-1">{book.subtitle}</p>
                    )}
                    <p className="text-gray-500 text-[10px] md:text-xs font-bold mt-2 flex items-center gap-1.5">
                      前往博客來
                      <i className="fas fa-external-link-alt text-[8px]"></i>
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 社群 CTA */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#0a1a3a] to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-4">
              跟上小哥的每日籌碼觀察
            </h2>
            <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-12">
              追蹤社群頻道,掌握第一手的籌碼動態與處置股情報
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {SOCIAL_LINKS.map((s, i) => (
              <Reveal key={s.platform} delay={i * 60}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 ${s.hoverColor} hover:text-white hover:border-transparent transition-all`}
                >
                  <i className={`${s.icon} text-lg`}></i>
                  <span className="text-sm font-black">{s.platform}</span>
                  <span className="text-xs text-gray-500 font-bold">{s.stat}</span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-10 md:mt-16">
              <a
                href="/course"
                className="inline-flex items-center gap-3 px-10 md:px-16 py-4 md:py-6 rounded-full bg-[#d4af37] text-black text-base md:text-2xl font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(212,175,55,0.35)]"
              >
                免費報名處置策略體驗課
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default AboutExpert;
