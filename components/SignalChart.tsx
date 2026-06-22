import React from "react";

/**
 * 模擬「當沖飆股神手」盤中走勢 + 連次/連量燈號的示意圖 (純 SVG,非截圖)。
 * 確定性繪製 (無亂數),SSR / client 一致。
 */

// 確定性 K 棒
const BARS = Array.from({ length: 26 }, (_, i) => {
  const base = 70 + Math.sin(i * 0.6) * 26 + Math.cos(i * 0.27) * 14;
  const len = 14 + Math.abs(Math.sin(i * 1.1) * 26);
  const up = (i * 5) % 3 !== 0;
  return { y: base, len, up };
});

// 連次燈號 (底部一排,部分亮)
const LIGHTS = Array.from({ length: 12 }, (_, i) => i < 8 || i === 10);

export const SignalChart: React.FC<{ highlight?: number; className?: string }> = ({
  highlight = 18,
  className = "",
}) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 360 220" className="w-full h-auto" fill="none">
      <defs>
        <linearGradient id="scArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#27e0ff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#27e0ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 格線 */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="8" y1={y} x2="352" y2={y} stroke="#27e0ff" strokeOpacity="0.08" strokeWidth="1" />
      ))}

      {/* 折線 + 區域 */}
      <polyline
        points={BARS.map((b, i) => `${14 + i * 13},${b.y}`).join(" ")}
        stroke="#27e0ff"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <polygon
        points={`14,170 ${BARS.map((b, i) => `${14 + i * 13},${b.y}`).join(" ")} ${14 + (BARS.length - 1) * 13},170`}
        fill="url(#scArea)"
      />

      {/* K 棒 */}
      {BARS.map((b, i) => {
        const x = 14 + i * 13;
        const col = b.up ? "#f84444" : "#27c281";
        const hot = i === highlight;
        return (
          <g key={i}>
            <line x1={x} y1={b.y - b.len / 2} x2={x} y2={b.y + b.len / 2} stroke={col} strokeWidth="1.5" />
            <rect x={x - 3} y={b.y - b.len / 3} width="6" height={(b.len / 3) * 2} rx="1" fill={col} />
            {hot && (
              <circle cx={x} cy={b.y - b.len / 2 - 8} r="4" fill="#ffd84d" className="tech-pulse" />
            )}
          </g>
        );
      })}

      {/* 連次燈號列 */}
      {LIGHTS.map((on, i) => (
        <rect
          key={i}
          x={20 + i * 28}
          y={194}
          width="18"
          height="10"
          rx="2"
          fill={on ? "#27e0ff" : "#1b2b44"}
          opacity={on ? 0.95 : 1}
        />
      ))}
    </svg>
  </div>
);
