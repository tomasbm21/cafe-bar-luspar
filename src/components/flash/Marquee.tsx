import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  speed?: "normal" | "fast";
  separator?: string;
  className?: string;
  itemClassName?: string;
}

export function Marquee({ items, speed = "normal", separator = "·", className, itemClassName }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-0",
          speed === "fast" ? "animate-marquee-fast" : "animate-marquee"
        )}
      >
        {doubled.map((item, i) => (
          <span key={i} className={cn("flex items-center text-sm font-medium tracking-wide", itemClassName)}>
            <span className="px-5">{item}</span>
            <span className="opacity-40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
