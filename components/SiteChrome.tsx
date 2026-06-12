import React, { useEffect, useState } from "react";
import cmLogo from "../assets/同學會 (1).png";
import { SITE_NAV, SOCIAL_LINKS, TOOL_CARDS } from "../siteContent";

/** 軟體工具下拉選單 — 三大產品線 */
export const SoftwareDropdown: React.FC<{ active?: boolean }> = ({ active }) => (
  <div className="relative group">
    <a
      href="/software"
      className={`flex items-center gap-1 px-1.5 md:px-4 py-1 md:py-1.5 text-[10px] md:text-sm font-black tracking-wider md:tracking-widest whitespace-nowrap transition-colors ${
        active
          ? "text-[#d4af37] border-b-2 border-[#d4af37]"
          : "text-gray-400 hover:text-[#d4af37]"
      }`}
    >
      軟體工具
      <i className="fas fa-chevron-down text-[8px] mt-0.5 group-hover:rotate-180 transition-transform"></i>
    </a>
    {/* 下拉:三大產品線 */}
    <div className="absolute right-0 md:left-1/2 md:-translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      <div className="w-64 bg-[#0d1830]/95 backdrop-blur-md border border-[#2563eb]/30 rounded-2xl shadow-2xl overflow-hidden">
        {TOOL_CARDS.map((tool) => (
          <a
            key={tool.title}
            href={tool.href}
            className="flex items-center gap-3 px-4 py-3 hover:bg-[#2563eb]/15 transition-colors group/item"
          >
            <img
              src={tool.iconImg}
              alt={tool.title}
              className="w-9 h-9 rounded-xl border border-white/10 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-white text-sm font-black group-hover/item:text-[#d4af37] transition-colors">
                {tool.title}
              </p>
              <p className="text-gray-500 text-[11px] font-bold truncate">{tool.subtitle}</p>
            </div>
          </a>
        ))}
        <a
          href="/software"
          className="block px-4 py-2.5 text-center text-[#d4af37] text-xs font-black tracking-widest border-t border-white/10 hover:bg-[#d4af37]/10 transition-colors"
        >
          全部工具總覽 →
        </a>
      </div>
    </div>
  </div>
);

/** 共用導覽列 — 全站每頁一致;rightSlot 可放頁面專屬 CTA */
export const SiteHeader: React.FC<{
  active: string;
  rightSlot?: React.ReactNode;
  alwaysSolid?: boolean;
}> = ({ active, rightSlot, alwaysSolid }) => {
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    if (alwaysSolid) return;
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-3 md:px-6 py-2 md:py-4 flex justify-between items-center gap-2 transition-all duration-300 ${
        alwaysSolid || navSolid
          ? "bg-[#0a1228]/90 backdrop-blur-md border-b border-[#d4af37]/20"
          : "bg-transparent"
      }`}
    >
      <a href="/" className="flex items-center gap-1.5 md:gap-3 min-w-0 flex-shrink-0">
        <img src={cmLogo} alt="CMoney Logo" className="h-6 md:h-10 flex-shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs md:text-base font-black tracking-widest text-white leading-tight whitespace-nowrap">
            權證小哥
          </span>
          <span className="text-[8px] md:text-xs text-[#d4af37] font-bold tracking-[0.2em]">
            CMoney
          </span>
        </div>
      </a>

      <div className="flex items-center gap-0.5 md:gap-1 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        {SITE_NAV.map((item) =>
          item.href === "/software" ? (
            <SoftwareDropdown
              key={item.href}
              active={active.startsWith("/software") || active === "/about/DispositionGod"}
            />
          ) : (
            <a
              key={item.href}
              href={item.href}
              className={`px-1.5 md:px-4 py-1 md:py-1.5 text-[10px] md:text-sm font-black tracking-wider md:tracking-widest whitespace-nowrap transition-colors ${
                active === item.href
                  ? "text-[#d4af37] border-b-2 border-[#d4af37]"
                  : "text-gray-400 hover:text-[#d4af37]"
              }`}
            >
              {item.shortLabel ? (
                <>
                  <span className="md:hidden">{item.shortLabel}</span>
                  <span className="hidden md:inline">{item.label}</span>
                </>
              ) : (
                item.label
              )}
            </a>
          ),
        )}
      </div>

      {rightSlot && <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0">{rightSlot}</div>}
    </nav>
  );
};

/** 共用頁尾 — 與首頁 footer 同風格 */
export const SiteFooter: React.FC = () => (
  <footer className="pt-10 md:pt-16 pb-8 md:pb-10 bg-black border-t border-[#d4af37]/20 relative overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[#2563eb]/5 blur-[100px] rounded-full pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={cmLogo} alt="CMoney Logo" className="h-8" />
            <div className="h-6 w-[1px] bg-white/20 mx-1"></div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-widest text-white leading-tight">
                權證小哥
              </span>
              <span className="text-[10px] text-[#d4af37] font-bold tracking-[0.2em]">
                CMoney
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-xs font-bold leading-relaxed serif-font">
            破解主力籌碼 × 精通金融商品。專注籌碼流向與量價結構,幫助投資人看懂主力、站對方向。
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white text-base font-black tracking-widest serif-font border-b border-[#d4af37]/30 pb-2">
            快速導覽
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {SITE_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-500 hover:text-[#d4af37] text-xs font-bold text-left transition-colors flex items-center gap-2 group"
              >
                <i className="fas fa-chevron-right text-[6px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                {item.label}
              </a>
            ))}
            {TOOL_CARDS.map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="text-gray-500 hover:text-[#d4af37] text-xs font-bold text-left transition-colors flex items-center gap-2 group"
              >
                <i className="fas fa-chevron-right text-[6px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                {t.title}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-white text-base font-black tracking-widest serif-font border-b border-[#d4af37]/30 pb-2">
            關注我們
          </h4>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.slice(0, 4).map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.platform}
                className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${s.hoverColor} hover:text-white transition-all duration-300`}
              >
                <i className={`${s.icon} text-base`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 text-center flex flex-col items-center gap-3">
        <p className="text-gray-600 text-[10px] md:text-xs font-bold serif-font italic max-w-2xl">
          本網站內容屬 CMoney 版權所有。投資具有風險,投資人應獨立判斷審慎評估。
        </p>
        <p className="text-gray-700 text-[9px] font-black tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} CMoney Inc. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

/** SEO helper — 子頁共用 (與 DispositionGodLanding 同模式) */
export const usePageMeta = (opts: {
  title: string;
  description: string;
  keywords?: string;
  url: string;
}) => {
  useEffect(() => {
    document.title = opts.title;

    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", opts.description);
    if (opts.keywords) setMeta("keywords", opts.keywords);
    setMeta("og:title", opts.title, true);
    setMeta("og:description", opts.description, true);
    setMeta("og:url", opts.url, true);
  }, []);
};
