import React from 'react';
import { trackCTAClick } from '../analytics';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  trackingLocation?: string; // 追蹤位置 (例如: hero, nav, problem)
}

export const CTAButton: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  trackingLocation = "unknown"
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // 追蹤按鈕點擊
    const buttonText = typeof children === 'string' ? children : 'CTA Button';
    trackCTAClick(trackingLocation, buttonText);

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`red-shimmer-btn inline-block px-6 md:px-10 py-3 md:py-5 text-sm md:text-xl font-black rounded-full text-white shadow-2xl transition-all transform active:scale-95 overflow-hidden focus:outline-none cursor-pointer ${className}`}
    >
      <span className="inline-block">{children}</span>
    </button>
  );
};