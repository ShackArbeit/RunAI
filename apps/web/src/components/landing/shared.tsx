import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

type MetricCardProps = {
  value: string;
  label: string;
};

type ActionButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function SectionShell({ id, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={classes(
        "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={classes(
        "flex max-w-3xl flex-col gap-4",
        isCenter && "mx-auto items-center text-center",
      )}
    >
      <p className="font-caption text-[12px] uppercase tracking-[0.28em] text-[var(--accent)] sm:text-[13px]">
        {eyebrow}
      </p>
      <h2 className="mb-2 font-heading text-balance text-4xl leading-[0.98] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-5 transition-transform duration-300 hover:-translate-y-1">
      <p className="font-heading text-3xl leading-none text-[var(--text-primary)] sm:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{label}</p>
    </div>
  );
}

export function ActionButton({
  children,
  variant = "primary",
}: ActionButtonProps) {
  const primary = variant === "primary";

  return (
    <span
      className={classes(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-md font-semibold transition-all duration-300 sm:px-6 sm:py-3.5",
        primary
          ? "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]"
          : "border border-[var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
      )}
    >
      {children}
    </span>
  );
}
