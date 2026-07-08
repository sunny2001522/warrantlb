import React from "react";
import { Reveal } from "../components/Reveal";
import { FinancialBg } from "../components/FinancialBg";
import { WarrantPickerMock, CbArbMock } from "../components/PhoneMock";
import { SiteHeader, SiteFooter, usePageMeta } from "../components/SiteChrome";
import { ALL_PRODUCTS, type Platform, type ProductItem } from "../siteContent";

/** 平台標籤樣式 */
const PLATFORM_STYLE: Record<Platform, { label: string; icon: string; cls: string }> = {
  PC: {
    label: "PC 電腦版",
    icon: "fas fa-desktop",
    cls: "bg-[#d4af37]/15 border-[#d4af37]/60 text-[#d4af37]",
  },
  APP: {
    label: "APP 手機版",
    icon: "fas fa-mobile-screen-button",
    cls: "bg-[#27e0ff]/12 border-[#27e0ff]/60 text-[#27e0ff]",
  },
  WEB: {
    label: "WEB 網頁版",
    icon: "fas fa-globe",
    cls: "bg-[#3b9eff]/12 border-[#3b9eff]/60 text-[#3b9eff]",
  },
};

const PlatformBadge: React.FC<{ p: Platform }> = ({ p }) => {
  const s = PLATFORM_STYLE[p];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] md:text-xs font-black tracking-widest ${s.cls}`}
    >
      <i className={`${s.icon} text-[9px] md:text-[10px]`}></i>
      {s.label}
    </span>
  );
};

/** 產品畫面 (截圖 or 手刻 mock) */
const ProductVisual: React.FC<{ p: ProductItem }> = ({ p }) => {
  if (p.screenshot) {
    return (
      <div className="relative h-44 md:h-52 rounded-xl overflow-hidden border border-white/10 bg-black/30 mb-5 tech-scan">
        <img
          src={p.screenshot}
          alt={`${p.title} 產品畫面`}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1830]/70 to-transparent pointer-events-none"></div>
      </div>
    );
  }
  return (
    <div className="relative h-44 md:h-52 rounded-xl overflow-hidden border border-white/10 bg-[#081120] mb-5 tech-scan flex items-start p-2.5">
      {p.mock === "warrant-picker" ? <WarrantPickerMock /> : <CbArbMock />}
    </div>
  );
};

/** 統一色產品卡 — 仿恩如 LP:產品畫面 + 平台標籤 + 立即體驗/了解詳情 */
export const ProductCard: React.FC<{ p: ProductItem }> = ({ p }) => (
  <div className="tech-frame group relative flex flex-col bg-[#0d1830] border border-[#2563eb]/25 rounded-[1.5rem] p-5 md:p-6 hover:border-[#d4af37] hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(212,175,55,0.12)] transition-all h-full overflow-hidden">
    {/* 角落光暈 */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d4af37]/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-[#d4af37]/20 transition-all"></div>

    {/* 產品畫面 */}
    <ProductVisual p={p} />

    {/* 平台標籤列 */}
    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-3">
      {p.platforms.map((pf) => (
        <PlatformBadge key={pf} p={pf} />
      ))}
      {p.gift && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4af37] text-black text-[10px] md:text-xs font-black tracking-wide">
          <i className="fas fa-gift text-[9px]"></i>
          {p.gift}
        </span>
      )}
    </div>

    {/* 圖示 + 標題 */}
    <div className="flex items-center gap-3 mb-2">
      {p.iconImg ? (
        <img
          src={p.iconImg}
          alt={p.title}
          className="w-11 h-11 md:w-12 md:h-12 rounded-xl border border-white/20 shadow-lg flex-shrink-0"
        />
      ) : (
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center flex-shrink-0">
          <i className={`${p.icon} text-[#d4af37] text-lg`}></i>
        </div>
      )}
      <h2 className="text-lg md:text-xl font-black text-white serif-font leading-snug group-hover:text-[#d4af37] transition-colors">
        {p.title}
      </h2>
    </div>

    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-5">{p.tagline}</p>

    {/* 雙按鈕 */}
    <div className="mt-auto flex gap-2.5">
      <a
        href={p.experienceHref}
        target="_blank"
        rel="noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-xl bg-[#d4af37] text-black text-xs md:text-sm font-black tracking-widest hover:brightness-110 active:scale-95 transition-all"
      >
        立即體驗
        <i className="fas fa-external-link-alt text-[9px]"></i>
      </a>
      {p.detailHref && (
        <a
          href={p.detailHref}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-xl border border-[#d4af37] text-[#d4af37] text-xs md:text-sm font-black tracking-widest hover:bg-[#d4af37] hover:text-black transition-all"
        >
          了解詳情
          <i className="fas fa-arrow-right text-[9px]"></i>
        </a>
      )}
    </div>
  </div>
);

/** 軟體工具總覽 — 小哥全產品線 (PC + APP 同頁,標平台標籤) */
const SoftwareOverview: React.FC = () => {
  usePageMeta({
    title: "軟體工具總覽|小哥全產品線 PC・APP - 權證小哥官網",
    description:
      "權證小哥全產品線:處置神器、全方位盤中監控、當沖飆股神手、全方位獨門監控電腦版、當沖神器電腦版、挑選權證/股期小幫手、可轉債主力分析、除權息獲利神器。PC 與 APP 完整工具箱。",
    keywords:
      "權證小哥,處置神器,全方位監控,當沖飆股神手,當沖神器,挑選權證小幫手,挑選股期小幫手,可轉債,除權息獲利神器,理財寶",
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
              ALL PRODUCTS
            </p>
            <h1 className="text-3xl md:text-6xl font-black serif-font italic text-gold-gradient leading-tight mb-6">
              小哥全產品線
            </h1>
            <p className="text-gray-300 text-[15px] md:text-lg leading-relaxed serif-font max-w-3xl mx-auto mb-6">
              從處置股、當沖、權證、股期、可轉債到除權息——
              小哥把每個戰場的主力手法,拆解成 PC 與 APP 上可重複執行的工具。
            </p>
            {/* 平台圖例 */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              <PlatformBadge p="PC" />
              <PlatformBadge p="APP" />
              <PlatformBadge p="WEB" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 全產品 grid — 統一色卡片 + 產品畫面 + 雙按鈕 */}
      <section className="relative overflow-hidden pb-16 md:pb-24 px-4 md:px-6 pt-4 md:pt-8">
        <FinancialBg variant="band" accent="#2563eb" gold="#d4af37" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {ALL_PRODUCTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* 體驗課導流 */}
        <Reveal className="max-w-4xl mx-auto mt-12 md:mt-20 relative z-10">
          <div className="tech-frame bg-[#0d1830] border border-[#d4af37]/40 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 text-center">
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
