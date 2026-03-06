// 滾動深度事件追蹤
import { sendEvent } from "../gtag";
import { GA_CONFIG, ScrollThreshold } from "../config";

// 發送滾動深度事件
export const trackScrollDepth = (percentage: ScrollThreshold): void => {
  sendEvent("scroll_depth", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    scroll_percentage: percentage,
    page_location: window.location.pathname,
  });
};

// 建立滾動追蹤器 (防止重複發送)
export const createScrollTracker = () => {
  const trackedDepths = new Set<number>();

  return (currentPercentage: number): void => {
    GA_CONFIG.SCROLL_THRESHOLDS.forEach((threshold) => {
      if (currentPercentage >= threshold && !trackedDepths.has(threshold)) {
        trackedDepths.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  };
};
