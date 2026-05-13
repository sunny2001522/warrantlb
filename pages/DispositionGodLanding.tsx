import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import cmLogo from "../assets/同學會 (1).png";
import {
  useScrollTracking,
  useSectionVisibility,
  useSectionDwellTime,
  trackOpenDispositionGod,
  type DispositionGodPlatform,
} from "../analytics";
import stat4 from "../assets/image (4).png";
import stat5 from "../assets/image (5).png";
import stat6 from "../assets/image (6).png";
import monitor7 from "../assets/image (7).png";
import dailyMobile1 from "../assets/disposition/mobile/1-1.png";
import dailyMobile2 from "../assets/disposition/mobile/1-2.png";
import dailyMobile3 from "../assets/disposition/mobile/1-3.png";
import monitorMobile1 from "../assets/disposition/mobile/2-1.png";
import monitorMobile2 from "../assets/disposition/mobile/2-2.png";
import statsMobile1 from "../assets/disposition/mobile/3-1.png";
import statsMobile2 from "../assets/disposition/mobile/3-2.png";
import statsMobile3 from "../assets/disposition/mobile/3-3.png";
import heroDesktop from "/直播封面圖（1920x1080）體驗.webp";

const TARGET_URL = "https://warrantlb8888.cmoney.tw/DispositionGod/";

function useAutoSlide(total: number, interval = 4000) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx((p) => (p + 1) % total), interval);
    return () => clearInterval(timer);
  }, [total, interval]);
  const go = useCallback((i: number) => setIdx(i), []);
  return [idx, go] as const;
}

const DispositionGodLanding: React.FC = () => {
  const [dailySlide, setDailySlide] = useAutoSlide(3, 4500);
  const [monitorSlide, setMonitorSlide] = useAutoSlide(2, 4500);
  const [statsSlide, setStatsSlide] = useAutoSlide(3, 4500);
  const [billSlide, setBillSlide] = useAutoSlide(4, 3500);
  const [navSolid, setNavSolid] = useState(false);

  // GA4 + Meta Pixel — 區塊 ref
  const heroRef = useRef<HTMLElement>(null);
  const webVsMobileRef = useRef<HTMLElement>(null);
  const dailyReportRef = useRef<HTMLElement>(null);
  const monitorRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const helpYouRef = useRef<HTMLElement>(null);
  const membershipRef = useRef<HTMLElement>(null);
  const realBillsRef = useRef<HTMLElement>(null);
  const downloadRef = useRef<HTMLElement>(null);

  // 滾動深度追蹤
  useScrollTracking();

  // 區塊首次曝光追蹤
  useSectionVisibility(heroRef, "dgHero");
  useSectionVisibility(webVsMobileRef, "dgWebVsMobile");
  useSectionVisibility(dailyReportRef, "dgDailyReport");
  useSectionVisibility(monitorRef, "dgMonitor");
  useSectionVisibility(statsRef, "dgStats");
  useSectionVisibility(helpYouRef, "dgHelpYou");
  useSectionVisibility(membershipRef, "dgMembership");
  useSectionVisibility(realBillsRef, "dgRealBills");
  useSectionVisibility(downloadRef, "dgDownload");

  // 各區塊累積停留時間，於離開/卸載時送出
  const dwellSections = useMemo(
    () => [
      { id: "dgHero" as const, ref: heroRef },
      { id: "dgWebVsMobile" as const, ref: webVsMobileRef },
      { id: "dgDailyReport" as const, ref: dailyReportRef },
      { id: "dgMonitor" as const, ref: monitorRef },
      { id: "dgStats" as const, ref: statsRef },
      { id: "dgHelpYou" as const, ref: helpYouRef },
      { id: "dgMembership" as const, ref: membershipRef },
      { id: "dgRealBills" as const, ref: realBillsRef },
      { id: "dgDownload" as const, ref: downloadRef },
    ],
    [],
  );
  useSectionDwellTime(dwellSections);

  // 轉換 — 打開處置神器
  const handleOpenDispositionGod = useCallback(
    (
      location: string,
      text: string,
      platform: DispositionGodPlatform = "web",
      url: string = TARGET_URL,
    ) => {
      trackOpenDispositionGod({
        buttonLocation: location,
        buttonText: text,
        platform,
        destinationUrl: url,
      });
    },
    [],
  );

  useEffect(() => {
    const heroEl = document.getElementById("hero-section");
    if (!heroEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => setNavSolid(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(heroEl);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const PAGE_TITLE =
      "處置神器｜處置股預測・處置公告查詢・注意股監控 - 權證小哥";
    const PAGE_URL = "https://warrantlb8888.cmoney.tw/about/DispositionGod";
    const PAGE_DESC =
      "處置神器 網頁版正式上線｜權證小哥打造的處置股投資軟體，明日預測準確度高達99%，不必懂計算只要看答案。即時監控注意股與處置股、精準預測處置時機、量化八大門檻、規避流動性風險，台股處置股查詢與監控工具的最佳選擇。";
    const OG_DESC =
      "處置神器 網頁版 ─ 權證小哥打造的處置股投資軟體。即時監控注意股與處置股動態，精準預測處置時機，把處置股的風險化為獲利機會。";
    const OG_IMAGE = "https://warrantlb8888.cmoney.tw/og-image.jpg";

    document.title = PAGE_TITLE;

    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(
        `link[rel="${rel}"]`,
      ) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta("description", PAGE_DESC);
    setMeta(
      "keywords",
      "處置神器,處置神器網頁版,處置股,處置股軟體,處置股投資軟體,處置股工具,處置股查詢,處置股查詢工具,處置股監控,處置股監控軟體,處置股預測,處置股預測軟體,處置股即時,處置日報,處置坐牢中,注意股,注意股查詢,台股處置,台股投資軟體,投資軟體,權證小哥,權證小哥處置股,權證小哥軟體,CMoney",
    );
    setMeta("robots", "index, follow, max-image-preview:large");
    setMeta("googlebot", "index, follow");

    setLink("canonical", PAGE_URL);

    setMeta("og:type", "website", true);
    setMeta("og:site_name", "權證小哥 - 處置神器", true);
    setMeta("og:locale", "zh_TW", true);
    setMeta(
      "og:title",
      "處置神器｜處置股預測 99% 準確度・處置公告查詢・注意股監控 - 權證小哥",
      true,
    );
    setMeta("og:description", OG_DESC, true);
    setMeta("og:url", PAGE_URL, true);
    setMeta("og:image", OG_IMAGE, true);
    setMeta(
      "og:image:alt",
      "處置神器 網頁版 - 權證小哥處置股投資軟體",
      true,
    );

    setMeta("twitter:card", "summary_large_image");
    setMeta(
      "twitter:title",
      "處置神器｜處置股預測 99% 準確度・處置公告查詢・注意股監控 - 權證小哥",
    );
    setMeta("twitter:description", OG_DESC);
    setMeta("twitter:image", OG_IMAGE);

    const upsertJsonLd = (id: string, data: unknown) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement("script");
        el.id = id;
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.text = JSON.stringify(data);
    };

    upsertJsonLd("ld-disposition-god-app", {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "處置神器",
      alternateName: [
        "處置神器網頁版",
        "權證小哥處置神器",
        "處置股投資軟體",
        "處置股監控軟體",
      ],
      url: PAGE_URL,
      applicationCategory: "FinanceApplication",
      applicationSubCategory: "投資軟體",
      operatingSystem: "Web, iOS, Android",
      inLanguage: "zh-TW",
      description:
        "處置神器是權證小哥團隊打造的處置股投資軟體，提供處置股即時監控、明日處置股預測（準確度高達99%）、處置股查詢、注意股監控、量化八大門檻、處置股獨家統計，網頁版與行動版同步上線。",
      keywords:
        "處置神器, 處置股, 處置股軟體, 處置股工具, 處置股投資軟體, 處置股監控, 處置股預測, 處置股查詢, 注意股, 台股處置, 投資軟體, 權證小哥",
      featureList: [
        "處置股即時監控",
        "明日處置股預測",
        "處置股查詢與名單比對",
        "注意股八大門檻監控",
        "處置股平均漲跌幅統計",
        "處置股紅黑機率統計",
        "處置股開收差幅統計",
      ],
      image: OG_IMAGE,
      screenshot: OG_IMAGE,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "TWD",
      },
      author: { "@type": "Person", name: "權證小哥" },
      publisher: {
        "@type": "Organization",
        name: "CMoney",
        url: "https://www.cmoney.tw/",
      },
    });

    upsertJsonLd("ld-disposition-god-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首頁",
          item: "https://warrantlb8888.cmoney.tw/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "處置神器",
          item: PAGE_URL,
        },
      ],
    });

    upsertJsonLd("ld-disposition-god-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "什麼是處置神器？跟其他處置股工具有什麼不同？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "處置神器是權證小哥團隊打造的處置股投資軟體，提供處置股即時監控、明日預測（準確度高達 99%）、處置日報、注意股八大門檻監控與獨家處置股統計（平均漲跌幅、紅黑機率、開收差幅）。網頁版可直接在瀏覽器使用，無需下載；同時也提供 iOS / Android App 版本。",
          },
        },
        {
          "@type": "Question",
          name: "處置神器網頁版要錢嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "提供免費版可使用基本的處置日報與處置坐牢中查詢，VIP 會員與 VVIP 會員可解鎖完整功能，包括明日處置預測、注意預測（未來 4 天）、雙刀戰法相關係數、處置統計與全部教學影音課程。",
          },
        },
        {
          "@type": "Question",
          name: "處置股是什麼？為什麼需要處置股查詢工具？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "處置股是台灣證交所對短期內漲跌幅或週轉率異常的個股所實施的交易管理措施，被處置後會限制交易方式（例如人工撮合、預收款券）。由於處置條件複雜、規則多達八大量價門檻，一般投資人很難用手算追蹤，因此需要處置股查詢與監控工具來即時掌握「明天哪些股會被處置」、「目前哪些股正在處置中」、「哪些股即將出關」。",
          },
        },
        {
          "@type": "Question",
          name: "處置神器的明日預測準確度真的有 99% 嗎？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "處置神器以證交所公告的處置規則為基礎，量化計算每檔個股的價格門檻、價量門檻共八大條件，回測歷史資料明日處置預測準確度可達 99%。剩下 1% 來自規則本身的彈性與盤後突發公告，並非系統極限。",
          },
        },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-2 md:py-4 flex justify-between items-center transition-all duration-300 ${navSolid ? "bg-[#080c14]/90 backdrop-blur-md border-b border-[#d4af37]/20" : "bg-transparent"}`}
      >
        <a href="/" className="flex items-center gap-2 md:gap-3">
          <img src={cmLogo} alt="CMoney Logo" className="h-6 md:h-10" />
          <div className="flex flex-col">
            <span className="text-xs md:text-base font-black tracking-widest text-white leading-tight">
              權證小哥
            </span>
            <span className="text-[8px] md:text-xs text-[#d4af37] font-bold tracking-[0.2em]">
              CMoney
            </span>
          </div>
        </a>

        {/* Top-level page tabs */}
        <div className="flex items-center gap-0.5 md:gap-1">
          <a
            href="/"
            className="px-2 md:px-4 py-1 md:py-1.5 text-[10px] md:text-sm font-bold tracking-wider md:tracking-widest text-gray-400 hover:text-white border-b-2 border-transparent hover:border-white/30 transition-all"
          >
            處置策略體驗課
          </a>
        </div>

        <a
          href={TARGET_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleOpenDispositionGod("nav", "立即升級")}
          className="blue-shimmer-btn inline-block px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-sm font-black rounded-full text-white shadow-2xl transition-all transform active:scale-95 overflow-hidden cursor-pointer"
        >
          立即升級
        </a>
      </nav>

      {/* ========== HERO ========== */}
      <section
        id="hero-section"
        ref={heroRef}
        className="relative overflow-hidden"
      >
        <div className="relative">
          <img
            src={heroDesktop}
            alt="處置神器網頁版 - 處置股投資軟體｜權證小哥 99% 預測準確度"
            className="w-full h-auto"
          />
          {/* 立即體驗全新網頁版 button — 中間偏下 */}
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={() => {
                handleOpenDispositionGod(
                  "hero_button",
                  "立即體驗全新網頁版",
                  "web",
                  "#download-section",
                );
                document
                  .getElementById("download-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 md:px-12 py-2.5 md:py-4 rounded-full border-[3px] border-[#d7b072] cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(215,176,114,0.3)]"
              style={{
                background: "linear-gradient(148deg, #2d2d2d 10%, #000 68%)",
              }}
            >
              <span
                className="font-black text-sm md:text-3xl tracking-wider whitespace-nowrap"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, #d7b072 18%, #fffacc 45%, #b1803c 57%, #ffe7aa 84%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                立即體驗全新網頁版
              </span>
            </button>
          </div>
        </div>
        {/* SEO-friendly H1：按鈕下方可見小字，權重高 */}
        <div className="bg-black border-t border-[#d4af37]/10 py-3 md:py-4 px-4 text-center">
          <h1 className="text-[11px] md:text-sm text-gray-300 font-bold tracking-wider leading-relaxed">
            處置神器 ─ 台股<span className="text-[#d4af37]">處置股預測</span>・<span className="text-[#d4af37]">處置公告查詢</span>・<span className="text-[#d4af37]">注意股監控</span>｜權證小哥 CMoney 投資軟體
          </h1>
          <p className="text-[10px] md:text-xs text-gray-500 mt-1 md:mt-2">
            明日處置股預測、處置日報、注意股八大門檻、出關追蹤、平均漲跌幅 / 紅黑機率 / 開收差幅統計，網頁版與 iOS / Android 同步上線。
          </p>
        </div>
      </section>

      {/* ========== 網頁版 vs 手機版 ========== */}
      <section
        ref={webVsMobileRef}
        className="py-12 md:py-20 px-4 md:px-6 bg-black border-t border-[#d4af37]/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#d4af37]/5 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* 標題區 */}
          <div className="text-center mb-8 md:mb-14 scroll-reveal">
            <p className="text-[10px] md:text-sm text-gray-500 tracking-[0.3em] uppercase mb-2 md:mb-3">
              WEB &amp; MOBILE
            </p>
            <h2 className="text-2xl md:text-5xl font-black serif-font mb-3 md:mb-4 leading-tight">
              <span className="text-gold-gradient">網頁版</span>
              <span className="text-white"> 全新登場</span>
            </h2>
            <p className="text-base md:text-2xl font-black text-white leading-snug">
              更大畫面 ・{" "}
              <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded">
                不受裝置限制
              </span>
            </p>
            <p className="text-gray-400 text-xs md:text-base font-bold mt-2 md:mt-3">
              想要更專業的盤面？網頁版讓你看得更清楚、操作更從容
            </p>
          </div>

          {/* 兩個方塊 — desktop 大、mobile 小 */}
          <div className="flex items-end justify-center gap-3 md:gap-8">
            {/* 電腦版 — 更大、金色邊緣 */}
            <div
              className="scroll-reveal flex-[2] md:flex-[2.4] relative group cursor-pointer"
              onClick={() => {
                handleOpenDispositionGod(
                  "web_vs_mobile_card",
                  "網頁版方塊點擊",
                );
                window.open(TARGET_URL, "_blank", "noopener,noreferrer");
              }}
            >
              {/* 金色光暈 */}
              <div
                className="absolute -inset-2 md:-inset-3 rounded-3xl opacity-60 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, #d7b072 0%, #fffacc 50%, #b1803c 100%)",
                }}
              ></div>

              <div
                className="relative rounded-2xl md:rounded-3xl border-2 md:border-[3px] border-[#d4af37] overflow-hidden transition-all duration-500 group-hover:-translate-y-2"
                style={{
                  background:
                    "linear-gradient(145deg, #1a1408 0%, #0a0a0a 100%)",
                  boxShadow:
                    "0 0 40px rgba(212,175,55,0.3), inset 0 0 30px rgba(212,175,55,0.05)",
                }}
              >
                {/* 推薦標籤 */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                  <span
                    className="inline-block px-2 md:px-4 py-0.5 md:py-1.5 rounded-full text-[9px] md:text-xs font-black tracking-wider shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #d7b072 0%, #fffacc 50%, #b1803c 100%)",
                      color: "#1a1408",
                    }}
                  >
                    ★ 推薦
                  </span>
                </div>

                {/* 電腦圖片 */}
                <div className="px-3 md:px-8 pt-4 md:pt-10 pb-2 md:pb-4 flex items-center justify-center">
                  <img
                    src="/image (8).png"
                    alt="處置神器 網頁版"
                    className="w-full h-auto object-contain rounded-md md:rounded-lg"
                    style={{
                      filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
                    }}
                  />
                </div>

                {/* 文字區 */}
                <div className="px-3 md:px-8 pb-4 md:pb-8 pt-2 md:pt-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <i className="fas fa-desktop text-[#d4af37] text-base md:text-2xl"></i>
                    <h3 className="text-lg md:text-3xl font-black serif-font text-gold-gradient">
                      網頁版
                    </h3>
                  </div>
                  <p className="text-white text-xs md:text-lg font-black mb-1 md:mb-2 leading-snug">
                    更大畫面 ・ 完整功能
                  </p>
                  <p className="text-gray-400 text-[10px] md:text-sm font-bold leading-relaxed">
                    多視窗監控、表格細節一覽無遺
                    <br className="hidden md:block" />
                    盤中操作更專業、不受裝置限制
                  </p>
                </div>
              </div>
            </div>

            {/* 手機版 — 較小 */}
            <div className="scroll-reveal flex-1 md:flex-[1] relative group">
              <div
                className="relative rounded-xl md:rounded-2xl border border-white/15 overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/30"
                style={{
                  background:
                    "linear-gradient(145deg, #0a1528 0%, #060a14 100%)",
                }}
              >
                {/* 手機圖片 */}
                <div className="px-3 md:px-6 pt-4 md:pt-8 pb-1 md:pb-2 flex items-center justify-center">
                  <img
                    src={dailyMobile1}
                    alt="處置神器 手機版"
                    className="w-[60%] md:w-[55%] h-auto object-contain rounded-lg md:rounded-xl"
                    style={{
                      filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.5))",
                    }}
                  />
                </div>

                {/* 文字區 */}
                <div className="px-3 md:px-6 pb-3 md:pb-6 pt-2 md:pt-4 text-center">
                  <div className="flex items-center justify-center gap-1 md:gap-2 mb-1.5 md:mb-2">
                    <i className="fas fa-mobile-alt text-gray-300 text-sm md:text-xl"></i>
                    <h3 className="text-sm md:text-2xl font-black text-white">
                      手機版
                    </h3>
                  </div>
                  <p className="text-gray-300 text-[10px] md:text-sm font-bold mb-0.5 md:mb-1">
                    隨時隨地查看
                  </p>
                  <p className="text-gray-500 text-[9px] md:text-xs font-bold leading-relaxed">
                    出門在外
                    <br className="hidden md:block" />
                    一指掌握行情
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 底部 CTA 提示 */}
          <div className="text-center mt-6 md:mt-10 scroll-reveal">
            <a
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                handleOpenDispositionGod(
                  "web_vs_mobile_link",
                  "立即體驗網頁版",
                )
              }
              className="inline-flex items-center gap-2 text-[#d4af37] hover:text-[#fffacc] text-sm md:text-base font-black transition-colors"
            >
              <span>立即體驗網頁版</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ========== 處置日報 (輪播) ========== */}
      <section
        ref={dailyReportRef}
        className="md:h-screen flex flex-col px-4 md:px-6 py-10 md:py-0 relative overflow-hidden"
        style={{
          background: "url('/1920X1080_VIP.jpg') center/cover no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="hidden md:block absolute top-0 left-0 right-0 z-10">
          <div className="flex justify-between text-[10px] text-gray-600 tracking-[0.3em] uppercase px-6 py-2">
            <span>ACCURACY</span>
            <span>LIMIT</span>
            <span>DISPOSITION</span>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:h-full md:pt-14 md:pb-6 md:px-16 gap-6 md:gap-8 relative z-10">
          {/* Mobile-only 上方標題 */}
          <div className="md:hidden scroll-reveal text-center">
            <h2 className="text-3xl font-black serif-font mb-3">
              <span className="text-gold-gradient">處置日報</span>
            </h2>
            <p className="text-lg font-black text-white mb-1 leading-snug">
              明日預測{" "}
              <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded text-base font-black">
                準確度
              </span>{" "}
              高達 <span className="text-[#d4af37] text-2xl">99%</span>
            </p>
            <p className="text-gray-400 text-sm font-bold">
              那1%是規則的上限，不是我們的極限
            </p>
          </div>

          {/* 右側(desktop) / 中間(mobile)：電腦 + 手機 */}
          <div className="md:flex-1 md:min-h-0 md:h-full flex flex-col items-center justify-center scroll-reveal relative order-1 md:order-2">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                filter: "blur(60px)",
                background:
                  "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%)",
              }}
            ></div>
            <div className="relative z-10 w-full md:w-auto md:h-[75vh]">
              {/* 電腦 */}
              <div className="desktop-screenshot md:h-full flex items-center justify-center">
                <img
                  src="/image (8).png"
                  alt="處置日報 電腦版"
                  className="w-full md:h-full md:w-auto object-contain rounded-[1rem]"
                />
              </div>
              {/* 手機 — 右下角，重疊電腦1/4 */}
              <div className="absolute z-20 bottom-0 right-2 md:right-[-12%] w-[28%] md:w-[22.5%] md:translate-x-1/4">
                {[
                  { img: dailyMobile1, label: "處置日報" },
                  { img: dailyMobile2, label: "處置坐牢中" },
                  { img: dailyMobile3, label: "今天出關" },
                ].map((s, i) => (
                  <img
                    key={i}
                    src={s.img}
                    alt={s.label}
                    className="w-full h-auto block rounded-[1.2rem] transition-all duration-500 hover:scale-105 hover:brightness-110 hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] cursor-pointer"
                    style={{ display: i === dailySlide ? "block" : "none" }}
                  />
                ))}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-black shadow-lg whitespace-nowrap">
                  {["處置日報", "處置坐牢中", "今天出關"][dailySlide]}
                </div>
              </div>
            </div>

            {/* Dots — 電腦下方 */}
            <div className="flex gap-2 mt-6 md:mt-8 justify-center relative z-10">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setDailySlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === dailySlide ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* 左側(desktop) / 底部(mobile)：標題 + 輪播文字說明 */}
          <div className="md:w-[22%] flex-shrink-0 flex flex-col md:justify-center scroll-reveal order-2 md:order-1">
            <div className="hidden md:block">
              <h2 className="text-3xl md:text-6xl font-black serif-font mb-3 md:mb-5">
                <span className="text-gold-gradient">處置日報</span>
              </h2>
              <p className="text-xl md:text-2xl font-black text-white mb-1">
                明日預測{" "}
                <span className="bg-[#d4af37] text-black px-2 md:px-3 py-0.5 md:py-1 rounded text-lg md:text-xl font-black">
                  準確度
                </span>{" "}
                高達{" "}
                <span className="text-[#d4af37] text-3xl md:text-5xl">99%</span>
              </p>
              <p className="text-gray-400 text-sm md:text-lg font-bold mb-6 md:mb-8">
                那1%是規則的上限，不是我們的極限
              </p>
            </div>

            {(() => {
              const slides = [
                {
                  title: "必 關 股",
                  desc: "無需研究價格、成交量",
                  highlight: "明天一定進處置",
                },
                {
                  title: "量價門檻",
                  desc: "價格門檻、價量門檻其中一個達到",
                  highlight: "明天就會進處置",
                },
                {
                  title: "出關追蹤",
                  desc: "處置結束後的關鍵觀察期",
                  highlight: "不必懂計算，只要看答案",
                },
              ];
              return (
                <>
                  <div className="p-4 md:p-6 transition-all duration-500 bg-[#1a3a6a]/40 border-2 border-[#d4af37]/60 rounded-2xl backdrop-blur-sm">
                    <div className="inline-block bg-[#d4af37] rounded px-2 py-0.5 mb-2 md:mb-3">
                      <h3 className="text-base md:text-xl font-black text-black">
                        {slides[dailySlide].title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm md:text-base font-bold leading-relaxed">
                      {slides[dailySlide].desc}
                    </p>
                    <p className="text-[#d4af37] text-base md:text-lg font-black mt-2">
                      {slides[dailySlide].highlight}
                    </p>
                  </div>

                  <div className="text-center p-3 md:p-4 mt-2 md:mt-4">
                    <p className="text-base md:text-xl font-black serif-font italic text-white">
                      「 不必懂計算，只要看
                      <span className="text-[#d4af37]">答案</span> 」
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ========== 處置股監控 ========== */}
      <section
        ref={monitorRef}
        className="md:h-screen flex flex-col px-4 md:px-6 py-10 md:py-0 relative overflow-hidden"
        style={{
          background: "url('/1920X1080_VIP.jpg') center/cover no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:h-full md:pt-14 md:pb-6 md:px-16 gap-6 md:gap-8 relative z-10">
          {/* Mobile-only 上方標題 */}
          <div className="md:hidden scroll-reveal text-center">
            <h2 className="text-3xl font-black serif-font mb-3">
              <span className="text-gold-gradient">處置股監控</span>
            </h2>
            <p className="text-base text-gray-300 font-bold">
              不錯過{" "}
              <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded font-black">
                關鍵異動
              </span>{" "}
              提前看見市場風險
            </p>
          </div>

          {/* 右側(desktop) / 中間(mobile)：電腦 + 手機 */}
          <div className="md:flex-1 md:min-h-0 md:h-full flex flex-col items-center justify-center scroll-reveal relative order-1 md:order-2">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                filter: "blur(60px)",
                background:
                  "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%)",
              }}
            ></div>
            <div className="relative z-10 w-full md:w-auto md:h-[75vh]">
              {/* 電腦 */}
              <div className="desktop-screenshot md:h-full flex items-center justify-center">
                {[monitor7, "/image (9).png"].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={
                      ["注意股監控", "即時整合公告資訊"][i] + " 電腦版"
                    }
                    className="w-full md:h-full md:w-auto object-contain rounded-[1rem] transition-opacity duration-700"
                    style={{ display: i === monitorSlide ? "block" : "none" }}
                  />
                ))}
              </div>
              {/* 手機 — 右下角，重疊電腦1/4 */}
              <div className="absolute z-20 bottom-0 right-2 md:right-[-12%] w-[28%] md:w-[22.5%] md:translate-x-1/4">
                {[monitorMobile1, monitorMobile2].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={["注意股監控", "即時整合公告資訊"][i] + " 手機版"}
                    className="w-full h-auto block rounded-[1.2rem] transition-all duration-500 hover:scale-105 hover:brightness-110 hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] cursor-pointer"
                    style={{ display: i === monitorSlide ? "block" : "none" }}
                  />
                ))}
              </div>
            </div>

            {/* Dots — 電腦下方 */}
            <div className="flex gap-2 mt-6 md:mt-8 justify-center relative z-10">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => setMonitorSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === monitorSlide ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* 左側(desktop) / 底部(mobile)：標題 + 說明 */}
          <div className="md:w-[22%] flex-shrink-0 flex flex-col md:justify-center scroll-reveal order-2 md:order-1">
            <div className="hidden md:block">
              <h2 className="text-3xl md:text-6xl font-black serif-font mb-3 md:mb-5">
                <span className="text-gold-gradient">處置股監控</span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 font-bold mb-6 md:mb-8">
                不錯過{" "}
                <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded font-black">
                  關鍵異動
                </span>{" "}
                提前看見市場風險
              </p>
            </div>

            {(() => {
              const items = [
                {
                  title: "注意股監控",
                  desc: "量化監控觸發進度，八大門檻精確掌握",
                },
                { title: "即時整合公告資訊", desc: "證交所處置名單即時比對" },
              ];
              const current = items[monitorSlide];
              return (
                <div className="p-4 md:p-6 transition-all duration-500 bg-[#1a3a6a]/40 border-2 border-[#d4af37]/60 rounded-2xl backdrop-blur-sm">
                  <div className="inline-block bg-[#d4af37] rounded px-2 py-0.5 mb-2 md:mb-3">
                    <h3 className="text-base md:text-xl font-black text-black">
                      {current.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base font-bold leading-relaxed">
                    {current.desc}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ========== 獨家統計功能 (輪播) ========== */}
      <section
        ref={statsRef}
        className="md:h-screen flex flex-col px-4 md:px-0 py-10 md:py-0 relative overflow-hidden"
        style={{
          background: "url('/1920X1080_VIP.jpg') center/cover no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="hidden md:block absolute top-0 left-0 right-0 z-10">
          <div className="flex justify-between text-[10px] text-gray-600 tracking-[0.3em] uppercase px-6 py-2">
            <span>EXCLUSIVE</span>
            <span>STATISTICS</span>
            <span>DATA</span>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row md:h-full md:pt-14 md:pb-6 md:px-16 gap-6 md:gap-8 relative z-10">
          {/* Mobile-only 上方標題 */}
          <div className="md:hidden scroll-reveal text-center">
            <h2 className="text-3xl font-black serif-font mb-3">
              <span className="text-gold-gradient">獨家統計功能</span>
            </h2>
            <p className="text-base text-gray-300 font-bold">
              用{" "}
              <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded font-black">
                數據
              </span>{" "}
              看穿處置股真實行情力道
            </p>
          </div>

          {/* 右側(desktop) / 中間(mobile)：電腦 + 手機 */}
          <div className="md:flex-1 md:min-h-0 md:h-full flex flex-col items-center justify-center scroll-reveal relative order-1 md:order-2">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                filter: "blur(60px)",
                background:
                  "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%)",
              }}
            ></div>
            <div className="relative z-10 w-full md:w-auto md:h-[75vh]">
              {/* 電腦 */}
              <div className="desktop-screenshot md:h-full flex items-center justify-center">
                {[stat6, stat5, stat4].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={["平均漲跌幅", "紅黑機率", "開收差幅"][i] + " 電腦版"}
                    className="w-full md:h-full md:w-auto object-contain rounded-[1rem] transition-opacity duration-700"
                    style={{ display: i === statsSlide ? "block" : "none" }}
                  />
                ))}
              </div>
              {/* 手機 — 右下角，重疊電腦1/4 */}
              <div className="absolute z-20 bottom-0 right-2 md:right-[-12%] w-[28%] md:w-[22.5%] md:translate-x-1/4">
                {[statsMobile1, statsMobile2, statsMobile3].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={["平均漲跌幅", "紅黑機率", "開收差幅"][i]}
                    className="w-full h-auto block rounded-[1.2rem] transition-all duration-500 hover:scale-105 hover:brightness-110 hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] cursor-pointer"
                    style={{ display: i === statsSlide ? "block" : "none" }}
                  />
                ))}
              </div>
            </div>

            {/* Dots — 電腦下方 */}
            <div className="flex gap-2 mt-6 md:mt-8 justify-center relative z-10">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setStatsSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === statsSlide ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </div>

          {/* 左側(desktop) / 底部(mobile)：標題 + 功能切換文字 */}
          <div className="md:w-[22%] flex-shrink-0 flex flex-col md:justify-center scroll-reveal order-2 md:order-1">
            <div className="hidden md:block">
              <h2 className="text-3xl md:text-6xl font-black serif-font mb-3 md:mb-5">
                <span className="text-gold-gradient">獨家統計功能</span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 font-bold mb-6 md:mb-8">
                用{" "}
                <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded font-black">
                  數據
                </span>{" "}
                看穿處置股真實行情力道
              </p>
            </div>

            {(() => {
              const features = [
                {
                  title: "平均漲跌幅",
                  desc: "彙整歷年處置股大數據，精確呈現標的在處置前後的漲跌慣性，幫你預判行情天花板",
                },
                {
                  title: "紅黑機率",
                  desc: "統計處置期間收紅K與黑K的歷史勝率，一眼看穿標的在受限交易下的多空傾向",
                },
                {
                  title: "開收差幅",
                  desc: "代表當天盤中的實質力道，紅柱越高表示開低走高力道越強，綠柱則代表當天買氣後勁不足",
                },
              ];
              const current = features[statsSlide];
              return (
                <div className="p-4 md:p-6 transition-all duration-500 bg-[#1a3a6a]/40 border-2 border-[#d4af37]/60 rounded-2xl backdrop-blur-sm">
                  <div className="inline-block bg-[#d4af37] rounded px-2 py-0.5 mb-2 md:mb-3">
                    <h3 className="text-base md:text-xl font-black text-black">
                      {current.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base font-bold leading-relaxed">
                    {current.desc}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ========== 處置神器可以幫助你 ========== */}
      <section
        ref={helpYouRef}
        className="py-16 md:py-24 px-4 md:px-6 bg-black border-t border-[#d4af37]/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#d4af37]/3 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16 scroll-reveal">
            <h2 className="text-3xl md:text-6xl font-black serif-font mb-4">
              <span className="text-gold-gradient">處置神器</span>
            </h2>
            <p className="text-xl md:text-3xl font-black text-white">
              可以幫助你
            </p>
            <p className="text-[10px] md:text-sm text-gray-500 tracking-[0.3em] uppercase mt-3">
              IT CAN HELP YOU
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: "1",
                title: "明日處置股預測",
                subtitle: "提前掌握",
                desc: "在處置公告前，提前預判哪些標的即將被處置，搶先佈局或避開風險。",
                icon: "fas fa-search",
              },
              {
                num: "2",
                title: "處置量價門檻",
                subtitle: "幫你找到處買門檻",
                desc: "精準掌握處置進出場的量價門檻，不再靠感覺操作。",
                icon: "fas fa-crosshairs",
              },
              {
                num: "3",
                title: "處置股交易機會",
                subtitle: "出關前後操作策略",
                desc: "鎖定處置期間與解禁前後的潛在交易機會，把別人的恐懼變成獲利。",
                icon: "fas fa-chart-line",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="scroll-reveal p-6 md:p-8 rounded-2xl border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all hover:-translate-y-2 text-center group"
                style={{
                  background:
                    "linear-gradient(145deg, #0a1528 0%, #060a14 100%)",
                }}
              >
                <div className="text-[#d4af37] text-4xl md:text-5xl font-black serif-font italic mb-4 opacity-30 group-hover:opacity-60 transition-opacity">
                  {item.num}
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1a3a6a] flex items-center justify-center mb-4 md:mb-6 shadow-[0_10px_25px_rgba(37,99,235,0.3)] mx-auto group-hover:scale-110 transition-transform">
                  <i
                    className={`${item.icon} text-xl md:text-2xl text-[#d4af37]`}
                  ></i>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#d4af37] mb-1 serif-font">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <h4 className="text-lg md:text-xl font-black text-white mb-3">
                    {item.subtitle}
                  </h4>
                )}
                <p className="text-gray-300 text-sm md:text-base font-bold leading-relaxed mt-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 會員方案 ========== */}
      <section
        ref={membershipRef}
        className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-black to-[#0f1a2e] border-t border-white/5 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          {/* 頂部裝飾線 + 文字 */}
          <div className="flex items-center gap-3 mb-8 md:mb-10 px-1">
            <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.25em] uppercase whitespace-nowrap">
              DETAILED FEATURES
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
            <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.25em] uppercase whitespace-nowrap">
              TEACHING VIDEOS
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-[#d4af37]/40 to-transparent"></div>
            <span className="text-[9px] md:text-[10px] text-[#d4af37]/70 tracking-[0.25em] uppercase whitespace-nowrap font-bold">
              VVIP MEMBER
            </span>
          </div>

          {/* 標題區 */}
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-[28px] md:text-[56px] font-black leading-tight mb-3 md:mb-5">
              <span className="text-gold-gradient serif-font">進階會員</span>
              <span className="text-white serif-font"> 操作升級</span>
            </h2>
            <p className="text-[15px] md:text-[22px] text-gray-400 font-bold tracking-wide">
              開通<span className="text-white font-black">軟體</span>
              更詳細功能、<span className="text-white font-black">解鎖</span>
              教學影音
            </p>
          </div>

          {/* ===== 比較表格 ===== */}
          <div className="scroll-reveal relative">
            <style>{`
              .vip-table { border-collapse: separate; border-spacing: 0; width: 100%; }
              .vip-table th, .vip-table td { border: 1px solid rgba(255,255,255,0.08); padding: 12px 16px; vertical-align: middle; }
              .vip-table th { border-color: rgba(212,175,55,0.25); }
              .vip-table .vvip-cell { border-color: #d4af37; border-left: 2px solid #d4af37; border-right: 2px solid #d4af37; background: linear-gradient(180deg, #1f1a08 0%, #12100a 100%); }
              .vip-table .vvip-top { border-top: 2px solid #d4af37; border-top-left-radius: 14px; border-top-right-radius: 14px; }
              .vip-table .vvip-bottom { border-bottom: 2px solid #d4af37; border-bottom-left-radius: 14px; border-bottom-right-radius: 14px; }
              .vip-table .cat-label { writing-mode: vertical-rl; letter-spacing: 0.15em; }
              @media (max-width: 767px) {
                .vip-table th, .vip-table td { padding: 8px 6px; font-size: 11px; }
                .vip-table .vvip-text-lg { font-size: 22px !important; }
                .vip-table .vvip-text-xl { font-size: 20px !important; }
              }
            `}</style>

            <table className="vip-table">
              {/* 表頭 */}
              <thead>
                <tr>
                  <th className="bg-[#161616] text-left w-[36%]">
                    <span className="text-[#d4af37] font-black text-[13px] md:text-[16px] tracking-widest">
                      會員等級
                    </span>
                  </th>
                  <th className="bg-[#161616] text-center w-[16%]">
                    <span className="text-gray-300 font-bold text-[12px] md:text-[15px]">
                      免費
                    </span>
                  </th>
                  <th className="bg-[#161616] text-center w-[20%]">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                        VIP
                      </span>
                      <span className="font-black text-white text-[13px] md:text-[16px]">
                        基本會員
                      </span>
                    </div>
                  </th>
                  <th className="vvip-cell vvip-top text-center w-[28%]">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[10px] md:text-[11px] text-[#d4af37] tracking-[0.2em] uppercase font-bold">
                        VVIP
                      </span>
                      <span className="font-black text-[#d4af37] text-[16px] md:text-[22px] serif-font">
                        進階會員
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* ─── 軟體功能區 ─── */}
                {/* 處置日報 */}
                <tr>
                  <td className="bg-[#111]">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span
                        className="cat-label text-[#d4af37] font-black text-[10px] md:text-[11px] opacity-90 hidden min-[400px]:inline"
                        style={{ writingMode: "vertical-rl" }}
                      >
                        軟體功能
                      </span>
                      <span className="text-gray-200 font-bold text-[12px] md:text-[14px] pl-1 min-[400px]:pl-0">
                        處置日報
                      </span>
                    </div>
                  </td>
                  <td className="bg-[#111] text-center">
                    <span className="text-gray-400 text-[11px] md:text-[13px]">
                      盤後解答
                    </span>
                  </td>
                  <td className="bg-[#111] text-center">
                    <span className="text-white text-[16px] md:text-[18px]">
                      ○
                    </span>
                  </td>
                  <td className="vvip-cell text-center" rowSpan={7}>
                    <span
                      className="text-[#d4af37] vvip-text-lg font-black serif-font leading-[1.3]"
                      style={{ fontSize: 36 }}
                    >
                      無限
                      <br />
                      使用
                    </span>
                  </td>
                </tr>
                {/* 處置坐牢中 */}
                <tr>
                  <td className="bg-[#0e0e0e] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">
                      處置坐牢中
                    </span>
                  </td>
                  <td className="bg-[#0e0e0e] text-center">
                    <span className="text-white text-[16px] md:text-[18px]">
                      ○
                    </span>
                  </td>
                  <td className="bg-[#0e0e0e] text-center">
                    <span className="text-white text-[16px] md:text-[18px]">
                      ○
                    </span>
                  </td>
                </tr>
                {/* 今天出關 */}
                <tr>
                  <td className="bg-[#111] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">
                      今天出關
                    </span>
                  </td>
                  <td className="bg-[#111]"></td>
                  <td className="bg-[#111]"></td>
                </tr>
                {/* 第一款預測 */}
                <tr>
                  <td className="bg-[#0e0e0e] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">
                      第一款預測
                    </span>
                  </td>
                  <td className="bg-[#0e0e0e]"></td>
                  <td className="bg-[#0e0e0e]"></td>
                </tr>
                {/* 注意預測(未來 4 天) */}
                <tr>
                  <td className="bg-[#111] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">
                      注意預測
                      <br className="md:hidden" />
                      <span className="text-gray-400">（未來 4 天）</span>
                    </span>
                  </td>
                  <td className="bg-[#111] text-center">
                    <span className="text-gray-500 text-[16px] md:text-[18px] font-bold">
                      ✕
                    </span>
                  </td>
                  <td className="bg-[#111] text-center">
                    <span className="text-gray-400 text-[10px] md:text-[12px]">
                      僅部分揭露
                    </span>
                  </td>
                </tr>
                {/* 雙刀戰法相關係數 */}
                <tr>
                  <td className="bg-[#0e0e0e] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">
                      雙刀戰法
                      <br className="md:hidden" />
                      相關係數
                    </span>
                  </td>
                  <td className="bg-[#0e0e0e] text-center">
                    <span className="text-gray-500 text-[16px] md:text-[18px] font-bold">
                      ✕
                    </span>
                  </td>
                  <td className="bg-[#0e0e0e]"></td>
                </tr>
                {/* 處置統計 */}
                <tr>
                  <td className="bg-[#111] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">
                      處置統計
                    </span>
                  </td>
                  <td className="bg-[#111]"></td>
                  <td className="bg-[#111]"></td>
                </tr>

                {/* ─── 影音課程區 ─── */}
                {/* 基本處置策略 */}
                <tr>
                  <td className="bg-[#0e0e0e]">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span
                        className="cat-label text-[#d4af37] font-black text-[10px] md:text-[11px] opacity-90 hidden min-[400px]:inline"
                        style={{ writingMode: "vertical-rl" }}
                      >
                        影音課程
                      </span>
                      <span className="text-gray-200 font-bold text-[12px] md:text-[14px] pl-1 min-[400px]:pl-0">
                        基本處置策略
                      </span>
                    </div>
                  </td>
                  <td className="bg-[#0e0e0e]"></td>
                  <td className="bg-[#0e0e0e] text-center">
                    <span className="text-gray-400 text-[10px] md:text-[12px] leading-tight block">
                      僅開放
                      <br />
                      基本策略
                    </span>
                  </td>
                  <td className="vvip-cell text-center" rowSpan={3}>
                    <div className="flex flex-col items-center gap-2 md:gap-3">
                      <i className="fas fa-lock text-[#d4af37]/50 text-[18px] md:text-[24px]"></i>
                      <span
                        className="text-[#d4af37] vvip-text-xl font-black serif-font leading-[1.3]"
                        style={{ fontSize: 34 }}
                      >
                        解鎖
                        <br />
                        全部
                      </span>
                    </div>
                  </td>
                </tr>
                {/* 進階處置策略 */}
                <tr>
                  <td className="bg-[#111] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">
                      進階處置策略
                    </span>
                  </td>
                  <td className="bg-[#111] text-center">
                    <span className="text-gray-500 text-[16px] md:text-[18px] font-bold">
                      ✕
                    </span>
                  </td>
                  <td className="bg-[#111]"></td>
                </tr>
                {/* 雙刀戰法實戰 */}
                <tr>
                  <td className="bg-[#0e0e0e] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">
                      雙刀戰法實戰
                    </span>
                  </td>
                  <td className="bg-[#0e0e0e]"></td>
                  <td className="bg-[#0e0e0e]"></td>
                </tr>
              </tbody>
            </table>

            {/* CTA 按鈕 */}
            <div className="flex justify-center mt-8 md:mt-12">
              <a
                href={TARGET_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleOpenDispositionGod(
                    "membership_section",
                    "立即升級進階會員",
                  )
                }
                className="blue-shimmer-btn inline-block px-10 md:px-16 py-4 md:py-6 text-lg md:text-2xl font-black rounded-full text-white shadow-[0_0_50px_rgba(26,58,106,0.6)] transition-all transform active:scale-95 overflow-hidden cursor-pointer"
              >
                立即升級進階會員
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 小哥真實對帳單 ========== */}
      <section
        ref={realBillsRef}
        className="h-screen flex flex-col bg-[#0f1a2e] border-t border-white/5 overflow-hidden"
      >
        <div className="w-full flex flex-col h-full pt-12 md:pt-16 pb-6 md:pb-8">
          <div className="text-center mb-6 md:mb-8 scroll-reveal flex-shrink-0 px-4 md:px-6">
            <h2 className="text-3xl md:text-5xl font-black serif-font mb-3">
              <span className="text-gold-gradient">小哥真實對帳單</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-bold">
              用「實戰」證明處置策略{" "}
              <span className="text-[#d4af37] font-black">有效！</span>
            </p>
          </div>

          {/* 輪播區 — 佔滿剩餘高度，兩邊露出 */}
          <div className="scroll-reveal flex-1 min-h-0 flex flex-col">
            {(() => {
              const bills = [
                "/Group 480961426.jpg",
                "/Group 480961427.png",
                "/Group 480961428.png",
                "/Group 480961429.jpg",
              ];
              return (
                <>
                  <div className="overflow-hidden w-screen relative left-1/2 -translate-x-1/2 flex-1 min-h-0">
                    <div
                      className="flex transition-transform duration-700 ease-in-out h-full"
                      style={{
                        transform: `translateX(calc(10vw - ${billSlide * 80}vw))`,
                      }}
                    >
                      {bills.map((src, i) => {
                        const isActive = i === billSlide;
                        return (
                          <div
                            key={i}
                            className="px-2 md:px-3 transition-all duration-700 h-full"
                            style={{
                              width: "80vw",
                              flexShrink: 0,
                              opacity: isActive ? 1 : 0.35,
                              filter: isActive ? "none" : "brightness(0.4)",
                              transform: isActive ? "scale(1)" : "scale(0.92)",
                            }}
                          >
                            <button
                              onClick={() => setBillSlide(i)}
                              className={`w-full h-full rounded-2xl border overflow-hidden transition-all duration-500 flex items-center justify-center p-3 md:p-5 ${
                                isActive
                                  ? "border-[#d4af37]/60 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                                  : "border-white/10"
                              }`}
                              style={{
                                background:
                                  "linear-gradient(145deg, #0a1528 0%, #060a14 100%)",
                              }}
                            >
                              <img
                                src={src}
                                alt={`小哥真實對帳單 ${i + 1}`}
                                className="max-h-full max-w-full object-contain rounded-xl"
                                draggable={false}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 輪播指示器 */}
                  <div className="flex justify-center gap-2 mt-4 flex-shrink-0">
                    {[0, 1, 2, 3].map((i) => (
                      <button
                        key={i}
                        onClick={() => setBillSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === billSlide
                            ? "w-8 bg-[#d4af37]"
                            : "w-4 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>

          <p className="text-center text-gray-500 text-xs md:text-sm mt-3 font-bold flex-shrink-0 px-4">
            以上為過去績效，不代表未來投資獲利之保證。投資有風險，投資人應審慎判斷。
          </p>
        </div>
      </section>

      {/* ========== 立即體驗 / 下載區 ========== */}
      <section
        id="download-section"
        ref={downloadRef}
        className="py-16 md:py-32 px-4 md:px-6 deep-glow-bg border-t border-[#d4af37]/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563eb]/8 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="scroll-reveal">
            <div className="flex justify-center mb-4 md:mb-6">
              <img
                src={cmLogo}
                alt="CMoney - 權證小哥"
                className="h-12 md:h-16 w-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              />
            </div>
            <h2 className="text-3xl md:text-6xl font-black serif-font text-gold-gradient mb-4 md:mb-6">
              立即體驗處置神器
            </h2>
            <p className="text-xl md:text-3xl font-black text-white mb-2">
              高達 <span className="text-[#d4af37]">99%</span> 預測準確度
            </p>
            <p className="text-gray-400 text-base md:text-xl font-bold mb-10 md:mb-14 leading-relaxed">
              不必懂計算，只要看答案
              <br />
              精準規避流動性陷阱
            </p>
          </div>

          {/* App 下載 + Web 版 */}
          <div className="scroll-reveal">
            <p className="text-[#d4af37] text-sm md:text-base font-bold tracking-widest mb-6 md:mb-8">
              選擇你的使用方式
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Web 版 */}
              <a
                href={TARGET_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleOpenDispositionGod(
                    "download_section",
                    "Web 版立即使用",
                    "web",
                  )
                }
                className="blue-shimmer-btn inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 text-base md:text-xl font-black rounded-full text-white shadow-[0_0_50px_rgba(26,58,106,0.6)] transition-all transform active:scale-95 overflow-hidden cursor-pointer"
              >
                <i className="fas fa-globe text-lg md:text-2xl"></i>
                Web 版立即使用
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-6">
              {/* iOS */}
              <a
                href="https://apps.apple.com/tw/app/%E6%AC%8A%E8%AD%89%E5%B0%8F%E5%93%A5-%E8%99%95%E7%BD%AE%E7%A5%9E%E5%99%A8/id6754092142"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleOpenDispositionGod(
                    "download_section",
                    "App Store",
                    "ios",
                    "https://apps.apple.com/tw/app/%E6%AC%8A%E8%AD%89%E5%B0%8F%E5%93%A5-%E8%99%95%E7%BD%AE%E7%A5%9E%E5%99%A8/id6754092142",
                  )
                }
                className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#d4af37]/40 transition-all text-white font-bold text-sm md:text-base"
              >
                <i className="fab fa-apple text-2xl md:text-3xl"></i>
                <div className="text-left">
                  <span className="block text-[10px] md:text-xs text-gray-400 leading-tight">
                    Download on the
                  </span>
                  <span className="block text-sm md:text-base font-black leading-tight">
                    App Store
                  </span>
                </div>
              </a>
              {/* Android */}
              <a
                href="https://play.google.com/store/apps/details?id=com.cmoney.productionline.dispostocks&hl=zh_TW"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleOpenDispositionGod(
                    "download_section",
                    "Google Play",
                    "android",
                    "https://play.google.com/store/apps/details?id=com.cmoney.productionline.dispostocks&hl=zh_TW",
                  )
                }
                className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-[#d4af37]/40 transition-all text-white font-bold text-sm md:text-base"
              >
                <i className="fab fa-google-play text-xl md:text-2xl"></i>
                <div className="text-left">
                  <span className="block text-[10px] md:text-xs text-gray-400 leading-tight">
                    GET IT ON
                  </span>
                  <span className="block text-sm md:text-base font-black leading-tight">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>

          <p className="text-gray-500 text-xs md:text-sm font-bold tracking-widest mt-8 md:mt-10">
            首購限時優惠 ・ 立即升級
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-black border-t border-[#d4af37]/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={cmLogo} alt="CMoney Logo" className="h-6 md:h-8" />
            <div className="h-5 w-[1px] bg-white/20"></div>
            <span className="text-sm font-black tracking-widest text-white">
              權證小哥
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <a
              href="/"
              className="text-gray-500 hover:text-[#d4af37] text-xs font-bold transition-colors"
            >
              體驗課程報名
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="http://cmy.tw/008I6c"
              target="_blank"
              className="text-gray-500 hover:text-[#d4af37] text-xs font-bold transition-colors"
            >
              聯繫客服
            </a>
          </div>
          <p className="text-gray-600 text-[10px] md:text-xs font-bold serif-font italic">
            本產品屬 CMoney 版權所有。投資具有風險，投資人應獨立判斷審慎評估。
          </p>
          <p className="text-gray-700 text-[9px] font-black tracking-[0.2em] uppercase mt-2">
            &copy; {new Date().getFullYear()} CMoney Inc. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Fixed bottom CTA */}
      <button
        onClick={() => {
          handleOpenDispositionGod(
            "fixed_bottom_cta",
            "立即體驗處置神器",
            "web",
            "#download-section",
          );
          document
            .getElementById("download-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="fixed bottom-6 right-6 z-50 bg-[#1d4ed8] hover:bg-[#1e40af] px-4 py-3 md:px-6 md:py-4 text-[14px] md:text-base font-black text-white rounded-full shadow-[0_4px_24px_rgba(37,99,235,0.6)] active:scale-95 transition-all cursor-pointer"
      >
        立即體驗處置神器
      </button>
    </div>
  );
};

export default DispositionGodLanding;
