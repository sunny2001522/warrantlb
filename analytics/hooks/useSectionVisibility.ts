// 區段曝光追蹤 Hook
import { useEffect, useRef, RefObject } from "react";
import { trackSectionView } from "../events/sectionEvents";
import type { SectionId } from "../config";

interface UseSectionVisibilityOptions {
  threshold?: number;
}

export const useSectionVisibility = (
  ref: RefObject<HTMLElement | null>,
  sectionId: SectionId,
  options: UseSectionVisibilityOptions = {}
): void => {
  const { threshold = 0.3 } = options;
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 只在首次曝光時追蹤
          if (entry.isIntersecting && !hasTrackedRef.current) {
            trackSectionView(sectionId);
            hasTrackedRef.current = true;
            // 追蹤後可以停止觀察
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, sectionId, threshold]);
};
