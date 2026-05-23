import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down';
}

export function TextReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = 'up',
}: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={cn(className)}
        initial={{ y: direction === 'up' ? '105%' : '-105%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default TextReveal;
