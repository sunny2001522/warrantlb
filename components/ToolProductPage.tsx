import React from "react";
import { Reveal } from "./Reveal";
import { FinancialBg } from "./FinancialBg";
import { SiteHeader, SiteFooter, usePageMeta } from "./SiteChrome";
import { TOOL_CARDS, type ToolPageData } from "../siteContent";

/** 工具獨立產品頁 — 仿 enru SoftwareProductPage:hero + 數據卡 + 功能 + 方案 + 下載 */
export const ToolProductPage: React.FC<{ data: ToolPageData }> = ({ data }) => {
  usePageMeta({
    title: data.metaTitle,
    description: data.metaDescription,
    url: `https://warrantlb8888.cmoney.tw/software/${data.slug}`,
  });

  // 其他兩個工具 (排除目前這頁)
  const otherTools = TOOL_CARDS.filter((t) => t.href !== `/software/${data.slug}`).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0a1228] text-white selection:bg-[#d4af37] selection:text-black">
      <SiteHeader active="/software" />

      {/* Hero */}
      <section className={`relative pt-24 md:pt-40 pb-12 md:pb-20 px-4 md:px-6 overflow-hidden bg-gradient-to-b ${data.heroTheme}`}>
        <FinancialBg variant="hero" accent="#2563eb" gold="#d4af37" />
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
              <div className="tech-frame bg-[#0d1830]/80 border border-[#2563eb]/30 rounded-2xl p-3 md:p-6 text-center hover:border-[#d4af37] transition-all h-full">
                <p className="text-gray-500 text-[10px] md:text-sm font-bold mb-1">{s.label}</p>
                <p className="text-lg md:text-3xl font-black text-[#d4af37] serif-font">{s.value}</p>
                <p className="text-gray-400 text-[10px] md:text-sm font-bold mt-1">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 使用教學 — APP 畫面 + 文字說明 + 教學影片 */}
      {(data.screenshots.length > 0 || data.tutorials.length > 0) && (
        <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#0a1228] to-[#091022] border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-10 md:mb-16">
              <p className="text-[#d4af37] text-xs md:text-sm font-black tracking-[0.3em] mb-2">
                TUTORIALS
              </p>
              <h2 className="text-2xl md:text-5xl font-black serif-font italic text-gold-gradient mb-3">
                小哥教你怎麼用
              </h2>
              <p className="text-gray-400 text-sm md:text-lg">看畫面、讀說明、跟影片,一步步上手</p>
            </Reveal>

            {/* APP 畫面 + 文字說明 (左右交錯) */}
            <div className="space-y-12 md:space-y-20 mb-12 md:mb-20">
              {data.screenshots.map((shot, i) => {
                const note = data.screenshotNotes[i];
                return (
                  <Reveal key={i}>
                    <div
                      className={`flex flex-col items-center gap-6 md:gap-14 ${
                        i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      {/* 手機畫面 */}
                      <div className="w-44 md:w-64 flex-shrink-0">
                        <div className="rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-2 border-[#2563eb]/40 shadow-[0_12px_60px_rgba(37,99,235,0.25)] bg-black">
                          <img
                            src={shot}
                            alt={note?.title ?? `${data.title} 畫面 ${i + 1}`}
                            loading="lazy"
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                      {/* 文字說明 */}
                      <div className={`flex-1 text-center ${i % 2 === 1 ? "md:text-right" : "md:text-left"}`}>
                        <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] text-lg md:text-xl font-black serif-font mb-4">
                          {i + 1}
                        </span>
                        <h3 className="text-xl md:text-3xl font-black text-white serif-font mb-3">
                          {note?.title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 inline-block">
                          {note?.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* 教學影片 */}
            {data.tutorials.length > 0 && (
              <>
                <Reveal className="text-center mb-6 md:mb-10">
                  <h3 className="text-xl md:text-3xl font-black serif-font text-white">
                    <i className="fab fa-youtube text-red-600 mr-3"></i>官方教學影片
                  </h3>
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
              </>
            )}
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
                <div className="tech-frame bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.25rem] p-5 md:p-8 hover:border-[#d4af37] hover:-translate-y-1 transition-all h-full">
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

      {/* 下載 APP */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-[#080e1e] border-t border-white/5">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black serif-font italic text-gold-gradient mb-3">
            立即免費試用
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-8">下載 {data.title},跟著小哥一起看盤</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <a
              href={data.purchaseHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 md:py-4 rounded-full bg-[#d4af37] text-black text-sm md:text-base font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              <i className="fas fa-gift"></i>
              前往理財寶免費試用
            </a>
            {data.storeLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-6 py-3 md:py-4 rounded-full bg-white/5 border border-white/15 text-gray-200 hover:border-[#d4af37] hover:text-[#d4af37] transition-all font-black text-sm md:text-base"
              >
                <i className={`${s.icon} text-lg`}></i>
                {s.label}
              </a>
            ))}
          </div>
          {data.disclaimer && (
            <p className="text-gray-600 text-xs md:text-sm font-bold mt-6 max-w-2xl mx-auto leading-relaxed">
              {data.disclaimer}
            </p>
          )}
        </Reveal>
      </section>

      {/* 看看小哥的其他工具 — 其他兩個 (圖 + 文字 + 按鈕) */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#080e1e] to-black border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black serif-font italic text-gold-gradient mb-2">
              看看小哥的其他工具
            </h2>
            <p className="text-gray-400 text-sm md:text-base">不同戰場,不同武器</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {otherTools.map((tool, i) => (
              <Reveal key={tool.title} delay={i * 100}>
                <div
                  className={`flex flex-col sm:flex-row items-center gap-4 md:gap-5 bg-gradient-to-br ${tool.theme} border border-[#2563eb]/25 rounded-[1.5rem] p-5 md:p-6 hover:border-[#d4af37] transition-all h-full`}
                >
                  <img
                    src={tool.iconImg}
                    alt={tool.title}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-[1.25rem] border border-white/20 shadow-lg flex-shrink-0"
                  />
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <h3 className="text-white text-lg md:text-xl font-black serif-font">{tool.title}</h3>
                    <p className="text-[#d4af37] text-xs md:text-sm font-bold tracking-widest mt-0.5 mb-2">
                      {tool.subtitle}
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2 mb-4">
                      {tool.description}
                    </p>
                    <a
                      href={tool.href}
                      {...(tool.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37] text-[#d4af37] text-xs md:text-sm font-black tracking-widest hover:bg-[#d4af37] hover:text-black transition-all"
                    >
                      {tool.cta}
                      <i className={`fas ${tool.external ? "fa-external-link-alt" : "fa-arrow-right"} text-[10px]`}></i>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};
