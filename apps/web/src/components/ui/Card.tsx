import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={cn(
        "surface-panel rounded-[24px] border border-[var(--border-subtle)] bg-[rgba(13,27,47,0.92)]",
        "p-4 sm:p-5 md:rounded-[28px] md:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}
