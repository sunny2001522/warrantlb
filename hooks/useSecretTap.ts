import { useCallback, useRef, useState } from "react";

/**
 * 快速點任意位置 N 下（在指定時間內）觸發
 * 預設：8 下 / 3 秒
 */
export function useSecretTap(requiredTaps = 8, windowMs = 3000) {
  const [triggered, setTriggered] = useState(false);
  const tapsRef = useRef<number[]>([]);

  const handleTap = useCallback(() => {
    const now = Date.now();
    tapsRef.current.push(now);

    // 只保留時間窗口內的點擊
    tapsRef.current = tapsRef.current.filter((t) => now - t <= windowMs);

    if (tapsRef.current.length >= requiredTaps) {
      tapsRef.current = [];
      setTriggered(true);
    }
  }, [requiredTaps, windowMs]);

  const close = useCallback(() => setTriggered(false), []);

  return { triggered, handleTap, close };
}
