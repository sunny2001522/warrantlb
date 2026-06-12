import React, { useEffect, useState, useCallback } from "react";
import cmLogo from "../assets/同學會 (1).png";
import { SiteHeader } from "../components/SiteChrome";
import shop1 from "../assets/商店頁-1.png";
import shop2 from "../assets/商店頁-2.png";
import shop3 from "../assets/商店頁-3.png";
import shop4 from "../assets/商店頁-4.png";
import shop5 from "../assets/商店頁-5.png";
import shop6 from "../assets/商店頁-6.png";
import heroDesktop from "/hero-livestream.jpg";

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
  const [statsSlide, setStatsSlide] = useAutoSlide(3, 4500);
  const [billSlide, setBillSlide] = useAutoSlide(4, 3500);
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, midnight.getTime() - now.getTime());
      setCountdown({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = "處置神器 - 處置股即時監控與預測工具｜權證小哥 CMoney";

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

    setMeta("description", "處置神器 - 明日預測準確度高達99%，不必懂計算只要看答案。即時監控注意股與處置股、精準預測處置時機、規避流動性風險。權證小哥團隊出品。");
    setMeta("keywords", "處置神器,處置股,處置日報,處置股查詢,處置股預測,注意股,權證小哥,CMoney,處置股工具,處置股監控,台股處置");
    setMeta("og:title", "處置神器 - 高達99%預測準確度｜權證小哥", true);
    setMeta("og:description", "不必懂計算，只要看答案。即時監控注意股與處置股動態，精準預測處置時機，把處置股的風險化為獲利機會。", true);
    setMeta("og:url", "https://warrantlb8888.cmoney.tw/disposition-god", true);

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "處置神器",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: "處置股即時監控與預測工具，明日預測準確度高達99%，提供處置日報、處置股監控、獨家統計功能。",
      author: { "@type": "Person", name: "權證小哥" },
      publisher: { "@type": "Organization", name: "CMoney", url: "https://www.cmoney.tw/" },
    });
    document.head.appendChild(jsonLd);
    return () => { document.head.removeChild(jsonLd); };
  }, []);

  return (
    <div className="min-h-screen bg-[#080c14] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Navigation — 全站共用 header */}
      <SiteHeader
        active="/about/DispositionGod"
        rightSlot={
          <a
            href={TARGET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="blue-shimmer-btn inline-block px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-sm font-black rounded-full text-white shadow-2xl transition-all transform active:scale-95 overflow-hidden cursor-pointer whitespace-nowrap"
          >
            立即升級
          </a>
        }
      />

      {/* ========== HERO ========== */}
      <section id="hero-section" className="relative overflow-hidden">
        <div className="relative">
          <img
            src={heroDesktop}
            alt="處置神器 - 高達99%預測準確度"
            className="w-full h-auto"
          />
          {/* 立即體驗全新網頁版 button — 中間偏下 */}
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 z-10">
            <a
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 md:px-12 py-2.5 md:py-4 rounded-full border-[3px] border-[#d7b072] cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(215,176,114,0.3)]"
              style={{ background: "linear-gradient(148deg, #2d2d2d 10%, #000 68%)" }}
            >
              <span
                className="font-black text-sm md:text-3xl tracking-wider whitespace-nowrap"
                style={{
                  backgroundImage: "linear-gradient(0deg, #d7b072 18%, #fffacc 45%, #b1803c 57%, #ffe7aa 84%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                立即體驗全新網頁版
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ========== 網頁版 vs 手機版 對比 ========== */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#080c14] to-[#0a1528] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* 網頁版 — 左側大圖 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3),0_0_120px_rgba(212,175,55,0.15)] mb-6">
                <div className="absolute top-3 right-3 bg-black/60 border border-[#d4af37]/50 rounded-full px-3 py-1 text-[10px] text-[#d4af37] font-bold tracking-wider z-10">
                  ★ 推薦
                </div>
                <img src="/img_1-1.png" alt="處置神器 網頁版" className="w-full h-auto" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-black text-gold-gradient serif-font mb-2">
                  <i className="fas fa-desktop mr-2 text-lg md:text-xl"></i>網頁版
                </h3>
                <p className="text-white text-base md:text-lg font-black mb-1">更大畫面 ・ 完整功能</p>
                <p className="text-gray-400 text-sm md:text-base font-bold leading-relaxed">
                  多視窗監控、表格細節一覽無遺<br />盤中操作更專業、不受裝置限制
                </p>
              </div>
            </div>

            {/* 手機版 — 右側小圖（手機寬度隱藏） */}
            <div className="hidden md:flex w-[220px] md:w-[280px] flex-col items-center flex-shrink-0">
              <div className="relative rounded-2xl border-2 border-white/10 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-6 bg-[#0a1528]">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black px-3 py-0.5 rounded-full text-[10px] font-black z-10">
                  處置日報
                </div>
                <img src={shop1} alt="處置神器 手機版" className="w-full h-auto" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-black text-white serif-font mb-2">
                  <i className="fas fa-mobile-alt mr-2 text-lg md:text-xl"></i>手機版
                </h3>
                <p className="text-white text-base md:text-lg font-black mb-1">隨時隨地查看</p>
                <p className="text-gray-400 text-sm md:text-base font-bold leading-relaxed">
                  出門在外<br />一指掌握行情
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10 md:mt-14">
            <a
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#d4af37] text-lg md:text-xl font-black tracking-wider hover:underline underline-offset-4 transition-all"
            >
              立即體驗網頁版 <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========== 處置日報 (輪播) ========== */}
      <section className="h-[80vh] md:h-screen flex flex-col relative overflow-hidden bg-black">
        {/* 手機背景圖 */}
        <div className="absolute inset-0">
          <img src="/1920X1080_VIP.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 z-10 hidden md:block">
          <div className="flex justify-between text-[10px] text-gray-600 tracking-[0.3em] uppercase px-6 py-2">
            <span>ACCURACY</span><span>LIMIT</span><span>DISPOSITION</span>
          </div>
        </div>

        {/* 手機版：標題在上 → 圖片 → 說明 */}
        <div className="flex flex-col items-center text-center px-4 pt-6 pb-2 relative z-10 md:hidden">
          <h2 className="text-2xl font-black serif-font mb-1">
            <span className="text-gold-gradient">處置日報</span>
          </h2>
          <p className="text-base font-black text-white">
            明日預測 <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded text-sm font-black">準確度</span> 高達 <span className="text-[#d4af37] text-2xl">99%</span>
          </p>
          <p className="text-gray-400 text-xs font-bold">那1%是規則的上限，不是我們的極限</p>
        </div>

        {/* 手機版：圖片 */}
        <div className="flex-1 flex items-center justify-center px-4 py-2 relative z-10 md:hidden">
          <div className="max-h-full rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3),0_0_120px_rgba(212,175,55,0.15)]">
            <img src="/img_1-1.png" alt="處置日報 電腦版" className="max-h-[45vh] w-auto block" />
          </div>
        </div>

        {/* 手機版：說明文字 */}
        <div className="px-4 pb-6 pt-2 relative z-10 md:hidden text-center">
          {(() => {
            const slides = [
              { title: "必 關 股", desc: "無需研究價格、成交量", highlight: "明天一定進處置" },
              { title: "量價門檻", desc: "價格門檻、價量門檻其中一個達到", highlight: "明天就會進處置" },
              { title: "出關追蹤", desc: "處置結束後的關鍵觀察期", highlight: "不必懂計算，只要看答案" },
            ];
            return (
              <>
                <div className="inline-block border border-[#d4af37] px-4 py-1 mb-2">
                  <h3 className="text-sm font-black text-white tracking-widest">{slides[dailySlide].title}</h3>
                </div>
                <p className="text-gray-300 text-xs font-bold">{slides[dailySlide].desc}</p>
                <p className="text-[#d4af37] text-sm font-black mt-1">{slides[dailySlide].highlight}</p>
                <div className="flex gap-2 mt-3 justify-center">
                  {[0, 1, 2].map((i) => (
                    <button key={i} onClick={() => setDailySlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === dailySlide ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                    />
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        {/* 桌面版：左右佈局 */}
        <div className="hidden md:flex max-w-[1600px] mx-auto w-full flex-row h-full px-16 gap-8 relative z-10">
          <div className="w-[22%] flex-shrink-0 flex flex-col justify-center scroll-reveal">
            <h2 className="text-6xl font-black serif-font mb-5">
              <span className="text-gold-gradient">處置日報</span>
            </h2>
            <p className="text-2xl font-black text-white mb-1">
              明日預測 <span className="bg-[#d4af37] text-black px-3 py-1 rounded text-xl font-black">準確度</span> 高達 <span className="text-[#d4af37] text-5xl">99%</span>
            </p>
            <p className="text-gray-400 text-lg font-bold mb-8">那1%是規則的上限，不是我們的極限</p>
            {(() => {
              const slides = [
                { title: "必 關 股", desc: "無需研究價格、成交量", highlight: "明天一定進處置" },
                { title: "量價門檻", desc: "價格門檻、價量門檻其中一個達到", highlight: "明天就會進處置" },
                { title: "出關追蹤", desc: "處置結束後的關鍵觀察期", highlight: "不必懂計算，只要看答案" },
              ];
              return (
                <>
                  <div className="p-6 rounded-2xl border border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 backdrop-blur-sm" style={{ background: "linear-gradient(145deg, rgba(10,21,40,0.85) 0%, rgba(6,10,20,0.9) 100%)" }}>
                    <div className="inline-block border border-[#d4af37] px-4 py-1 mb-3">
                      <h3 className="text-xl font-black text-white tracking-widest">{slides[dailySlide].title}</h3>
                    </div>
                    <p className="text-gray-300 text-base font-bold leading-relaxed">{slides[dailySlide].desc}</p>
                    <p className="text-[#d4af37] text-lg font-black mt-2">{slides[dailySlide].highlight}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                      <button key={i} onClick={() => setDailySlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === dailySlide ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                      />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
          <div className="flex-1 min-h-0 h-full flex items-center justify-center scroll-reveal relative">
            <div className="absolute inset-0 pointer-events-none" style={{ filter: "blur(60px)", background: "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%)" }}></div>
            <div className="relative z-10 h-full">
              <div className="h-full flex items-center justify-center">
                <div className="max-h-full rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3),0_0_120px_rgba(212,175,55,0.15)]">
                  <img src="/img_1-1.png" alt="處置日報 電腦版" className="max-h-full w-auto block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 處置股監控 ========== */}
      <section className="h-[80vh] md:h-screen flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img src="/1920X1080_VIP.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        {/* 手機版 */}
        <div className="flex flex-col items-center text-center px-4 pt-6 pb-2 relative z-10 md:hidden">
          <h2 className="text-2xl font-black serif-font mb-1">
            <span className="text-gold-gradient">處置股監控</span>
          </h2>
          <p className="text-sm text-gray-300 font-bold">
            不錯過 <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded font-black">關鍵變動</span> 提前看見市場風險
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-2 relative z-10 md:hidden">
          <div className="max-h-full grid place-items-center" style={{ gridTemplate: "1fr / 1fr" }}>
            {["/img_2-1.png", "/img_2-2.png"].map((src, i) => (
              <div key={i} className="max-h-full rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3),0_0_120px_rgba(212,175,55,0.15)] transition-opacity duration-700"
                style={{ gridArea: "1/1", opacity: i === (dailySlide % 2) ? 1 : 0 }}>
                <img src={src} alt={`處置股監控 ${i + 1}`} className="max-h-[45vh] w-auto block" />
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 pb-6 pt-2 relative z-10 md:hidden text-center">
          {(() => {
            const monitorFeatures = [
              { title: "注意股監控", desc: "量化監控觸發進度", highlight: "八大門檻 精確掌握" },
              { title: "即時整合公告資訊", desc: "證交所處置名單 即時比對", highlight: "驗證預測是否精準命中" },
            ];
            const activeIdx = dailySlide % 2;
            return (
              <>
                <div className="inline-block border border-[#d4af37] px-4 py-1 mb-2">
                  <h3 className="text-sm font-black text-white tracking-widest">{monitorFeatures[activeIdx].title}</h3>
                </div>
                <p className="text-gray-300 text-xs font-bold">{monitorFeatures[activeIdx].desc}</p>
                <p className="text-[#d4af37] text-sm font-black mt-1">{monitorFeatures[activeIdx].highlight}</p>
                <div className="flex gap-2 mt-3 justify-center">
                  {[0, 1].map((i) => (
                    <button key={i} onClick={() => setDailySlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                    />
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        {/* 桌面版 */}
        <div className="hidden md:flex max-w-[1600px] mx-auto w-full flex-row h-full px-16 gap-8 relative z-10">
          <div className="w-[22%] flex-shrink-0 flex flex-col justify-center scroll-reveal">
            <h2 className="text-6xl font-black serif-font mb-5">
              <span className="text-gold-gradient">處置股監控</span>
            </h2>
            <p className="text-xl text-gray-300 font-bold mb-8">
              不錯過 <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded font-black">關鍵變動</span> 提前看見市場風險
            </p>
            {(() => {
              const monitorFeatures = [
                { title: "注意股監控", desc: "量化監控觸發進度", highlight: "八大門檻 精確掌握" },
                { title: "即時整合公告資訊", desc: "證交所處置名單 即時比對", highlight: "驗證預測是否精準命中" },
              ];
              const activeIdx = dailySlide % 2;
              return (
                <>
                  <div className="p-6 rounded-2xl border border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 backdrop-blur-sm" style={{ background: "linear-gradient(145deg, rgba(10,21,40,0.85) 0%, rgba(6,10,20,0.9) 100%)" }}>
                    <div className="inline-block border border-[#d4af37] px-4 py-1 mb-3">
                      <h3 className="text-xl font-black text-white tracking-widest">{monitorFeatures[activeIdx].title}</h3>
                    </div>
                    <p className="text-gray-300 text-base font-bold leading-relaxed">{monitorFeatures[activeIdx].desc}</p>
                    <p className="text-[#d4af37] text-lg font-black mt-2">{monitorFeatures[activeIdx].highlight}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {[0, 1].map((i) => (
                      <button key={i} onClick={() => setDailySlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIdx ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                      />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
          <div className="flex-1 min-h-0 h-full flex items-center justify-center scroll-reveal relative">
            <div className="absolute inset-0 pointer-events-none" style={{ filter: "blur(60px)", background: "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%)" }}></div>
            <div className="relative z-10 h-full">
              <div className="h-full grid place-items-center" style={{ gridTemplate: "1fr / 1fr" }}>
                {["/img_2-1.png", "/img_2-2.png"].map((src, i) => (
                  <div key={i} className="max-h-full rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3),0_0_120px_rgba(212,175,55,0.15)] transition-opacity duration-700"
                    style={{ gridArea: "1/1", opacity: i === (dailySlide % 2) ? 1 : 0 }}>
                    <img src={src} alt={`處置股監控 ${i + 1}`} className="max-h-full w-auto block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 獨家統計功能 (輪播) ========== */}
      <section className="h-[80vh] md:h-screen flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img src="/1920X1080_VIP.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 z-10 hidden md:block">
          <div className="flex justify-between text-[10px] text-gray-600 tracking-[0.3em] uppercase px-6 py-2">
            <span>EXCLUSIVE</span><span>STATISTICS</span><span>DATA</span>
          </div>
        </div>

        {/* 手機版 */}
        <div className="flex flex-col items-center text-center px-4 pt-6 pb-2 relative z-10 md:hidden">
          <h2 className="text-2xl font-black serif-font mb-1">
            <span className="text-gold-gradient">獨家統計功能</span>
          </h2>
          <p className="text-sm text-gray-300 font-bold">
            用 <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded font-black">數據</span> 看穿處置股真實行情力道
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-2 relative z-10 md:hidden">
          <div className="max-h-full grid place-items-center" style={{ gridTemplate: "1fr / 1fr" }}>
            {["/img_3-1.png", "/img_3-2.png", "/img_3-3.png"].map((src, i) => (
              <div key={i} className="max-h-full rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3),0_0_120px_rgba(212,175,55,0.15)] transition-opacity duration-700"
                style={{ gridArea: "1/1", opacity: i === statsSlide ? 1 : 0 }}>
                <img src={src} alt={["平均漲跌幅", "紅黑機率", "開收差幅"][i]} className="max-h-[45vh] w-auto block" />
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 pb-6 pt-2 relative z-10 md:hidden text-center">
          {(() => {
            const features = [
              { title: "平均漲跌幅", desc: "彙整歷年處置股大數據", highlight: "預判行情天花板" },
              { title: "紅黑機率", desc: "一眼看穿受限交易下", highlight: "多空傾向" },
              { title: "開收差幅", desc: "代表當天盤中的", highlight: "實質力道" },
            ];
            return (
              <>
                <div className="inline-block border border-[#d4af37] px-4 py-1 mb-2">
                  <h3 className="text-sm font-black text-white tracking-widest">{features[statsSlide].title}</h3>
                </div>
                <p className="text-gray-300 text-xs font-bold">{features[statsSlide].desc}</p>
                <p className="text-[#d4af37] text-sm font-black mt-1">{features[statsSlide].highlight}</p>
                <div className="flex gap-2 mt-3 justify-center">
                  {[0, 1, 2].map((i) => (
                    <button key={i} onClick={() => setStatsSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === statsSlide ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                    />
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        {/* 桌面版 */}
        <div className="hidden md:flex max-w-[1600px] mx-auto w-full flex-row h-full px-16 gap-8 relative z-10">
          <div className="w-[22%] flex-shrink-0 flex flex-col justify-center scroll-reveal">
            <h2 className="text-6xl font-black serif-font mb-5">
              <span className="text-gold-gradient">獨家統計功能</span>
            </h2>
            <p className="text-xl text-gray-300 font-bold mb-8">
              用 <span className="bg-[#d4af37] text-black px-2 py-0.5 rounded font-black">數據</span> 看穿處置股真實行情力道
            </p>
            {(() => {
              const features = [
                { title: "平均漲跌幅", desc: "彙整歷年處置股大數據", highlight: "預判行情天花板" },
                { title: "紅黑機率", desc: "一眼看穿受限交易下", highlight: "多空傾向" },
                { title: "開收差幅", desc: "代表當天盤中的", highlight: "實質力道" },
              ];
              return (
                <>
                  <div className="p-6 rounded-2xl border border-[#d4af37]/60 shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500 backdrop-blur-sm" style={{ background: "linear-gradient(145deg, rgba(10,21,40,0.85) 0%, rgba(6,10,20,0.9) 100%)" }}>
                    <div className="inline-block border border-[#d4af37] px-4 py-1 mb-3">
                      <h3 className="text-xl font-black text-white tracking-widest">{features[statsSlide].title}</h3>
                    </div>
                    <p className="text-gray-300 text-base font-bold leading-relaxed">{features[statsSlide].desc}</p>
                    <p className="text-[#d4af37] text-lg font-black mt-2">{features[statsSlide].highlight}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                      <button key={i} onClick={() => setStatsSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === statsSlide ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"}`}
                      />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
          <div className="flex-1 min-h-0 h-full flex items-center justify-center scroll-reveal relative">
            <div className="absolute inset-0 pointer-events-none" style={{ filter: "blur(60px)", background: "radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%)" }}></div>
            <div className="relative z-10 h-full">
              <div className="h-full grid place-items-center" style={{ gridTemplate: "1fr / 1fr" }}>
                {["/img_3-1.png", "/img_3-2.png", "/img_3-3.png"].map((src, i) => (
                  <div key={i} className="max-h-full rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3),0_0_120px_rgba(212,175,55,0.15)] transition-opacity duration-700"
                    style={{ gridArea: "1/1", opacity: i === statsSlide ? 1 : 0 }}>
                    <img src={src} alt={["平均漲跌幅", "紅黑機率", "開收差幅"][i]} className="max-h-full w-auto block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========== 處置神器可以幫助你 ========== */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-black border-t border-[#d4af37]/10 relative overflow-hidden">
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
            <p className="text-[10px] md:text-sm text-gray-500 tracking-[0.3em] uppercase mt-3">IT CAN HELP YOU</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: "1",
                title: "提前掌握",
                desc: "在處置公告前，提前預判哪些標的即將被處置，搶先佈局或避開風險。",
                icon: "fas fa-search",
              },
              {
                num: "2",
                title: "幫你找到",
                subtitle: "處買門檻",
                desc: "精準掌握處置進出場的量價門檻，不再靠感覺操作。",
                icon: "fas fa-crosshairs",
              },
              {
                num: "3",
                title: "交易機會",
                desc: "鎖定處置期間與解禁前後的潛在交易機會，把別人的恐懼變成獲利。",
                icon: "fas fa-chart-line",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="scroll-reveal p-6 md:p-8 rounded-2xl border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all hover:-translate-y-2 text-center group"
                style={{ background: "linear-gradient(145deg, #0a1528 0%, #060a14 100%)" }}
              >
                <div className="text-[#d4af37] text-4xl md:text-5xl font-black serif-font italic mb-4 opacity-30 group-hover:opacity-60 transition-opacity">
                  {item.num}
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1a3a6a] flex items-center justify-center mb-4 md:mb-6 shadow-[0_10px_25px_rgba(37,99,235,0.3)] mx-auto group-hover:scale-110 transition-transform">
                  <i className={`${item.icon} text-xl md:text-2xl text-[#d4af37]`}></i>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#d4af37] mb-1 serif-font">{item.title}</h3>
                {item.subtitle && (
                  <h4 className="text-lg md:text-xl font-black text-white mb-3">{item.subtitle}</h4>
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
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-black to-[#0f1a2e] border-t border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {/* 頂部裝飾線 + 文字 */}
          <div className="flex items-center gap-3 mb-8 md:mb-10 px-1">
            <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.25em] uppercase whitespace-nowrap">DETAILED FEATURES</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#d4af37]/40 to-transparent"></div>
            <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.25em] uppercase whitespace-nowrap">TEACHING VIDEOS</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-[#d4af37]/40 to-transparent"></div>
            <span className="text-[9px] md:text-[10px] text-[#d4af37]/70 tracking-[0.25em] uppercase whitespace-nowrap font-bold">VVIP MEMBER</span>
          </div>

          {/* 標題區 */}
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-[28px] md:text-[56px] font-black leading-tight mb-3 md:mb-5">
              <span className="text-gold-gradient serif-font">進階會員</span>
              <span className="text-white serif-font"> 操作升級</span>
            </h2>
            <p className="text-[15px] md:text-[22px] text-gray-400 font-bold tracking-wide">
              開通<span className="text-white font-black">軟體</span>更詳細功能、<span className="text-white font-black">解鎖</span>教學影音
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
                    <span className="text-[#d4af37] font-black text-[13px] md:text-[16px] tracking-widest">會員等級</span>
                  </th>
                  <th className="bg-[#161616] text-center w-[16%]">
                    <span className="text-gray-300 font-bold text-[12px] md:text-[15px]">免費</span>
                  </th>
                  <th className="bg-[#161616] text-center w-[20%]">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.2em] uppercase">VIP</span>
                      <span className="font-black text-white text-[13px] md:text-[16px]">基本會員</span>
                    </div>
                  </th>
                  <th className="vvip-cell vvip-top text-center w-[28%]">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[10px] md:text-[11px] text-[#d4af37] tracking-[0.2em] uppercase font-bold">VVIP</span>
                      <span className="font-black text-[#d4af37] text-[16px] md:text-[22px] serif-font">進階會員</span>
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
                      <span className="cat-label text-[#d4af37] font-black text-[10px] md:text-[11px] opacity-90 hidden min-[400px]:inline" style={{ writingMode: "vertical-rl" }}>軟體功能</span>
                      <span className="text-gray-200 font-bold text-[12px] md:text-[14px] pl-1 min-[400px]:pl-0">處置日報</span>
                    </div>
                  </td>
                  <td className="bg-[#111] text-center">
                    <span className="text-gray-400 text-[11px] md:text-[13px]">盤後解答</span>
                  </td>
                  <td className="bg-[#111] text-center">
                    <span className="text-white text-[16px] md:text-[18px]">○</span>
                  </td>
                  <td className="vvip-cell text-center" rowSpan={7}>
                    <span className="text-[#d4af37] vvip-text-lg font-black serif-font leading-[1.3]" style={{ fontSize: 36 }}>無限<br/>使用</span>
                  </td>
                </tr>
                {/* 處置坐牢中 */}
                <tr>
                  <td className="bg-[#0e0e0e] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">處置坐牢中</span>
                  </td>
                  <td className="bg-[#0e0e0e] text-center"><span className="text-white text-[16px] md:text-[18px]">○</span></td>
                  <td className="bg-[#0e0e0e] text-center"><span className="text-white text-[16px] md:text-[18px]">○</span></td>
                </tr>
                {/* 今天出關 */}
                <tr>
                  <td className="bg-[#111] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">今天出關</span>
                  </td>
                  <td className="bg-[#111]"></td>
                  <td className="bg-[#111]"></td>
                </tr>
                {/* 第一款預測 */}
                <tr>
                  <td className="bg-[#0e0e0e] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">第一款預測</span>
                  </td>
                  <td className="bg-[#0e0e0e]"></td>
                  <td className="bg-[#0e0e0e]"></td>
                </tr>
                {/* 注意預測(未來 4 天) */}
                <tr>
                  <td className="bg-[#111] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">注意預測<br className="md:hidden"/><span className="text-gray-400">（未來 4 天）</span></span>
                  </td>
                  <td className="bg-[#111] text-center"><span className="text-gray-500 text-[16px] md:text-[18px] font-bold">✕</span></td>
                  <td className="bg-[#111] text-center"><span className="text-gray-400 text-[10px] md:text-[12px]">僅部分揭露</span></td>
                </tr>
                {/* 雙刀戰法相關係數 */}
                <tr>
                  <td className="bg-[#0e0e0e] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">雙刀戰法<br className="md:hidden"/>相關係數</span>
                  </td>
                  <td className="bg-[#0e0e0e] text-center"><span className="text-gray-500 text-[16px] md:text-[18px] font-bold">✕</span></td>
                  <td className="bg-[#0e0e0e]"></td>
                </tr>
                {/* 處置統計 */}
                <tr>
                  <td className="bg-[#111] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">處置統計</span>
                  </td>
                  <td className="bg-[#111]"></td>
                  <td className="bg-[#111]"></td>
                </tr>

                {/* ─── 影音課程區 ─── */}
                {/* 基本處置策略 */}
                <tr>
                  <td className="bg-[#0e0e0e]">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="cat-label text-[#d4af37] font-black text-[10px] md:text-[11px] opacity-90 hidden min-[400px]:inline" style={{ writingMode: "vertical-rl" }}>影音課程</span>
                      <span className="text-gray-200 font-bold text-[12px] md:text-[14px] pl-1 min-[400px]:pl-0">基本處置策略</span>
                    </div>
                  </td>
                  <td className="bg-[#0e0e0e]"></td>
                  <td className="bg-[#0e0e0e] text-center">
                    <span className="text-gray-400 text-[10px] md:text-[12px] leading-tight block">僅開放<br/>基本策略</span>
                  </td>
                  <td className="vvip-cell text-center" rowSpan={3}>
                    <div className="flex flex-col items-center gap-2 md:gap-3">
                      <i className="fas fa-lock text-[#d4af37]/50 text-[18px] md:text-[24px]"></i>
                      <span className="text-[#d4af37] vvip-text-xl font-black serif-font leading-[1.3]" style={{ fontSize: 34 }}>解鎖<br/>全部</span>
                    </div>
                  </td>
                </tr>
                {/* 進階處置策略 */}
                <tr>
                  <td className="bg-[#111] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">進階處置策略</span>
                  </td>
                  <td className="bg-[#111] text-center"><span className="text-gray-500 text-[16px] md:text-[18px] font-bold">✕</span></td>
                  <td className="bg-[#111]"></td>
                </tr>
                {/* 雙刀戰法實戰 */}
                <tr>
                  <td className="bg-[#0e0e0e] pl-6 md:pl-10">
                    <span className="text-gray-200 font-bold text-[12px] md:text-[14px]">雙刀戰法實戰</span>
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
                className="blue-shimmer-btn inline-block px-10 md:px-16 py-4 md:py-6 text-lg md:text-2xl font-black rounded-full text-white shadow-[0_0_50px_rgba(26,58,106,0.6)] transition-all transform active:scale-95 overflow-hidden cursor-pointer"
              >
                立即升級進階會員
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 小哥真實對帳單 ========== */}
      <section className="h-screen flex flex-col bg-[#0f1a2e] border-t border-white/5 overflow-hidden">
        <div className="w-full flex flex-col h-full pt-12 md:pt-16 pb-6 md:pb-8">
          <div className="text-center mb-6 md:mb-8 scroll-reveal flex-shrink-0 px-4 md:px-6">
            <h2 className="text-3xl md:text-5xl font-black serif-font mb-3">
              <span className="text-gold-gradient">小哥真實對帳單</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-bold">
              用「實戰」證明處置策略 <span className="text-[#d4af37] font-black">有效！</span>
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
                      style={{ transform: `translateX(calc(10vw - ${billSlide * 80}vw))` }}
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
                              style={{ background: "linear-gradient(145deg, #0a1528 0%, #060a14 100%)" }}
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
                          i === billSlide ? "w-8 bg-[#d4af37]" : "w-4 bg-white/20 hover:bg-white/40"
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
      <section id="download-section" className="py-16 md:py-32 px-4 md:px-6 deep-glow-bg border-t border-[#d4af37]/20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563eb]/8 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="scroll-reveal">
            <div className="flex justify-center mb-4 md:mb-6">
              <img src="/logo-disposition-god.png" alt="處置神器" className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
            </div>
            <h2 className="text-3xl md:text-6xl font-black serif-font text-gold-gradient mb-4 md:mb-6">
              立即體驗處置神器
            </h2>

            <a
              href="https://www.cmoney.tw/app/itemcontent.aspx?id=8761"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6 md:mb-8 cursor-pointer group"
            >
              <div className="flex flex-col items-center gap-3 md:gap-4 px-8 py-4 md:px-12 md:py-6 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#f5d76e] group-hover:from-[#f5d76e] group-hover:to-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all transform group-active:scale-95">
                <span className="text-black text-xl md:text-3xl font-black tracking-wide">🔥 限時 35 折 立即搶購</span>
                <div className="flex items-center gap-1.5 md:gap-2 font-black">
                  <span className="bg-black/20 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 text-lg md:text-2xl tabular-nums text-black">{String(countdown.h).padStart(2, "0")}</span>
                  <span className="text-black/60 text-lg md:text-2xl">:</span>
                  <span className="bg-black/20 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 text-lg md:text-2xl tabular-nums text-black">{String(countdown.m).padStart(2, "0")}</span>
                  <span className="text-black/60 text-lg md:text-2xl">:</span>
                  <span className="bg-black/20 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 text-lg md:text-2xl tabular-nums text-black">{String(countdown.s).padStart(2, "0")}</span>
                </div>
              </div>
            </a>

            <p className="text-xl md:text-3xl font-black text-white mb-2">
              高達 <span className="text-[#d4af37]">99%</span> 預測準確度
            </p>
            <p className="text-gray-400 text-base md:text-xl font-bold mb-10 md:mb-14 leading-relaxed">
              不必懂計算，只要看答案<br />
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
                className="blue-shimmer-btn inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 text-base md:text-xl font-black rounded-full text-white shadow-[0_0_50px_rgba(26,58,106,0.6)] transition-all transform active:scale-95 overflow-hidden cursor-pointer"
              >
                <i className="fas fa-globe text-lg md:text-2xl"></i>
                Web 版立即使用
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
            <span className="text-sm font-black tracking-widest text-white">權證小哥</span>
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <a href="/" className="text-gray-500 hover:text-[#d4af37] text-xs font-bold transition-colors">
              體驗課程報名
            </a>
            <span className="text-gray-700">|</span>
            <a href="http://cmy.tw/008I6c" target="_blank" className="text-gray-500 hover:text-[#d4af37] text-xs font-bold transition-colors">
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
        onClick={() => document.getElementById("download-section")?.scrollIntoView({ behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 bg-[#1d4ed8] hover:bg-[#1e40af] px-4 py-3 md:px-6 md:py-4 text-[14px] md:text-base font-black text-white rounded-full shadow-[0_4px_24px_rgba(37,99,235,0.6)] active:scale-95 transition-all cursor-pointer"
      >
        立即體驗處置神器
      </button>
    </div>
  );
};

export default DispositionGodLanding;
