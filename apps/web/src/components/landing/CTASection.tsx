import type { LandingDictionary } from "@/components/landing/dictionary";
import { ActionButton, SectionShell } from "@/components/landing/shared";

type CTASectionProps = {
  dictionary: LandingDictionary;
};

export function CTASection({ dictionary }: CTASectionProps) {

  return (
    <SectionShell id="pricing" className="pb-20 sm:pb-24 lg:pb-28">
      <section
        aria-labelledby="cta-title"
        id="cta"
        className="surface-panel flex flex-col gap-8 rounded-[32px] px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10"
      >
        <div className="max-w-2xl">
          <p className="font-caption text-[12px] uppercase tracking-[0.28em] text-[var(--accent)] sm:text-[13px]">
            {dictionary.cta.eyebrow}
          </p>
          <h2
            className="font-heading mt-3 text-balance text-4xl leading-[0.95] text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
            id="cta-title"
          >
            {dictionary.cta.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            {dictionary.cta.description}
          </p>
        </div>

        <a href="#top">
          <ActionButton>{dictionary.cta.button}</ActionButton>
        </a>
      </section>
    </SectionShell>
  );
}
