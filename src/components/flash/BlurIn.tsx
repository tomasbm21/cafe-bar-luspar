import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  as?: 'div' | 'span' | 'p' | 'h2' | 'h3';
}

export function BlurIn({
  children,
  className,
  delay = 0,
  duration = 0.85,
  amount = 0.2,
  as = 'div',
}: BlurInProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={cn(className)}
      initial={{ filter: 'blur(18px)', opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </Comp>
  );
}

export default BlurIn;
