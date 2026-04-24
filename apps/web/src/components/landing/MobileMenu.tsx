"use client";

import {
  localeLabels,
  locales,
  type LandingDictionary,
  type Locale,
} from "@/components/landing/dictionary";
import { ActionButton } from "@/components/landing/shared";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  dictionary: LandingDictionary;
  locale: Locale;
};

export function MobileMenu({ dictionary, locale }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="min-[476px]:hidden">
      <button
        aria-expanded={isOpen}
        aria-label="Open navigation menu"
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="text-2xl leading-none">{isOpen ? "×" : "☰"}</span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-[color:rgba(8,19,31,0.45)] backdrop-blur-sm">
          <div className="surface-panel flex h-full w-full flex-col gap-6 overflow-y-auto px-5 py-5">
            <div className="flex items-center justify-between">
              <span className="font-heading text-4xl text-[var(--text-primary)]">
                {dictionary.brand}
              </span>
              <button
                aria-label="Close navigation menu"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-primary)]"
                onClick={closeMenu}
                type="button"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>

            <nav aria-label="Mobile Primary" className="flex flex-col gap-2">
              <a
                className="rounded-2xl px-4 py-4 text-xl text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-soft)]"
                href="#features"
                onClick={closeMenu}
              >
                {dictionary.nav.features}
              </a>
              <a
                className="rounded-2xl px-4 py-4 text-xl text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-soft)]"
                href="#how-it-works"
                onClick={closeMenu}
              >
                {dictionary.nav.howItWorks}
              </a>
              <a
                className="rounded-2xl px-4 py-4 text-xl text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-soft)]"
                href="#pricing"
                onClick={closeMenu}
              >
                {dictionary.nav.pricing}
              </a>
            </nav>

            <div className="flex flex-wrap gap-2">
              {locales.map((item) => (
                <Link
                  key={item}
                  className={`rounded-full px-4 py-2.5 text-md font-medium transition-colors ${
                    locale === item
                      ? "bg-[var(--surface-muted)] text-[var(--text-primary)]"
                      : "border border-[var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-secondary)]"
                  }`}
                  href={`/${item}`}
                  onClick={closeMenu}
                >
                  {localeLabels[item]}
                </Link>
              ))}
            </div>

            <ThemeToggle label={dictionary.nav.themeLabel} />

            <div className="mt-auto flex flex-col gap-3 pb-4">
              <a href="#cta" onClick={closeMenu}>
                <ActionButton>{dictionary.nav.startTraining}</ActionButton>
              </a>
              <a href="#cta" onClick={closeMenu}>
                <ActionButton variant="secondary">
                  {dictionary.nav.logoutLabel}
                </ActionButton>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
