import React, { useState, useEffect, useCallback, useRef } from "react";

import slide01 from "../assets/features/daily-report-01.png";
import slide02 from "../assets/features/daily-report-02.png";
import slide03 from "../assets/features/daily-report-03.png";

const SLIDES = [slide01, slide02, slide03];

export const FeatureCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();
  const touchStartRef = useRef(0);
  const touchDeltaRef = useRef(0);

  const total = SLIDES.length;

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  const resetAutoPlay = useCallback(() => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [resetAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchDeltaRef.current = 0;
    clearInterval(autoPlayRef.current);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaRef.current) > 50) {
      if (touchDeltaRef.current < 0) goTo(current + 1);
      else goTo(current - 1);
    }
    resetAutoPlay();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaRef.current = e.touches[0].clientX - touchStartRef.current;
  };

  return (
    <div className="w-full">
      {/* Crossfade carousel - base is same, only highlights change */}
      <div
        className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* All slides stacked, crossfade via opacity */}
        {SLIDES.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`處置日報 ${idx + 1}`}
            className={`w-full h-auto block transition-opacity duration-700 ease-in-out ${
              idx === 0 ? "relative" : "absolute inset-0"
            }`}
            style={{ opacity: idx === current ? 1 : 0 }}
            draggable={false}
          />
        ))}

        {/* Desktop arrows */}
        <button
          onClick={() => { goTo(current - 1); resetAutoPlay(); }}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/20 items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all z-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={() => { goTo(current + 1); resetAutoPlay(); }}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/20 items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all z-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4 md:mt-6">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { goTo(idx); resetAutoPlay(); }}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? "w-8 h-2.5 bg-[#d4af37]"
                : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
