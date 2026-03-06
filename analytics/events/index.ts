// 事件模組統一匯出
export {
  trackButtonClick,
  trackCTAClick,
  trackNavClick,
  trackCourseCardClick,
} from "./buttonEvents";

export { trackScrollDepth, createScrollTracker } from "./scrollEvents";

export { trackSectionView, trackSectionEngagement } from "./sectionEvents";

export {
  trackRegistrationStart,
  trackFAQExpand,
  trackOutboundClick,
} from "./conversionEvents";
