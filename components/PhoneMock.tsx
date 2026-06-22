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
