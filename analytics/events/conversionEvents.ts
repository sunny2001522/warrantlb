// 轉換事件追蹤
import { sendEvent } from "../gtag";
import { sendFBEvent } from "../fbq";
import { GA_CONFIG } from "../config";
import type { RegistrationInfo } from "../../constants";

// 報名開始追蹤 (使用 GA4 電商事件 + Meta Pixel)
export const trackRegistrationStart = (registration: RegistrationInfo): void => {
  // GA4 追蹤
  sendEvent("begin_checkout", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.CONVERSION,
    currency: "TWD",
    value: registration.discountPrice,
    items: [
      {
        item_id: `event_${registration.id}`,
        item_name: registration.title,
        price: registration.discountPrice,
        quantity: 1,
      },
    ],
  });

  // Meta Pixel - AddToCart 標準事件
  sendFBEvent("AddToCart", {
    content_ids: [String(registration.functionId)],
    content_name: registration.title,
    content_type: "product",
    content_category: "course_registration",
    currency: "TWD",
    value: registration.discountPrice,
    num_items: 1,
  });

  // Meta Pixel - InitiateCheckout 標準事件
  sendFBEvent("InitiateCheckout", {
    content_ids: [String(registration.functionId)],
    content_name: registration.title,
    content_type: "product",
    content_category: "course_registration",
    currency: "TWD",
    value: registration.discountPrice,
    num_items: 1,
  });
};

// FAQ 展開追蹤
export const trackFAQExpand = (questionId: number, question: string): void => {
  sendEvent("faq_expand", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    faq_id: questionId,
    faq_question: question,
  });
};

// 外部連結點擊追蹤
export const trackOutboundClick = (url: string, linkText: string): void => {
  sendEvent("outbound_click", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    link_url: url,
    link_text: linkText,
  });
};

export const trackLiveLoginAttempt = (source: string): void => {
  sendEvent("live_login_attempt", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.CONVERSION,
    source,
  });
};

export const trackLiveLoginBlocked = (
  reason: "in_progress" | "cooldown",
  retryAfterSeconds?: number
): void => {
  sendEvent("live_login_blocked", {
    event_category: GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    reason,
    retry_after_seconds: retryAfterSeconds,
  });
};

export const trackLiveLoginResult = (
  status: "success" | "failed",
  detail?: string
): void => {
  sendEvent("live_login_result", {
    event_category: status === "success"
      ? GA_CONFIG.EVENT_CATEGORIES.CONVERSION
      : GA_CONFIG.EVENT_CATEGORIES.ENGAGEMENT,
    status,
    detail,
  });
};
