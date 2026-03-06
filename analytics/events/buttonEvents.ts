// 按鈕點擊事件追蹤
import { sendEvent } from "../gtag";
import { sendFBCustomEvent } from "../fbq";
import { GA_CONFIG } from "../config";

export interface ButtonClickParams {
  button_text: string;
  button_location: string;
  destination_section?: string;
}

// 通用按鈕點擊追蹤
export const trackButtonClick = (params: ButtonClickParams): void => {
  sendEvent("button_click", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    ...params,
  });
};

// CTA 按鈕點擊追蹤 (GA4 + Meta Pixel)
export const trackCTAClick = (location: string, text: string): void => {
  // GA4 追蹤
  trackButtonClick({
    button_text: text,
    button_location: location,
    destination_section: "registration",
  });

  // Meta Pixel - 自訂事件
  sendFBCustomEvent("CTAClick", {
    button_text: text,
    button_location: location,
  });
};

// 導航點擊追蹤
export const trackNavClick = (menuItem: string): void => {
  sendEvent("nav_click", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.NAVIGATION,
    menu_item: menuItem,
  });
};

// 課程卡片點擊追蹤
export const trackCourseCardClick = (cardId: number, cardTitle: string): void => {
  sendEvent("course_card_click", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    card_id: cardId,
    card_title: cardTitle,
  });
};
