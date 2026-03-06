// Analytics 模組統一匯出
export { GA_CONFIG } from "./config";
export type { SectionId, ScrollThreshold } from "./config";

export { initGA, sendEvent, setUserProperties } from "./gtag";
export { initMetaPixel, sendFBEvent, sendFBCustomEvent, META_PIXEL_ID } from "./fbq";

export * from "./events";
export * from "./hooks";
