// GA4 配置常數
export const GA_CONFIG = {
  // GA4 Measurement ID
  MEASUREMENT_ID: "G-LS8DYR2N8X",

  // 開發模式下開啟 debug
  DEBUG_MODE: import.meta.env.DEV,

  // 滾動深度追蹤閾值
  SCROLL_THRESHOLDS: [25, 50, 75, 100] as const,

  // 區段 ID 對應
  SECTIONS: {
    problem: "problem_section",
    method: "method_section",
    lecturer: "lecturer_section",
    chapters: "chapters_section",
    appVip: "app_vip_section",
    registration: "registration_section",
    faq: "faq_section",
  },

  // 事件類別
  EVENT_CATEGORIES: {
    ENGAGEMENT: "engagement",
    CONVERSION: "conversion",
    NAVIGATION: "navigation",
  },
} as const;

// 型別匯出
export type SectionId = keyof typeof GA_CONFIG.SECTIONS;
export type ScrollThreshold = (typeof GA_CONFIG.SCROLL_THRESHOLDS)[number];
