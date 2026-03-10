import React from 'react';
import { Feature } from '../constants';

interface StackingCardProps {
  feature: Feature;
  index: number;
  total: number;
  variant?: 'chapter' | 'skill';
}

export const StackingCard: React.FC<StackingCardProps> = ({ feature, index, total, variant = 'chapter' }) => {
  const stickyTop = 80 + index * 30;

  return (
    <div
      className="w-full sticky scroll-reveal"
      style={{ top: `${stickyTop}px`, zIndex: index }}
    >
      <div className="course-card-bg rounded-[1.2rem] md:rounded-[2rem] p-4 md:p-8 mb-3 md:mb-4 shadow-[0_-20px_50px_rgba(0,0,0,0.9)] border border-white/5 backdrop-blur-xl group transition-transform duration-500 hover:scale-[1.01]">
        <div className="flex items-center gap-3 md:gap-10">

          {/* Silver Metallic Number */}
          <div className="flex-shrink-0 relative pr-3 md:pr-10">
            <span className="text-silver-gradient text-3xl md:text-8xl font-black serif-font select-none leading-none inline-block drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]">
              {feature.id < 10 ? `0${feature.id}` : feature.id}
            </span>
          </div>

          <div className="flex-1 relative">
            {variant === 'chapter' && feature.duration && (
              <div className="absolute -top-1 md:-top-2 right-0 flex items-center gap-1 md:gap-1.5 opacity-70">
                <span className="text-white text-[20px] md:text-sm font-bold serif-font">
                  {feature.duration}
                </span>
                <i className="fas fa-star text-[#d4af37] text-[6px] md:text-[8px]"></i>
              </div>
            )}

            <span className="text-gray-500 text-[20px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-black block mb-0.5 md:mb-1 opacity-50">
              {variant === 'skill' ? 'Skill' : 'Chapter'}
            </span>

            <h3 className="text-[20px] md:text-4xl font-black text-[#d4af37] serif-font tracking-tight leading-tight">
              {feature.title}
            </h3>

            {variant === 'skill' && feature.duration && (
              <p className="text-gray-300 text-[20px] md:text-lg font-bold serif-font mt-1 md:mt-2 leading-relaxed">
                {feature.duration}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
