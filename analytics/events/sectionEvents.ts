// 區段曝光事件追蹤
import { sendEvent } from "../gtag";
import { sendFBEvent, sendFBCustomEvent } from "../fbq";
import { GA_CONFIG, SectionId } from "../config";

// 區段曝光追蹤 (GA4 + Meta Pixel)
export const trackSectionView = (sectionId: SectionId): void => {
  const sectionKey = GA_CONFIG.SECTIONS[sectionId];

  // GA4 追蹤
  sendEvent("section_view", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    section_id: sectionKey,
    section_name: sectionId,
  });

  // Meta Pixel - 自訂事件 SectionView，所有區塊都送
  sendFBCustomEvent("SectionView", {
    section_id: sectionKey,
    section_name: sectionId,
  });

  // Meta Pixel - 報名區段曝光時觸發 ViewContent
  if (sectionId === "registration") {
    sendFBEvent("ViewContent", {
      content_name: "Registration Section",
      content_category: "course_registration",
    });
  }
};

// 區段停留時間追蹤 (GA4 + Meta Pixel)
export const trackSectionEngagement = (
  sectionId: SectionId,
  engagementTimeMs: number
): void => {
  const sectionKey = GA_CONFIG.SECTIONS[sectionId];

  sendEvent("section_engagement", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    section_id: sectionKey,
    section_name: sectionId,
    engagement_time_ms: engagementTimeMs,
  });

  sendFBCustomEvent("SectionDwell", {
    section_id: sectionKey,
    section_name: sectionId,
    engagement_time_ms: engagementTimeMs,
  });
};
