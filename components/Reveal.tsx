import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  delay = 0, 
  className = "", 
  threshold = 0.1,
  once = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold, once]);

  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? 'animate-reveal' : 'opacity-0'}`}
      style={{ 
        animationDelay: `${delay}ms`,
        // 確保 sticky 元件在動畫期間不會被裁切或位置錯誤
        position: 'relative'
      }}
    >
      {children}
    </div>
  );
};