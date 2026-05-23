import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  itemClassName?: string;
}

const containerVariants = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function StaggerList({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  itemClassName,
}: StaggerListProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants(stagger, delay)}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={itemVariants} className={cn(itemClassName)}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default StaggerList;
