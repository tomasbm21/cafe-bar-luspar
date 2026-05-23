import { cn } from "@/lib/utils";

interface EditorialEyebrowProps {
  number?: string;
  label: string;
  variant?: "fg" | "cream" | "primary" | "amber";
  rule?: "before" | "after" | "both" | "none";
  className?: string;
}

export function EditorialEyebrow({
  number,
  label,
  variant = "fg",
  rule = "after",
  className,
}: EditorialEyebrowProps) {
  const colorClass =
    variant === "cream"
      ? "text-fg/60"
      : variant === "primary" || variant === "amber"
        ? "text-primary"
        : "text-fg/50";
  const ruleColor =
    variant === "cream"
      ? "bg-fg/25"
      : variant === "primary" || variant === "amber"
        ? "bg-primary/50"
        : "bg-fg/20";

  return (
    <div className={cn("flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em]", colorClass, className)}>
      {(rule === "before" || rule === "both") && <span className={cn("h-px w-8 shrink-0", ruleColor)} aria-hidden />}
      {number && (
        <span className="font-display text-sm font-normal tracking-normal opacity-70">
          {number}
          <span className="opacity-50"> /</span>
        </span>
      )}
      <span>{label}</span>
      {(rule === "after" || rule === "both") && <span className={cn("h-px w-8 shrink-0", ruleColor)} aria-hidden />}
    </div>
  );
}

export default EditorialEyebrow;
