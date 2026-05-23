import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OrbitImagesProps {
  images: string[];
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  shape?: 'circle' | 'ellipse';
  direction?: 'normal' | 'reverse';
  showPath?: boolean;
  fill?: boolean;
  paused?: boolean;
  responsive?: boolean;
  className?: string;
}

export function OrbitImages({
  images,
  radius = 140,
  radiusX,
  radiusY,
  rotation = 0,
  duration = 30,
  itemSize = 72,
  shape = 'circle',
  direction = 'normal',
  showPath = false,
  fill = false,
  paused = false,
  className,
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>();
  const startRef = useRef<number | null>(null);

  const rX = radiusX ?? radius;
  const rY = radiusY ?? (shape === 'ellipse' ? radius * 0.4 : radius);
  const containerSize = Math.max(rX, rY) * 2 + itemSize * 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || paused) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>('[data-orbit-item]'));
    const count = items.length;
    const sign = direction === 'reverse' ? -1 : 1;

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000;
      const totalAngle = (elapsed / duration) * 360 * sign;

      items.forEach((item, i) => {
        const angle = ((360 / count) * i + totalAngle + rotation) * (Math.PI / 180);
        const x = rX * Math.cos(angle);
        const y = rY * Math.sin(angle);
        item.style.transform = `translate(${x}px, ${y}px)`;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [rX, rY, rotation, duration, direction, paused]);

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: containerSize, height: containerSize }}
    >
      {showPath && (
        <div
          className="absolute rounded-full border border-fg/10"
          style={{
            width: rX * 2,
            height: rY * 2,
            borderRadius: shape === 'circle' ? '50%' : `${rX}px / ${rY}px`,
          }}
        />
      )}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {images.map((src, i) => (
          <div
            key={i}
            data-orbit-item
            className="absolute transition-none"
            style={{ width: itemSize, height: itemSize }}
          >
            <img
              src={src}
              alt=""
              className={cn(
                'h-full w-full object-cover shadow-xl shadow-black/40',
                fill ? 'rounded-none' : 'rounded-xl',
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrbitImages;
