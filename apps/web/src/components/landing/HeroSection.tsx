"use client";

import { useLanding } from "@/components/landing/LandingProvider";
import { ActionButton, MetricCard, SectionShell } from "@/components/landing/shared";

export function HeroSection() {
  const { dictionary } = useLanding();
  const bars = ["h-10", "h-14", "h-[4.5rem]", "h-24"];

  return (
    <section className="bg-hero pb-14 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 border border-red-900 border-2">
      <SectionShell>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,540px)] lg:gap-12">
          <div className="flex flex-col gap-7 pt-8 sm:pt-12">
            <div className="space-y-5">
              <p className="font-caption text-[12px] uppercase tracking-[0.28em] text-[var(--accent)] sm:text-[13px]">
                {dictionary.hero.eyebrow}
              </p>
              <h1 className="font-heading text-balance text-4xl leading-[0.92] text-[var(--text-primary)] sm:text-6xl lg:text-6xl">
                {dictionary.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
                {dictionary.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#cta">
                <ActionButton>{dictionary.hero.primaryCta}</ActionButton>
              </a>
              <a href="#features">
                <ActionButton variant="secondary">{dictionary.hero.secondaryCta}</ActionButton>
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {dictionary.hero.proof.map((item) => (
                <MetricCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          <div className="surface-panel relative overflow-hidden rounded-[30px] p-5 sm:p-6">
            <div className="absolute inset-x-6 top-0 h-24 bg-linear-to-r from-transparent via-[var(--hero-glow-green)] to-transparent blur-3xl" />
            <div className="relative flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {dictionary.hero.dashboard.title}
              </h2>
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-caption text-[14px] uppercase tracking-[0.18em] text-[var(--accent)]">
                {dictionary.hero.dashboard.badge}
              </span>
            </div>

            <div className="relative mt-5 grid gap-4 md:grid-cols-[260px_minmax(0,1fr)]">
              <article className="rounded-[24px] bg-[var(--surface-panel)] p-5">
                <p className="font-caption text-[15px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                  {dictionary.hero.dashboard.workoutLabel}
                </p>
                <h3 className="mt-3 text-3xl font-semibold leading-tight text-[var(--text-primary)]">
                  {dictionary.hero.dashboard.workoutTitle}
                </h3>
                <p className="mt-3 text-md leading-6 text-[var(--text-secondary)]">
                  {dictionary.hero.dashboard.workoutMeta}
                </p>

                <div className="mt-6 flex h-28 items-end gap-2">
                  {bars.map((heightClass, index) => (
                    <span
                      key={heightClass}
                      className={`w-full rounded-t-xl ${heightClass} ${
                        index === bars.length - 1
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--surface-muted)]"
                      }`}
                    />
                  ))}
                </div>
              </article>

              <div className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-panel)] p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,var(--hero-glow-green),transparent_16%),radial-gradient(circle_at_30%_70%,var(--hero-glow-blue),transparent_24%)]" />
                  <div className="relative h-56 rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface-soft)]">
                    <svg
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full"
                      fill="none"
                      viewBox="0 0 420 220"
                    >
                      <path
                        d="M36 145C64 102 102 37 162 26c59-12 122 11 150 58 29 49 11 121-46 128-55 7-87-46-129-52-44-7-74 26-100-15Z"
                        stroke="var(--accent)"
                        strokeLinecap="round"
                        strokeWidth="8"
                      />
                      <circle cx="86" cy="160" fill="var(--text-primary)" r="7" />
                      <circle cx="344" cy="78" fill="var(--accent)" r="7" />
                    </svg>
                  </div>
                </div>

                <article className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-panel)] p-5">
                  <p className="font-caption text-[15px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                    {dictionary.hero.dashboard.predictionLabel}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                    {dictionary.hero.dashboard.predictionValue}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {dictionary.hero.dashboard.predictionText}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
