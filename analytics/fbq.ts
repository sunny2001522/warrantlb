// Meta Pixel 核心封裝
import { GA_CONFIG } from "./config";

// Meta Pixel ID (請替換為實際的 Pixel ID)
export const META_PIXEL_ID = "1287370458299408";

// 開發模式 debug
const DEBUG_MODE = GA_CONFIG.DEBUG_MODE;

// 擴展 Window 介面
declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
    };
    _fbq: unknown;
  }
}

// 初始化 Meta Pixel
export const initMetaPixel = (): void => {
  if (typeof window === "undefined") return;

  // 避免重複初始化
  if (window.fbq && window.fbq.loaded) {
    if (DEBUG_MODE) {
      console.log("[Meta Pixel] Already initialized");
    }
    return;
  }

  // Meta Pixel 基礎代碼
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as Window["fbq"];

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";

  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  // 動態載入 fbevents.js
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  // 初始化 Pixel
  window.fbq("init", META_PIXEL_ID);

  // 發送 PageView
  window.fbq("track", "PageView");

  if (DEBUG_MODE) {
    console.log("[Meta Pixel] Initialized with ID:", META_PIXEL_ID);
  }
};

// 發送標準事件
export const sendFBEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window === "undefined" || !window.fbq) {
    if (DEBUG_MODE) {
      console.warn("[Meta Pixel] fbq not initialized");
    }
    return;
  }

  if (DEBUG_MODE) {
    console.log("[Meta Pixel Event]", eventName, params);
  }

  window.fbq("track", eventName, params);
};

// 發送自訂事件
export const sendFBCustomEvent = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (typeof window === "undefined" || !window.fbq) {
    if (DEBUG_MODE) {
      console.warn("[Meta Pixel] fbq not initialized");
    }
    return;
  }

  if (DEBUG_MODE) {
    console.log("[Meta Pixel Custom Event]", eventName, params);
  }

  window.fbq("trackCustom", eventName, params);
};
