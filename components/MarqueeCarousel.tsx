import React, { useEffect, useRef, useCallback } from "react";

interface MarqueeCarouselProps {
  images: string[];
  speed?: number;
}

export const MarqueeCarousel: React.FC<MarqueeCarouselProps> = ({
  images,
  speed = 0.5,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);

  const getResetPoint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    // Since images are tripled, one "set" is 1/3 of total width
    return track.scrollWidth / 3;
  }, []);

  const animate = useCallback(() => {
    if (isDraggingRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    offsetRef.current += speed;

    const resetPoint = getResetPoint();
    if (resetPoint > 0 && offsetRef.current >= resetPoint) {
      offsetRef.current -= resetPoint;
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [speed, getResetPoint]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleDragStart = (clientX: number) => {
    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    dragOffsetRef.current = offsetRef.current;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - clientX;
    let newOffset = dragOffsetRef.current + delta;

    const resetPoint = getResetPoint();
    if (resetPoint > 0) {
      if (newOffset < 0) newOffset += resetPoint;
      if (newOffset >= resetPoint) newOffset -= resetPoint;
    }

    offsetRef.current = newOffset;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-newOffset}px)`;
    }
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={(e) => {
        e.preventDefault();
        handleDragStart(e.clientX);
      }}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap h-[80px] md:h-[160px]"
        style={{ willChange: "transform" }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="mx-2 md:mx-4 w-[120px] md:w-[320px] flex-shrink-0 h-full"
          >
            <img
              src={img}
              alt={`實戰紀錄 ${i}`}
              className="w-full h-full object-cover rounded-lg md:rounded-xl shadow-2xl border border-white/10 filter brightness-90 hover:brightness-100 transition-all duration-500 pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
