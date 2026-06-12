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
} from "../siteContent";

/** 關於小哥 — 講師完整介紹頁 (仿 enru 首頁講師區 + 著作區 + 哲學輪盤的獨立頁版本) */
const AboutExpert: React.FC = () => {
  usePageMeta({
    title: "關於權證小哥|素人起家的千萬交易傳奇 - 權證小哥官網",
    description:
      "權證小哥,素人起家的專職交易人。2009 年以 10 萬元本金搭配權證滾出千萬資產,專精籌碼流向與量價結構,著有六本暢銷書,為財訊、Smart 智富專欄作家與 CME、證交所講師。",
    keywords: "權證小哥,權證小哥介紹,權證小哥經歷,權證小哥著作,籌碼分析,主力籌碼,權證,處置股",
    url: "https://warrantlb8888.cmoney.tw/about",
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
      url: "https://warrantlb8888.cmoney.tw/about",
      sameAs: SOCIAL_LINKS.map((s) => s.url),
    });
    document.head.appendChild(jsonLd);
    return () => { document.head.removeChild(jsonLd); };
  }, []);

  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-[#d4af37] selection:text-black">
      <SiteHeader active="/about" />

      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
          <Reveal className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/40"></div>
              <div className="absolute inset-2 rounded-full border border-[#d4af37]/20"></div>
              <div className="absolute inset-3 md:inset-4 rounded-full overflow-hidden border-2 border-[#d4af37]/50 shadow-[0_0_60px_rgba(212,175,55,0.25)]">
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
          </div>
        </div>

        {/* 數據統計卡 */}
        <div className="max-w-5xl mx-auto mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 relative z-10">
          {EXPERT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="bg-[#0b0f1a] border border-[#d4af37]/25 rounded-2xl p-4 md:p-6 text-center hover:border-[#d4af37] hover:-translate-y-1 transition-all h-full">
                <i className={`${s.icon} text-[#d4af37] text-lg md:text-2xl mb-2 md:mb-3`}></i>
                <p className="text-xl md:text-3xl font-black text-white serif-font">{s.value}</p>
                <p className="text-gray-500 text-[11px] md:text-sm font-bold mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 故事時間軸 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#080c14] to-black border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              從三次歸零到千萬身價
            </h2>
            <div className="w-16 md:w-24 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#d4af37]/60 via-[#d4af37]/20 to-transparent md:-translate-x-1/2"></div>
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
      <section className="py-12 md:py-24 px-4 md:px-6 bg-black border-t border-white/5">
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
                <div className="bg-[#0b0f1a] border border-[#d4af37]/25 rounded-[1.5rem] p-6 md:p-10 text-center hover:border-[#d4af37] hover:-translate-y-1 transition-all h-full">
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
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-black to-[#0a1528] border-t border-white/5">
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
      <section className="py-12 md:py-24 px-4 md:px-6 bg-[#0a1528] border-t border-white/5">
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
                <div
                  className={`relative bg-gradient-to-br ${book.accent} border border-[#d4af37]/30 rounded-xl aspect-[3/4] p-4 md:p-8 flex flex-col justify-between hover:border-[#d4af37] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(212,175,55,0.15)] transition-all`}
                >
                  <div className="absolute top-0 left-3 md:left-5 bottom-0 w-[2px] bg-[#d4af37]/30"></div>
                  <i className="fas fa-book-open text-[#d4af37]/60 text-lg md:text-2xl self-end"></i>
                  <div className="pl-3 md:pl-4">
                    <h3 className="text-white text-sm md:text-xl font-black serif-font leading-snug">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p className="text-[#d4af37] text-[10px] md:text-sm font-bold mt-2">{book.subtitle}</p>
                    )}
                  </div>
                  <p className="pl-3 md:pl-4 text-gray-400 text-[9px] md:text-xs font-black tracking-[0.2em]">
                    權證小哥 著
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 社群 CTA */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#0a1528] to-black border-t border-white/5">
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
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default AboutExpert;
