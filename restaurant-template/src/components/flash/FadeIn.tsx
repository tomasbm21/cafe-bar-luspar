import { motion, type Variants } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function FadeIn({ delay = 0, className, children, ...props }: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ delay, duration: 0.65, ease: "easeOut" }}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
