import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  durationSec?: number;
  className?: string;
}

function parse(value: string) {
  const match = String(value).match(/^([^\d\-+.]*)([\-+]?\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { prefix: "", end: 0, suffix: value, decimals: 0 };
  const [, prefix, num, suffix] = match;
  const normalized = num.replace(",", ".");
  const end = parseFloat(normalized);
  const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0;
  return { prefix: prefix ?? "", end: isNaN(end) ? 0 : end, suffix: suffix ?? "", decimals };
}

export function AnimatedCounter({ value, durationSec = 1.6, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { prefix, end, suffix, decimals } = parse(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: durationSec,
      ease: "easeOut",
      onUpdate(v) { setDisplay(v); },
    });
    return () => controls.stop();
  }, [inView, end, durationSec]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display.toLocaleString("es-ES", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
