import React from "react";
import { Reveal } from "./Reveal";
import { SiteHeader, SiteFooter, usePageMeta } from "./SiteChrome";
import type { ToolPageData } from "../siteContent";

/** 工具獨立產品頁 — 仿 enru SoftwareProductPage:hero + 數據卡 + 功能 + 方案 + 下載 */
export const ToolProductPage: React.FC<{ data: ToolPageData }> = ({ data }) => {
  usePageMeta({
    title: data.metaTitle,
    description: data.metaDescription,
    url: `https://warrantlb8888.cmoney.tw/software/${data.slug}`,
  });

  return (
    <div className="min-h-screen bg-[#0a1228] text-white selection:bg-[#d4af37] selection:text-black">
      <SiteHeader active="/software" />

      {/* Hero */}
      <section className={`relative pt-24 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden bg-gradient-to-b ${data.heroTheme}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#2563eb]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <img
              src={data.iconImg}
              alt={data.title}
              className="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-3xl border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.5)] mb-5 md:mb-8"
            />
            <p className="text-[#d4af37] text-xs md:text-base font-black tracking-[0.3em] mb-3">
              {data.eyebrow}
            </p>
            <h1 className="text-3xl md:text-6xl font-black serif-font italic text-gold-gradient leading-tight mb-3 md:mb-4">
              {data.title}
            </h1>
            <p className="text-blue-300 text-base md:text-2xl font-bold mb-5 md:mb-8">{data.subtitle}</p>
            <p className="text-gray-300 text-[15px] md:text-lg leading-relaxed serif-font max-w-3xl mx-auto mb-8">
              {data.description}
            </p>
            <a
              href={data.purchaseHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 md:px-14 py-3 md:py-5 rounded-full bg-[#d4af37] text-black text-base md:text-xl font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              立即免費試用
              <i className="fas fa-arrow-right"></i>
            </a>
          </Reveal>
        </div>

        {/* 數據統計卡 */}
        <div className="max-w-4xl mx-auto mt-10 md:mt-16 grid grid-cols-3 gap-3 md:gap-6 relative z-10">
          {data.summaryCards.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="bg-[#0d1830]/80 border border-[#2563eb]/30 rounded-2xl p-3 md:p-6 text-center hover:border-[#d4af37] transition-all h-full">
                <p className="text-gray-500 text-[10px] md:text-sm font-bold mb-1">{s.label}</p>
                <p className="text-lg md:text-3xl font-black text-[#d4af37] serif-font">{s.value}</p>
                <p className="text-gray-400 text-[10px] md:text-sm font-bold mt-1">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APP 畫面 */}
      {data.screenshots.length > 0 && (
        <section className="py-12 md:py-20 px-4 md:px-6 bg-[#0a1228]">
          <div className="max-w-5xl mx-auto">
            <Reveal className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
                APP 實際畫面
              </h2>
              <div className="w-16 md:w-24 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
            </Reveal>
            <div className="flex justify-center gap-4 md:gap-10">
              {data.screenshots.map((shot, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div className="w-44 md:w-72 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-[#2563eb]/40 shadow-[0_12px_60px_rgba(37,99,235,0.25)] bg-black">
                    <img
                      src={shot}
                      alt={`${data.title} 畫面 ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 教學影片 */}
      {data.tutorials.length > 0 && (
        <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#0a1228] to-[#091022] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-8 md:mb-12">
              <p className="text-[#d4af37] text-xs md:text-sm font-black tracking-[0.3em] mb-2">
                TUTORIALS
              </p>
              <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
                小哥教你怎麼用
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">官方教學影片,跟著小哥一步步上手</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {data.tutorials.map((t, i) => (
                <Reveal key={t.videoId} delay={i * 100}>
                  <a
                    href={`https://www.youtube.com/watch?v=${t.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.25rem] overflow-hidden hover:border-[#d4af37] hover:-translate-y-1 transition-all group h-full"
                  >
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${t.videoId}/hqdefault.jpg`}
                        alt={t.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <i className="fas fa-play text-white text-lg ml-0.5"></i>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-white text-base md:text-lg font-black serif-font leading-snug mb-2 group-hover:text-[#d4af37] transition-colors">
                        {t.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 功能特色 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#091022] to-[#080e1e]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              功能特色
            </h2>
            <div className="w-16 md:w-24 h-1 bg-[#d4af37] mx-auto rounded-full"></div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {data.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.25rem] p-5 md:p-8 hover:border-[#d4af37] hover:-translate-y-1 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#2563eb]/15 border border-[#2563eb]/40 flex items-center justify-center mb-4">
                    <i className={`${f.icon} text-blue-300 text-lg`}></i>
                  </div>
                  <h3 className="text-white text-lg md:text-xl font-black serif-font mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 訂閱方案 */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-[#080e1e] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
              訂閱方案
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {data.pricing.map((p, i) => (
              <Reveal key={p.plan} delay={i * 100}>
                <div
                  className={`relative rounded-[1.5rem] p-6 md:p-8 text-center h-full flex flex-col ${
                    p.highlight
                      ? "bg-gradient-to-b from-[#1a3a6a] to-[#0d1830] border-2 border-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                      : "bg-[#0d1830] border border-[#2563eb]/25"
                  }`}
                >
                  {p.note && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d4af37] text-black text-xs font-black tracking-widest whitespace-nowrap">
                      {p.note}
                    </span>
                  )}
                  <p className="text-gray-400 text-sm md:text-base font-bold mb-3">{p.plan}</p>
                  <p className="text-2xl md:text-3xl font-black text-white serif-font">{p.price}</p>
                  {p.original && (
                    <p className="text-gray-600 text-sm font-bold line-through mt-1">原價 {p.original}</p>
                  )}
                  <a
                    href={data.purchaseHref}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-auto pt-5 block`}
                  >
                    <span
                      className={`inline-block w-full py-2.5 md:py-3 rounded-xl text-sm md:text-base font-black tracking-widest transition-all ${
                        p.highlight
                          ? "bg-[#d4af37] text-black hover:brightness-110"
                          : "border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      }`}
                    >
                      選擇方案
                    </span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 下載 / 商店連結 */}
          <Reveal className="mt-10 md:mt-14">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {data.storeLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-gray-200 hover:border-[#d4af37] hover:text-[#d4af37] transition-all font-black text-sm md:text-base"
                >
                  <i className={`${s.icon} text-lg`}></i>
                  {s.label}
                </a>
              ))}
            </div>
            {data.disclaimer && (
              <p className="text-gray-600 text-xs md:text-sm font-bold text-center mt-6 max-w-2xl mx-auto leading-relaxed">
                {data.disclaimer}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* 其他工具導流 */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#080e1e] to-black border-t border-white/5">
        <Reveal className="max-w-4xl mx-auto">
          <div className="bg-[#0d1830] border border-[#d4af37]/40 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-center">
            <h3 className="text-xl md:text-3xl font-black serif-font italic text-gold-gradient mb-3">
              看看小哥的其他工具
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-6">
              處置神器、全方位監控、當沖飆股神手——不同戰場,不同武器
            </p>
            <a
              href="/software"
              className="inline-flex items-center gap-2 px-8 md:px-12 py-3 md:py-4 rounded-full border border-[#d4af37] text-[#d4af37] text-sm md:text-lg font-black tracking-widest hover:bg-[#d4af37] hover:text-black transition-all"
            >
              軟體工具總覽
              <i className="fas fa-arrow-right text-xs"></i>
            </a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
};
