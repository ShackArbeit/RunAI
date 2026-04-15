"use client";

import { useLanding } from "@/components/landing/LandingProvider";
import { ActionButton, SectionShell } from "@/components/landing/shared";

const localeLabels = {
  zh: "中文",
  en: "EN",
  de: "DE",
} as const;

export function Header() {
  const { dictionary, locale, locales, setLocale, theme, toggleTheme } = useLanding();

  return (
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur">
      <SectionShell className="pt-5">
        <div className="surface-card flex items-center justify-between rounded-[28px] px-4 py-3 sm:px-5 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--surface-muted),var(--accent))] shadow-[0_8px_20px_var(--hero-glow-green)]" />
            <span className="font-heading text-5xl leading-none text-[var(--text-primary)]">
              {dictionary.brand}
            </span>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <nav
              aria-label="Primary"
              className="flex items-center gap-5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-4 py-2"
            >
              <a className="text-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]" href="#features">
                {dictionary.nav.features}
              </a>
              <a className="text-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]" href="#how-it-works">
                {dictionary.nav.howItWorks}
              </a>
              <a className="text-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]" href="#pricing">
                {dictionary.nav.pricing}
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <div
                aria-label={dictionary.nav.languageLabel}
                className="flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-1"
                role="group"
              >
                {locales.map((item) => (
                  <button
                    key={item}
                    className={`rounded-full px-3 py-1.5 text-md font-medium transition-colors ${
                      locale === item
                        ? "bg-[var(--surface-muted)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                    onClick={() => setLocale(item)}
                    type="button"
                  >
                    {localeLabels[item]}
                  </button>
                ))}
              </div>

              <button
                aria-label={dictionary.nav.themeLabel}
                className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-2 text-md text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                onClick={toggleTheme}
                type="button"
              >
                <span>{theme === "dark" ? "◐" : "◑"}</span>
                <span>{theme === "dark" ? "Dark" : "Light"}</span>
              </button>

              <a href="#cta">
                <ActionButton>{dictionary.nav.startTraining}</ActionButton>
              </a>
            </div>
          </div>

          <a className="lg:hidden" href="#cta">
            <ActionButton>{dictionary.nav.startTraining}</ActionButton>
          </a>
        </div>
      </SectionShell>
    </header>
  );
}
