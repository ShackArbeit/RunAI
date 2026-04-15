"use client";

import { useLanding } from "@/components/landing/LandingProvider";
import { SectionShell } from "@/components/landing/shared";

export function Footer() {
  const { dictionary } = useLanding();

  return (
    <footer className="pb-8">
      <SectionShell>
        <div className="flex flex-col gap-4 border-t border-[var(--border-subtle)] py-8 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-4xl text-[var(--text-primary)]">{dictionary.brand}</p>
            <p className="mt-2 text-md">{dictionary.footer.copyright}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-4 sm:justify-end">
            {dictionary.footer.links.map((link) => (
              <a
                key={link}
                className="text-lg transition-colors hover:text-[var(--text-primary)]"
                href="#top"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </SectionShell>
    </footer>
  );
}
