import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]",
  secondary:
    "bg-[rgba(255,255,255,0.04)] text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.08)]",
};

export function Button({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        variantClasses[variant],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
