"use client";

import {
  localeLabels,
  locales,
  type LandingDictionary,
  type Locale,
} from "@/components/landing/dictionary";
import { HeaderAuthActions } from "@/components/landing/HeaderAuthActions";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";

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
    <div className="block min-[476px]:hidden">
      <button
        aria-expanded={isOpen}
        aria-label="Open navigation menu"
        className="relative z-[70] flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-soft)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="relative h-5 w-5" aria-hidden="true">
          {isOpen ? (
            <>
              <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
              <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
            </>
          ) : (
            <>
              <span className="absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current" />
              <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current" />
              <span className="absolute left-0 bottom-1 h-0.5 w-5 rounded-full bg-current" />
            </>
          )}
        </span>
      </button>

      {typeof document !== "undefined" && isOpen
        ? createPortal(
            <div className="fixed inset-0 z-[60] bg-[color:rgba(8,19,31,0.45)] backdrop-blur-sm">
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
                <span className="relative h-5 w-5" aria-hidden="true">
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                </span>
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
              <HeaderAuthActions
                direction="column"
                logoutLabel={dictionary.nav.logoutLabel}
                onAction={closeMenu}
                startTrainingLabel={dictionary.nav.startTraining}
              />
            </div>
          </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
