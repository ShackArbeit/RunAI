import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "muted";
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default:
    "border-[var(--border-subtle)] bg-[rgba(255,255,255,0.04)] text-[var(--text-secondary)]",
  accent:
    "border-transparent bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]",
  muted:
    "border-transparent bg-[rgba(42,106,245,0.18)] text-[#dce7f7]",
};

export function Badge({
  children,
  className,
  tone = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
