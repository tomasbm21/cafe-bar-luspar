import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  by?: 'char' | 'word';
  once?: boolean;
  from?: 'bottom' | 'top' | 'left';
}

export function SplitText({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.025,
  by = 'char',
  once = true,
  from = 'bottom',
}: SplitTextProps) {
  const items = by === 'char' ? text.split('') : text.split(' ');

  const initial =
    from === 'bottom' ? { y: '110%', opacity: 0 } :
    from === 'top'    ? { y: '-110%', opacity: 0 } :
                        { x: '-40px', opacity: 0 };

  const animate = from === 'left' ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 };

  return (
    <span className={cn('inline-flex flex-wrap', className)} aria-label={text}>
      {items.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={cn('inline-block', charClassName)}
            initial={initial}
            whileInView={animate}
            viewport={{ once }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item === ' ' ? ' ' : item}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default SplitText;
