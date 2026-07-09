import React from "react";
import { Reveal } from "../components/Reveal";
import { FinancialBg } from "../components/FinancialBg";
import { SignalChart } from "../components/SignalChart";
import { StockListMock, ChartMock } from "../components/PhoneMock";
import { SiteHeader, SiteFooter, usePageMeta } from "../components/SiteChrome";
import { TOOL_CARDS } from "../siteContent";
import daytradeIcon from "../assets/tools/daytrade-icon.jpg";

const OFFICIAL_URL = "https://www.cmoney.tw/app/itemcontent.aspx?id=4776";
const CYAN = "#27e0ff";

/* ── 資料 (來源:當沖飆股神手官方產品內容) ── */
const SIGNALS = [
  { icon: "fas fa-arrow-trend-up", title: "連次增加", desc: "代表主力正在連續攻擊中,內外盤連續站上同方向。" },
  { icon: "fas fa-bolt", title: "連量亮燈", desc: "表示此處出現異常大單,主力資金正在進場。" },
  { icon: "fas fa-rotate", title: "連次熄燈", desc: "連次皆亮燈後熄燈,主力攻擊結束,股價可能在此反轉。" },
];

const BIAS = [
  {
    tone: "long",
    title: "偏多訊號",
    light: "綠燈熄滅",
    desc: "綠燈熄滅代表賣盤竭盡,竭盡點訊號會在此處附近出現,是偏多的轉折參考。",
  },
  {
    tone: "short",
    title: "偏空訊號",
    light: "紅燈熄滅",
    desc: "紅燈熄滅代表買盤竭盡,竭盡點訊號會在此處附近出現,是偏空的轉折參考。",
  },
];

const HELP = [
  { icon: "fas fa-list-check", title: "隔日沖清單", desc: "只抓出對你有幫助的隔日沖標的,找出好的交易機會。" },
  { icon: "fas fa-arrows-up-down", title: "盤中抓轉折", desc: "掌握當沖相對高低點位,擺脫追高殺低。" },
  { icon: "fas fa-chess", title: "十八個選股策略", desc: "透過不同籌碼指標找股票,多空都能賺。" },
  { icon: "fas fa-video", title: "內容專區 VIP 影音", desc: "不定期更新下單實戰解說影音,一窺主力下單實況並分享當沖技巧。" },
];

const LECTURER_BULLETS = [
  "物理老師化身千萬散戶傳奇",
  "只花七個月,用 10 萬滾出 1,000 萬",
  "投資比賽常勝軍,並贏來頂級名車",
  "社群頻道超過 20 萬粉絲追蹤",
  "【理財達人秀】常駐嘉賓,擁有千萬觀看次數",
];

const REVIEWS = [
  { name: "做權證的上班族", text: "通勤時間終於可以好好當沖幫自己加薪,壓力小很多,完全不能沒有它。" },
  { name: "自學投資的學員", text: "之前光看小哥直播就受益匪淺,軟體把主力下單用客觀數據呈現,跟著進出輕鬆多了。" },
  { name: "短線當沖玩家", text: "搭配小哥的布林進出觀念,極強勢股終於實現大賺小賠,布林多咧叭真的好用!" },
  { name: "長期追蹤的粉絲", text: "用竭盡訊抓到好股票賺了一萬多,這次 APP 釋出更多策略,二話不說馬上支持!" },
];

/** /software/day-trade — 當沖飆股神手 (全手刻 UI,非截圖) */
const DayTradePage: React.FC = () => {
  usePageMeta({
    title: "當沖飆股神手 APP|獨家燈號×18策略×竭盡訊號 - 權證小哥官網",
    description:
      "權證小哥-當沖飆股神手APP:你最實用的當沖工具。小哥獨創訊號盤中看出主力攻擊方向與轉折點、隔日沖口袋名單、18 個選股策略、整月當沖對帳單實證。雙平台免費下載。",
    keywords: "當沖飆股神手,當沖,權證小哥,燈號,隔日沖,選股策略,竭盡點,主力攻擊",
    url: "https://warrantlb8888.cmoney.tw/software/day-trade",
  });

  const otherTools = TOOL_CARDS.filter((t) => t.href !== "/software/day-trade").slice(0, 2);

  return (
    <div className="min-h-screen bg-[#060d1a] text-white selection:bg-[#27e0ff] selection:text-black">
      <SiteHeader active="/software" />

      {/* Hero */}
      <section className="relative pt-24 md:pt-36 pb-10 md:pb-16 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#0a1a3a] via-[#08152e] to-[#060d1a]">
        <FinancialBg variant="hero" accent={CYAN} gold={CYAN} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#27e0ff]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <Reveal>
              <div className="tech-frame tech-frame-cyan tech-frame-on tech-pulse w-20 h-20 md:w-24 md:h-24 rounded-3xl mb-5 mx-auto md:mx-0">
                <img src={daytradeIcon} alt="當沖飆股神手" className="w-full h-full rounded-3xl border border-white/20" />
              </div>
              <p className="text-[#27e0ff] text-xs md:text-base font-black tracking-[0.3em] mb-3">DAY TRADE MASTER</p>
              <h1 className="text-3xl md:text-6xl font-black leading-tight mb-3 text-white drop-shadow-[0_2px_20px_rgba(39,224,255,0.3)]">
                當沖飆股神手
              </h1>
              <p className="text-[#9fd8ff] text-base md:text-2xl font-bold mb-6">你最實用的當沖工具</p>
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-7 max-w-xl mx-auto md:mx-0">
                小哥獨創訊號,盤中燈號亮起就看出主力攻擊方向與轉折點;隔日沖口袋名單、18 個選股策略,當沖、盤後選股一支搞定。
              </p>
              <a
                href={OFFICIAL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#27e0ff] to-[#1aa3d6] text-black text-base md:text-xl font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(39,224,255,0.4)]"
              >
                雙平台免費下載
                <i className="fas fa-arrow-right"></i>
              </a>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="tech-frame tech-frame-cyan tech-frame-on tech-scan bg-[#08152e]/80 border border-[#27e0ff]/25 rounded-[1.5rem] p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#27e0ff] text-xs font-black tracking-widest">盤中即時走勢 ・ 連次連量燈號</span>
                <span className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#f84444]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#ffd84d]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#27c281]"></span>
                </span>
              </div>
              <SignalChart />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 獨創訊號 (照圖:手機畫面 + 右側訊號說明連線) */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-[#060d1a] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-14">
            <p className="text-[#27e0ff] text-xs md:text-sm font-black tracking-[0.3em] mb-2">SIGNALS</p>
            <h2 className="text-2xl md:text-5xl font-black text-white">
              小哥獨創訊號 <span className="text-[#27e0ff]">・</span> 抓出股價轉折點
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <Reveal>
              <div className="tech-frame tech-frame-cyan tech-scan rounded-[2.4rem] w-fit mx-auto">
                <StockListMock />
              </div>
            </Reveal>
            <div className="flex flex-col gap-3 md:gap-4">
              {SIGNALS.map((s, i) => (
                <Reveal key={s.title} delay={i * 120}>
                  <div className="relative flex items-start gap-4 bg-[#08152e] border border-[#27e0ff]/20 rounded-2xl p-4 md:p-5 pl-5 md:pl-6">
                    <span className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-[#27e0ff]"></span>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#27e0ff]/15 border border-[#27e0ff]/40 flex items-center justify-center flex-shrink-0">
                      <i className={`${s.icon} text-[#27e0ff]`}></i>
                    </div>
                    <div>
                      <h3 className="text-white text-base md:text-lg font-black mb-1">{s.title}</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 偏多 / 偏空訊號 (照圖:手機走勢圖 + 右側偏多偏空 + 請注意) */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#060d1a] to-[#08152e] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-6">
            <Reveal>
              <div className="tech-frame tech-frame-cyan tech-scan rounded-[2.4rem] w-fit mx-auto">
                <ChartMock />
              </div>
            </Reveal>
            <div className="flex flex-col gap-4">
              {BIAS.map((b, i) => {
                const long = b.tone === "long";
                const c = long ? "#27c281" : "#f84444";
                return (
                  <Reveal key={b.title} delay={i * 120}>
                    <div
                      className="rounded-2xl p-5 md:p-6 border"
                      style={{ borderColor: `${c}55`, background: `linear-gradient(160deg, ${c}1f, #08152e 70%)` }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-3.5 h-3.5 rounded-full tech-pulse" style={{ background: c }}></span>
                        <h3 className="text-lg md:text-2xl font-black text-white">{b.title}</h3>
                        <span className="ml-auto text-xs md:text-sm font-black px-3 py-1 rounded-full" style={{ color: c, border: `1px solid ${c}66` }}>
                          {b.light}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">{b.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <Reveal>
            <div className="flex items-start gap-3 bg-[#27e0ff]/5 border border-[#27e0ff]/25 rounded-2xl px-5 md:px-7 py-4">
              <i className="fas fa-circle-info text-[#27e0ff] mt-0.5 flex-shrink-0"></i>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                <span className="text-white font-black">請注意:</span> 經過籌碼研究後出現的訊號才有意義,訊號是輔助判斷,仍需搭配自身紀律與風險控管。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APP 可以幫助你 (照圖:直式分列) */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-[#08152e] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-12">
            <p className="text-[#27e0ff] text-xs md:text-sm font-black tracking-[0.3em] mb-2">FEATURES</p>
            <h2 className="text-2xl md:text-4xl font-black text-white">
              《當沖飆股神手 APP》可以幫助你
            </h2>
          </Reveal>
          <div className="flex flex-col gap-3 md:gap-4">
            {HELP.map((h, i) => (
              <Reveal key={h.title} delay={i * 80}>
                <div className="tech-frame tech-frame-cyan flex items-center gap-4 md:gap-5 bg-[#0a1a30] border border-[#27e0ff]/20 rounded-2xl p-4 md:p-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#27e0ff]/15 border border-[#27e0ff]/40 flex items-center justify-center flex-shrink-0">
                    <i className={`${h.icon} text-[#27e0ff] text-lg md:text-xl`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="inline-block text-[#27e0ff] text-base md:text-lg font-black border-b-2 border-[#27e0ff]/40 mb-1">
                      {h.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 整月對帳單 */}
      <section className="py-14 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[#08152e] to-[#060d1a] border-t border-white/5">
        <Reveal className="max-w-3xl mx-auto">
          <div className="tech-frame tech-frame-cyan tech-frame-on tech-scan bg-[#0a1a30] border border-[#27e0ff]/25 rounded-[2rem] p-8 md:p-14 text-center">
            <p className="text-[#27e0ff] text-xs md:text-sm font-black tracking-[0.3em] mb-3">REAL RECORD</p>
            <h2 className="text-xl md:text-3xl font-black text-white mb-6">小哥整月當沖交易對帳單</h2>
            <p className="text-gray-400 text-sm md:text-base mb-2">當月當沖總損益(不含退傭)</p>
            <p className="text-5xl md:text-7xl font-black text-[#27e0ff] drop-shadow-[0_2px_24px_rgba(39,224,255,0.4)] tabular-nums">
              +551,122
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-6 leading-relaxed">
              此為實際對帳單紀錄,僅作為教學案例,過往績效不代表未來表現,投資人仍需自行承擔投資風險。
            </p>
          </div>
        </Reveal>
      </section>

      {/* 講師介紹 */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-[#060d1a] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-12">
            <p className="text-[#27e0ff] text-xs md:text-sm font-black tracking-[0.3em] mb-2">LECTURER</p>
            <h2 className="text-2xl md:text-5xl font-black text-white">權證小哥</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {LECTURER_BULLETS.map((b, i) => (
              <Reveal key={b} delay={i * 60}>
                <div className="flex items-start gap-3 bg-[#08152e] border border-[#27e0ff]/20 rounded-xl px-5 py-4 h-full">
                  <i className="fas fa-circle-check text-[#27e0ff] mt-1 flex-shrink-0"></i>
                  <span className="text-gray-200 text-sm md:text-base font-bold">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 好評回饋 */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#060d1a] to-[#08152e] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-8 md:mb-12">
            <p className="text-[#27e0ff] text-xs md:text-sm font-black tracking-[0.3em] mb-2">REVIEWS</p>
            <h2 className="text-2xl md:text-5xl font-black text-white">好評回饋</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-[#0a1a30] border border-[#27e0ff]/15 rounded-[1.25rem] p-5 md:p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#27e0ff]/15 border border-[#27e0ff]/40 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-[#27e0ff]"></i>
                    </div>
                    <span className="text-white text-sm md:text-base font-black">{r.name}</span>
                    <span className="ml-auto text-[#ffd84d] text-xs">★★★★★</span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">「{r.text}」</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 下載 CTA */}
      <section className="px-4 md:px-6 py-12 md:py-20 bg-[#08152e] border-t border-white/5">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">當沖飆股神手 ・ 雙平台免費下載</h2>
          <p className="text-[#9fd8ff] text-sm md:text-lg mb-8">跟著小哥的訊號,當沖不再追高殺低</p>
          <a
            href={OFFICIAL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 md:px-16 py-4 md:py-5 rounded-full bg-gradient-to-r from-[#27e0ff] to-[#1aa3d6] text-black text-base md:text-2xl font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(39,224,255,0.4)]"
          >
            前往理財寶免費試用
            <i className="fas fa-arrow-right"></i>
          </a>
          <p className="text-gray-500 text-xs md:text-sm mt-6 max-w-xl mx-auto leading-relaxed">
            提供免費試用。投資具有風險,本工具僅作為輔助判斷,投資人應獨立判斷審慎評估。
          </p>
        </Reveal>
      </section>

      {/* 看看小哥的其他工具 */}
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
