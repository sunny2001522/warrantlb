import React from "react";
import { SignalChart } from "./SignalChart";

/** 手機外框 (示意 APP 畫面,純 CSS/SVG) */
export const PhoneMock: React.FC<{ label?: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="relative mx-auto w-[220px] md:w-[270px]">
    <div className="relative rounded-[2.2rem] border-[6px] border-[#16273f] bg-[#091422] shadow-[0_24px_70px_rgba(0,0,0,0.6)] overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-2.5 pb-1 text-[8px] text-gray-400">
        <span className="font-bold">10:08</span>
        <span className="flex gap-1.5">
          <i className="fas fa-signal"></i>
          <i className="fas fa-wifi"></i>
          <i className="fas fa-battery-three-quarters"></i>
        </span>
      </div>
      {label && (
        <div className="px-3 pb-1.5 flex items-center gap-2 border-b border-white/5">
          <i className="fas fa-chevron-left text-gray-500 text-[9px]"></i>
          <span className="text-white text-[11px] font-black">{label}</span>
        </div>
      )}
      {children}
    </div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-[#16273f] rounded-b-xl"></div>
  </div>
);

/* ── 個股資訊清單 (示意,連次/連量欄位部分亮燈) ── */
const ROWS = [
  { code: "2330", up: true, price: "1085", chg: "+2.4%", ci: 8, liang: true },
  { code: "2454", up: true, price: "1340", chg: "+3.1%", ci: 6, liang: false },
  { code: "2317", up: false, price: "208.5", chg: "-0.9%", ci: 2, liang: false },
  { code: "3008", up: true, price: "2895", chg: "+1.8%", ci: 7, liang: true },
  { code: "2327", up: true, price: "612", chg: "+4.5%", ci: 9, liang: true },
  { code: "2603", up: false, price: "198", chg: "-1.2%", ci: 1, liang: false },
  { code: "3481", up: true, price: "16.85", chg: "+2.0%", ci: 5, liang: false },
  { code: "2409", up: true, price: "18.2", chg: "+1.1%", ci: 4, liang: false },
];

export const StockListMock: React.FC = () => (
  <PhoneMock label="個股資訊">
    <div className="px-2 py-1.5">
      <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.7fr] gap-1 px-1.5 py-1 text-[8px] text-gray-500 font-bold">
        <span>商品</span>
        <span className="text-right">成交</span>
        <span className="text-center">連次</span>
        <span className="text-center">連量</span>
      </div>
      {ROWS.map((r) => {
        const col = r.up ? "#f84444" : "#27c281";
        return (
          <div key={r.code} className="grid grid-cols-[1.4fr_1fr_0.8fr_0.7fr] gap-1 px-1.5 py-[5px] items-center border-t border-white/5">
            <span className="text-white text-[10px] font-black">{r.code}</span>
            <span className="text-right text-[10px] font-black tabular-nums" style={{ color: col }}>
              {r.price}
              <span className="block text-[7px] font-bold">{r.chg}</span>
            </span>
            <span className="flex justify-center">
              <span
                className="px-1.5 py-0.5 rounded text-[8px] font-black tabular-nums"
                style={{ background: r.ci >= 6 ? "rgba(39,224,255,0.9)" : "rgba(255,255,255,0.06)", color: r.ci >= 6 ? "#001018" : "#9fb3c8" }}
              >
                {r.ci}
              </span>
            </span>
            <span className="flex justify-center">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ background: r.liang ? "#ffd84d" : "#1b2b44", boxShadow: r.liang ? "0 0 6px #ffd84d" : "none" }}
              ></span>
            </span>
          </div>
        );
      })}
    </div>
  </PhoneMock>
);

/* ── 走勢圖手機畫面 (示意) ── */
export const ChartMock: React.FC = () => (
  <PhoneMock label="個股資訊">
    <div className="px-2.5 py-3">
      <SignalChart />
    </div>
  </PhoneMock>
);

/* ── 桌面視窗外框 (PC 軟體示意) ── */
const DesktopFrame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="w-full rounded-xl overflow-hidden border border-[#2563eb]/30 bg-[#091422] shadow-[0_16px_50px_rgba(0,0,0,0.5)]">
    <div className="flex items-center gap-2 px-3 py-2 bg-[#0c1a2e] border-b border-white/5">
      <span className="w-2.5 h-2.5 rounded-full bg-[#f84444]"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-[#ffd84d]"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-[#27c281]"></span>
      <span className="ml-2 text-[10px] text-gray-400 font-black tracking-wider">{title}</span>
    </div>
    {children}
  </div>
);

/* ── 挑選權證小幫手 PC 畫面 (示意) ── */
const WARRANT_ROWS = [
  { code: "058839", name: "台積電淞", spread: "0.8%", iv: "38%", lev: "6.2x", hot: true },
  { code: "071234", name: "鴻海凰", spread: "1.1%", iv: "42%", lev: "5.8x", hot: false },
  { code: "049921", name: "聯發科捷", spread: "0.6%", iv: "35%", lev: "7.1x", hot: true },
  { code: "066118", name: "廣達威", spread: "1.4%", iv: "45%", lev: "4.9x", hot: false },
  { code: "052277", name: "緯創豹", spread: "0.9%", iv: "40%", lev: "6.5x", hot: false },
];

export const WarrantPickerMock: React.FC = () => (
  <DesktopFrame title="挑選權證小幫手">
    <div className="p-2">
      <div className="grid grid-cols-[1.3fr_1fr_0.8fr_0.8fr_0.8fr] gap-1 px-2 py-1.5 text-[9px] text-gray-500 font-bold border-b border-white/5">
        <span>權證</span><span>標的</span><span className="text-right">價差比</span><span className="text-right">隱波</span><span className="text-right">槓桿</span>
      </div>
      {WARRANT_ROWS.map((r) => (
        <div key={r.code} className="grid grid-cols-[1.3fr_1fr_0.8fr_0.8fr_0.8fr] gap-1 px-2 py-1.5 items-center border-b border-white/5">
          <span className="text-white text-[10px] font-black flex items-center gap-1.5">
            {r.hot && <span className="w-1.5 h-1.5 rounded-full bg-[#ffd84d] shadow-[0_0_5px_#ffd84d]"></span>}
            {r.code}
          </span>
          <span className="text-gray-300 text-[10px] font-bold">{r.name}</span>
          <span className="text-right text-[10px] font-black text-[#27e0ff] tabular-nums">{r.spread}</span>
          <span className="text-right text-[10px] font-bold text-gray-300 tabular-nums">{r.iv}</span>
          <span className="text-right text-[10px] font-black text-[#d4af37] tabular-nums">{r.lev}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 px-2 pt-2 pb-1">
        <span className="px-2 py-0.5 rounded bg-[#d4af37]/15 border border-[#d4af37]/50 text-[#d4af37] text-[8px] font-black">低價差</span>
        <span className="px-2 py-0.5 rounded bg-[#27e0ff]/10 border border-[#27e0ff]/50 text-[#27e0ff] text-[8px] font-black">低隱波</span>
        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/15 text-gray-300 text-[8px] font-black">高槓桿</span>
      </div>
    </div>
  </DesktopFrame>
);

/* ── 可轉債主力分析 PC 畫面 (示意) ── */
const CB_ROWS = [
  { code: "36624", name: "示例三", price: "108.5", premium: "+2.1%", vol: "1,240" },
  { code: "49433", name: "示例二", price: "132.0", premium: "-0.8%", vol: "856" },
  { code: "62443", name: "示例四", price: "101.2", premium: "+0.4%", vol: "2,105" },
  { code: "15982", name: "示例五", price: "115.8", premium: "+3.6%", vol: "634" },
];

export const CbArbMock: React.FC = () => (
  <DesktopFrame title="可轉債主力分析及套利系統">
    <div className="p-2">
      <div className="grid grid-cols-[1fr_1fr_0.9fr_1fr_0.9fr] gap-1 px-2 py-1.5 text-[9px] text-gray-500 font-bold border-b border-white/5">
        <span>代號</span><span>可轉債</span><span className="text-right">價格</span><span className="text-right">溢價率</span><span className="text-right">主力量</span>
      </div>
      {CB_ROWS.map((r) => {
        const neg = r.premium.startsWith("-");
        return (
          <div key={r.code} className="grid grid-cols-[1fr_1fr_0.9fr_1fr_0.9fr] gap-1 px-2 py-1.5 items-center border-b border-white/5">
            <span className="text-white text-[10px] font-black">{r.code}</span>
            <span className="text-gray-300 text-[10px] font-bold">{r.name}</span>
            <span className="text-right text-[10px] font-bold text-gray-200 tabular-nums">{r.price}</span>
            <span className="text-right text-[10px] font-black tabular-nums" style={{ color: neg ? "#27c281" : "#f84444" }}>{r.premium}</span>
            <span className="text-right text-[10px] font-bold text-[#27e0ff] tabular-nums">{r.vol}</span>
          </div>
        );
      })}
      <div className="flex items-center justify-between px-2 pt-2 pb-1">
        <span className="text-[9px] text-gray-500 font-bold">4 大招式・主力手法拆解</span>
        <span className="px-2 py-0.5 rounded bg-[#27c281]/15 border border-[#27c281]/50 text-[#27c281] text-[8px] font-black">套利訊號</span>
      </div>
    </div>
  </DesktopFrame>
);
