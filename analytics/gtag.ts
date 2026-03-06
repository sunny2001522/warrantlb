// gtag 核心封裝
import { GA_CONFIG } from "./config";

// 擴展 Window 介面
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// 初始化 GA4
export const initGA = (): void => {
  if (typeof window === "undefined") return;

  // 初始化 dataLayer
  window.dataLayer = window.dataLayer || [];

  // 定義 gtag 函數 (必須使用 arguments 物件，GA4 依賴此格式)
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  // 設定時間戳
  window.gtag("js", new Date());

  // 配置 GA4
  window.gtag("config", GA_CONFIG.MEASUREMENT_ID, {
    debug_mode: GA_CONFIG.DEBUG_MODE,
    send_page_view: true,
  });

  if (GA_CONFIG.DEBUG_MODE) {
    console.log("[GA4] Initialized with ID:", GA_CONFIG.MEASUREMENT_ID);
  }
};

// 通用事件發送
export const sendEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window === "undefined" || !window.gtag) {
    if (GA_CONFIG.DEBUG_MODE) {
      console.warn("[GA4] gtag not initialized");
    }
    return;
  }

  if (GA_CONFIG.DEBUG_MODE) {
    console.log("[GA4 Event]", eventName, params);
  }

  window.gtag("event", eventName, params);
};

// 設定使用者屬性
export const setUserProperties = (
  properties: Record<string, unknown>
): void => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("set", "user_properties", properties);
};
