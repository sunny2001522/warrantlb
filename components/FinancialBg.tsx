import React from "react";

/**
 * 財經/科技感背景圖層 — 貼合當沖官方內頁圖的設計語言:
 * 發光網格 + K 線剪影 + 走勢折線 + 角框 + 光點節點。
 * 純 SVG/CSS,絕對定位疊在 section 底,pointer-events-none。
 * 所有圖形以 index 計算(無 Math.random),SSR 預渲染與 client 一致。
 */

type Variant = "hero" | "band";

interface Props {
  variant?: Variant;
  /** 主色 (科技線條) */
  accent?: string;
  /** 點綴色 (品牌金) */
  gold?: string;
  className?: string;
}

// 確定性 K 線資料
const CANDLES = Array.from({ length: 56 }, (_, i) => {
  const wick = 24 + Math.abs(Math.sin(i * 1.27) * 70) + (i % 4) * 8;
  const body = 10 + Math.abs(Math.cos(i * 0.9) * 34);
  const up = (i * 7) % 3 !== 0;
  return { wick, body, up };
});

// 確定性走勢折線
const TICK_POINTS = Array.from({ length: 40 }, (_, i) => {
  const x = (i / 39) * 1200;
  const y = 300 + Math.sin(i * 0.55) * 70 + Math.cos(i * 0.21) * 40 + (i % 6) * 4 - 60;
  return `${x.toFixed(0)},${y.toFixed(0)}`;
}).join(" ");

const Brackets: React.FC<{ color: string }> = ({ color }) => (
  <>
    <svg className="absolute top-4 left-4 w-8 h-8 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none">
      <path d="M2 18V2H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
    <svg className="absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none">
      <path d="M46 18V2H30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
    <svg className="absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none">
      <path d="M2 30V46H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
    <svg className="absolute bottom-4 right-4 w-8 h-8 md:w-12 md:h-12" viewBox="0 0 48 48" fill="none">
      <path d="M46 30V46H30" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  </>
);

export const FinancialBg: React.FC<Props> = ({
  variant = "band",
  accent = "#2563eb",
  gold = "#d4af37",
  className = "",
}) => {
  const isHero = variant === "hero";

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* 發光網格 (上方漸隱) */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isHero ? 0.1 : 0.06,
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "46px 46px",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 0%, #000 30%, transparent 80%)",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 0%, #000 30%, transparent 80%)",
        }}
      ></div>

      {/* K 線剪影 (底部) */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: isHero ? "46%" : "34%", opacity: isHero ? 0.14 : 0.08 }}
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        {CANDLES.map((c, i) => {
          const x = 10 + i * 21.4;
          const col = c.up ? "#f84444" : "#27c281";
          const cy = 130 - (i % 7) * 6;
          return (
            <g key={i} stroke={col} fill={col}>
              <line x1={x} y1={cy - c.wick / 2} x2={x} y2={cy + c.wick / 2} strokeWidth="1.5" />
              <rect x={x - 4} y={cy - c.body / 2} width="8" height={c.body} rx="1" opacity="0.9" />
            </g>
          );
        })}
      </svg>

      {/* 走勢折線 + 光點 */}
      {isHero && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          fill="none"
          style={{ opacity: 0.5 }}
        >
          <defs>
            <linearGradient id="fbStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={accent} stopOpacity="0" />
              <stop offset="0.5" stopColor={gold} stopOpacity="0.6" />
              <stop offset="1" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={TICK_POINTS} stroke="url(#fbStroke)" strokeWidth="2" />
          {[180, 480, 760, 1020].map((x, i) => {
            const y = 300 + Math.sin((x / 30) * 0.55) * 40 - 40;
            return <circle key={i} cx={x} cy={y} r="3.5" fill={gold} opacity="0.7" />;
          })}
        </svg>
      )}

      {/* 角框 (僅 hero) */}
      {isHero && <Brackets color={`${accent}66`} />}
    </div>
  );
};
