// 滾動深度追蹤 Hook
import { useEffect, useRef } from "react";
import { createScrollTracker } from "../events/scrollEvents";

export const useScrollTracking = (): void => {
  const scrollTrackerRef = useRef(createScrollTracker());

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          if (docHeight > 0) {
            const scrollPercentage = Math.round((scrollTop / docHeight) * 100);
            scrollTrackerRef.current(scrollPercentage);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
