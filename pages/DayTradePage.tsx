import React from "react";
import { Reveal } from "../components/Reveal";
import { FinancialBg } from "../components/FinancialBg";
import { SiteHeader, SiteFooter, usePageMeta } from "../components/SiteChrome";
import { TOOL_CARDS } from "../siteContent";
import daytradeIcon from "../assets/tools/daytrade-icon.jpg";
import dt01 from "../assets/daytrade/dt-01.png";
import dt02 from "../assets/daytrade/dt-02.png";
import dt03 from "../assets/daytrade/dt-03.png";
import dt04 from "../assets/daytrade/dt-04.png";
import dt05 from "../assets/daytrade/dt-05.png";
import dt06 from "../assets/daytrade/dt-06.png";
import dt07 from "../assets/daytrade/dt-07.png";
import dt08 from "../assets/daytrade/dt-08.png";
import dt09 from "../assets/daytrade/dt-09.png";
import dt10 from "../assets/daytrade/dt-10.png";

const OFFICIAL_URL = "https://www.cmoney.tw/app/itemcontent.aspx?id=4776";

/** 官方內頁圖 (依官方順序) */
const SECTIONS: { img: string; alt: string }[] = [
  { img: dt04, alt: "當沖飆股神手 APP 可以幫助你:隔日沖清單、盤中抓轉折、18 個選股策略、VIP 影音" },
  { img: dt01, alt: "小哥獨創訊號,抓出股價轉折點" },
  { img: dt02, alt: "偏多訊號與偏空訊號,經過籌碼研究後出現的訊號才有意義" },
  { img: dt03, alt: "小哥每天的操盤口袋名單,從隔日沖找出多空標的" },
  { img: dt05, alt: "小哥使用軟體買賣盤竭盡點實際操作" },
  { img: dt09, alt: "小哥整月當沖交易對帳單,總損益 551,122 不含退傭" },
  { img: dt06, alt: "權證小哥 講師介紹" },
  { img: dt08, alt: "好評回饋" },
  { img: dt07, alt: "權證小哥 3 大產品" },
];

/** /software/day-trade — 當沖飆股神手 (照搬官方內頁) */
const DayTradePage: React.FC = () => {
  usePageMeta({
    title: "當沖飆股神手 APP|獨家燈號×16策略×14指標 - 權證小哥官網",
    description:
      "權證小哥-當沖飆股神手APP:你最實用的當沖工具。小哥獨創訊號盤中看出主力攻擊方向與轉折點、隔日沖口袋名單、18 個選股策略、整月當沖對帳單實證。雙平台免費下載。",
    keywords: "當沖飆股神手,當沖,權證小哥,燈號,隔日沖,選股策略,主力攻擊",
    url: "https://warrantlb8888.cmoney.tw/software/day-trade",
  });

  const otherTools = TOOL_CARDS.filter((t) => t.href !== "/software/day-trade").slice(0, 2);

  return (
    <div className="min-h-screen bg-[#060d1a] text-white selection:bg-[#27e0ff] selection:text-black">
      <SiteHeader active="/software" />

      {/* Hero */}
      <section className="relative pt-24 md:pt-36 pb-8 md:pb-12 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#0a1a3a] via-[#08152e] to-[#060d1a]">
        <FinancialBg variant="hero" accent="#27e0ff" gold="#27e0ff" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#27e0ff]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="tech-frame tech-frame-cyan tech-frame-on tech-pulse w-20 h-20 md:w-28 md:h-28 mx-auto rounded-3xl mb-5 md:mb-7">
              <img
                src={daytradeIcon}
                alt="當沖飆股神手"
                className="w-full h-full rounded-3xl border border-white/20"
              />
            </div>
            <p className="text-[#27e0ff] text-xs md:text-base font-black tracking-[0.3em] mb-3">
              DAY TRADE MASTER
            </p>
            <h1 className="text-3xl md:text-6xl font-black leading-tight mb-4 text-white drop-shadow-[0_2px_20px_rgba(39,224,255,0.3)]">
              當沖飆股神手
            </h1>
            <p className="text-[#9fd8ff] text-base md:text-2xl font-bold mb-7">你最實用的當沖工具</p>
            <a
              href={OFFICIAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 md:px-14 py-3 md:py-5 rounded-full bg-gradient-to-r from-[#27e0ff] to-[#1aa3d6] text-black text-base md:text-xl font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(39,224,255,0.4)]"
            >
              雙平台免費下載
              <i className="fas fa-arrow-right"></i>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 官方內頁圖 (長圖版面) */}
      <section className="px-4 md:px-6 pb-8 bg-[#060d1a]">
        <div className="max-w-[480px] mx-auto flex flex-col gap-6 md:gap-8">
          {SECTIONS.map((s, i) => (
            <Reveal key={i}>
              <div className="tech-frame tech-frame-cyan tech-scan rounded-2xl overflow-hidden border border-[#27e0ff]/20 shadow-[0_12px_50px_rgba(0,0,0,0.5)]">
                <img src={s.img} alt={s.alt} loading="lazy" className="w-full h-auto block" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 下載 banner + CTA */}
      <section className="px-4 md:px-6 py-10 md:py-16 bg-gradient-to-b from-[#060d1a] to-[#08152e]">
        <Reveal className="max-w-3xl mx-auto text-center">
          <img
            src={dt10}
            alt="當沖飆股神手 雙平台免費下載"
            loading="lazy"
            className="w-full h-auto rounded-2xl shadow-[0_12px_50px_rgba(0,0,0,0.5)] border border-[#27e0ff]/20 mb-8"
          />
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 md:px-16 py-4 md:py-5 rounded-full bg-gradient-to-r from-[#27e0ff] to-[#1aa3d6] text-black text-base md:text-2xl font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(39,224,255,0.4)]"
          >
            前往理財寶免費試用
            <i className="fas fa-arrow-right"></i>
          </a>
          <p className="text-gray-500 text-xs md:text-sm font-bold mt-6 max-w-xl mx-auto leading-relaxed">
            提供免費試用。投資具有風險,本工具僅作為輔助判斷,投資人應獨立判斷審慎評估。
          </p>
        </Reveal>
      </section>

      {/* 看看小哥的其他工具 — 其他兩個 */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#08152e] to-black border-t border-white/5">
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

export default DayTradePage;
