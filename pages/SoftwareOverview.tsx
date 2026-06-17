import React from "react";
import { Reveal } from "../components/Reveal";
import { FinancialBg } from "../components/FinancialBg";
import { SiteHeader, SiteFooter, usePageMeta } from "../components/SiteChrome";
import { TOOL_CARDS } from "../siteContent";

/** 軟體工具總覽 — 仿 enru /software 軟體總覽頁 */
const SoftwareOverview: React.FC = () => {
  usePageMeta({
    title: "軟體工具總覽|處置神器・籌碼K線・盤中監控 - 權證小哥官網",
    description:
      "權證小哥的實戰工具箱:處置神器(處置股預測 99% 準確度)、籌碼K線(主力分點追蹤)、全方位盤中監控 APP、從分點探索權證標的。把主力手法拆解成可重複執行的 SOP。",
    keywords: "處置神器,籌碼K線,盤中監控,權證標的,主力籌碼,分點,權證小哥,理財寶",
    url: "https://warrantlb8888.cmoney.tw/software",
  });

  return (
    <div className="min-h-screen bg-[#0a1228] text-white selection:bg-[#d4af37] selection:text-black">
      <SiteHeader active="/software" />

      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-10 md:pb-16 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#0d1d42] to-[#0a1228]">
        <FinancialBg variant="hero" accent="#2563eb" gold="#d4af37" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#2563eb]/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Reveal>
            <p className="text-[#d4af37] text-sm md:text-base font-black tracking-[0.3em] mb-3">
              WARRANT BRO TOOLBOX
            </p>
            <h1 className="text-3xl md:text-6xl font-black serif-font italic text-gold-gradient leading-tight mb-6">
              小哥的實戰工具箱
            </h1>
            <p className="text-gray-300 text-[15px] md:text-lg leading-relaxed serif-font max-w-3xl mx-auto">
              小哥持續獲利的關鍵,在於每天研究籌碼。
              這些工具把複雜的主力手法,拆解成軟體上客觀的數據與可重複執行的 SOP——
              讓你看懂籌碼流向,換你監控主力下單。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 工具卡片 */}
      <section className="pb-16 md:pb-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {TOOL_CARDS.map((tool, i) => (
            <Reveal key={tool.title} delay={i * 100}>
              <div
                className={`relative bg-gradient-to-br ${tool.theme} border border-[#2563eb]/25 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 flex flex-col h-full overflow-hidden hover:border-[#d4af37] hover:-translate-y-1 hover:shadow-[0_8px_50px_rgba(212,175,55,0.12)] transition-all group`}
              >
                {tool.badge && (
                  <span className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 rounded-full bg-[#d4af37] text-black text-[10px] md:text-xs font-black tracking-widest">
                    {tool.badge}
                  </span>
                )}

                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <img
                    src={tool.iconImg}
                    alt={tool.title}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-white/15 shadow-lg flex-shrink-0"
                  />
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white serif-font group-hover:text-[#d4af37] transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-[#d4af37] text-xs md:text-sm font-bold tracking-widest mt-1">
                      {tool.subtitle}
                    </p>
                  </div>
                </div>

                {tool.screenshot && (
                  <div className="relative mb-5 md:mb-6 rounded-xl overflow-hidden border border-white/10 bg-black/30">
                    <img
                      src={tool.screenshot}
                      alt={`${tool.title} APP 畫面`}
                      loading="lazy"
                      className="w-full h-44 md:h-52 object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                  </div>
                )}

                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5 md:mb-8">
                  {tool.description}
                </p>

                <ul className="space-y-2 mb-6 md:mb-10">
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-gray-300 text-sm md:text-base font-bold">
                      <i className="fas fa-check text-[#d4af37] mt-1 text-xs flex-shrink-0"></i>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={tool.href}
                  {...(tool.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 md:py-4 rounded-xl border border-[#d4af37] text-[#d4af37] text-sm md:text-base font-black tracking-widest hover:bg-[#d4af37] hover:text-black transition-all"
                >
                  {tool.cta}
                  <i className={`fas ${tool.external ? "fa-external-link-alt" : "fa-arrow-right"} text-xs`}></i>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 體驗課導流 */}
        <Reveal className="max-w-4xl mx-auto mt-12 md:mt-20">
          <div className="bg-[#0d1830] border border-[#d4af37]/40 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 text-center">
            <h3 className="text-xl md:text-4xl font-black serif-font italic text-gold-gradient mb-3 md:mb-4">
              不知道從哪套工具開始?
            </h3>
            <p className="text-gray-400 text-sm md:text-lg mb-6 md:mb-8">
              先來免費的處置策略體驗課,聽小哥親自示範工具怎麼搭配策略使用
            </p>
            <a
              href="/course"
              className="inline-flex items-center gap-3 px-8 md:px-14 py-3 md:py-5 rounded-full bg-[#d4af37] text-black text-base md:text-xl font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              免費報名體驗課
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
};

export default SoftwareOverview;
