import type { LandingDictionary, Locale } from "@/components/landing/dictionary";
import { SectionShell } from "@/components/landing/shared";
import Link from "next/link";

type FooterProps = {
  dictionary: LandingDictionary;
  locale: Locale;
};

export function Footer({ dictionary, locale }: FooterProps) {

  return (
    <footer className="pb-8">
      <SectionShell>
        <div className="flex flex-col gap-4 border-t border-[var(--border-subtle)] py-8 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-4xl text-[var(--text-primary)]">{dictionary.brand}</p>
            <p className="mt-2 text-md">{dictionary.footer.copyright}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-4 sm:justify-end">
            <a
              className="text-lg transition-colors hover:text-[var(--text-primary)]"
              href="#features"
            >
              {dictionary.footer.links[0]}
            </a>
            <a
              className="text-lg transition-colors hover:text-[var(--text-primary)]"
              href="#pricing"
            >
              {dictionary.footer.links[1]}
            </a>
            <Link
              className="text-lg transition-colors hover:text-[var(--text-primary)]"
              href={`/${locale}`}
            >
              {dictionary.footer.links[2]}
            </Link>
          </nav>
        </div>
      </SectionShell>
    </footer>
  );
}
