"use client";

import { useLanding } from "@/components/landing/LandingProvider";
import { MetricCard, SectionHeading, SectionShell } from "@/components/landing/shared";

function TrustSection() {
  const { dictionary } = useLanding();

  return (
    <div className="space-y-10 pt-20 sm:pt-24 lg:pt-28">
      <SectionHeading
        description={dictionary.trust.description}
        eyebrow={dictionary.trust.eyebrow}
        title={dictionary.trust.title}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dictionary.trust.stats.map((item) => (
          <MetricCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}

export function RouteSection() {
  const { dictionary } = useLanding();

  return (
    <section>
      <SectionShell className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              description={dictionary.route.description}
              eyebrow={dictionary.route.eyebrow}
              title={dictionary.route.title}
            />

            <ul className="space-y-3">
              {dictionary.route.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-3 text-sm leading-7 text-[var(--text-primary)]"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-panel overflow-hidden rounded-[30px] p-5 sm:p-6">
            <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-panel)] p-4">
              <div className="relative h-[320px] overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_20%_20%,var(--hero-glow-blue),transparent_20%),radial-gradient(circle_at_80%_25%,var(--hero-glow-green),transparent_18%),linear-gradient(180deg,var(--surface-panel),var(--surface-elevated))]">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  viewBox="0 0 620 320"
                >
                  <path
                    d="M54 215c35-56 82-138 156-151 74-15 153 13 188 74 36 64 13 157-59 167-68 10-107-57-159-65-55-8-91 40-126-25Z"
                    stroke="var(--accent)"
                    strokeLinecap="round"
                    strokeWidth="10"
                  />
                  <circle cx="126" cy="236" fill="var(--text-primary)" r="8" />
                  <circle cx="495" cy="113" fill="var(--accent)" r="8" />
                </svg>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {dictionary.route.metrics.map((item) => (
                <MetricCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>

        <TrustSection />
      </SectionShell>
    </section>
  );
}
