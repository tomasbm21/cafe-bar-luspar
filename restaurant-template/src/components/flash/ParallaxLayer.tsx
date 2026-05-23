import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  axis?: 'y' | 'x';
}

export function ParallaxLayer({
  children,
  speed = 0.25,
  className,
  axis = 'y',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const move = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 120}px`, `${speed * 120}px`],
  );

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={axis === 'y' ? { y: move } : { x: move }}>
        {children}
      </motion.div>
    </div>
  );
}

export default ParallaxLayer;
