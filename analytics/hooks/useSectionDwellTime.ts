// 區段停留時間追蹤 Hook
// 用 IntersectionObserver 累積每個區塊 isIntersecting 的時間，
// 在離開可見、頁面隱藏 (visibilitychange)、頁面卸載 (pagehide) 與 unmount 時 flush。
import { useEffect, RefObject } from "react";
import { trackSectionEngagement } from "../events/sectionEvents";
import type { SectionId } from "../config";

interface DwellSection {
  id: SectionId;
  ref: RefObject<HTMLElement | null>;
}

interface UseSectionDwellTimeOptions {
  threshold?: number;
  // 低於此毫秒數的累積時間不發送，避免噪音
  minDwellMs?: number;
}

interface DwellEntry {
  id: SectionId;
  el: Element;
  totalMs: number;
  visibleSince: number | null;
  inViewport: boolean;
  sent: boolean;
}

const isElementInViewport = (el: Element): boolean => {
  const rect = el.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth
  );
};

export const useSectionDwellTime = (
  sections: DwellSection[],
  options: UseSectionDwellTimeOptions = {},
): void => {
  const { threshold = 0.3, minDwellMs = 1000 } = options;

  useEffect(() => {
    if (typeof window === "undefined" || sections.length === 0) return;

    const entries: DwellEntry[] = [];
    sections.forEach(({ id, ref }) => {
      const el = ref.current;
      if (!el) return;
      entries.push({
        id,
        el,
        totalMs: 0,
        visibleSince: null,
        inViewport: false,
        sent: false,
      });
    });

    if (entries.length === 0) return;

    const now = () => performance.now();

    const accumulate = (entry: DwellEntry) => {
      if (entry.visibleSince !== null) {
        entry.totalMs += now() - entry.visibleSince;
        entry.visibleSince = null;
      }
    };

    const flush = (entry: DwellEntry) => {
      accumulate(entry);
      if (entry.sent) return;
      if (entry.totalMs < minDwellMs) return;
      trackSectionEngagement(entry.id, Math.round(entry.totalMs));
      entry.sent = true;
    };

    const elementMap = new Map<Element, DwellEntry>();
    entries.forEach((e) => elementMap.set(e.el, e));

    const observer = new IntersectionObserver(
      (records) => {
        records.forEach((rec) => {
          const entry = elementMap.get(rec.target);
          if (!entry) return;
          entry.inViewport = rec.isIntersecting;
          if (rec.isIntersecting && document.visibilityState === "visible") {
            if (entry.visibleSince === null) entry.visibleSince = now();
          } else {
            accumulate(entry);
          }
        });
      },
      { threshold },
    );

    entries.forEach((e) => observer.observe(e.el));

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        entries.forEach((e) => accumulate(e));
      } else {
        const t = now();
        entries.forEach((e) => {
          if (e.inViewport || isElementInViewport(e.el)) {
            if (e.visibleSince === null) e.visibleSince = t;
          }
        });
      }
    };

    const handlePageHide = () => {
      entries.forEach((e) => flush(e));
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      entries.forEach((e) => flush(e));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, minDwellMs]);
};
