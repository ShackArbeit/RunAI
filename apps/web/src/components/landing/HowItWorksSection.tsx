import type { LandingDictionary } from "@/components/landing/dictionary";
import { SectionHeading, SectionShell } from "@/components/landing/shared";

function StepCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <article className="flex min-w-[220px] flex-1 flex-col rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-panel)] font-caption text-md tracking-[0.22em] text-[var(--accent)]">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-3 text-md leading-7 text-[var(--text-secondary)]">{description}</p>
    </article>
  );
}

type HowItWorksSectionProps = {
  dictionary: LandingDictionary;
};

export function HowItWorksSection({ dictionary }: HowItWorksSectionProps) {

  return (
    <SectionShell id="how-it-works" className="py-20 sm:py-24 lg:py-28">
      <div className="space-y-10">
        <SectionHeading
          description={dictionary.howItWorks.description}
          eyebrow={dictionary.howItWorks.eyebrow}
          title={dictionary.howItWorks.title}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {dictionary.howItWorks.steps.map((step, index) => (
            <StepCard
              key={step.title}
              description={step.description}
              index={index}
              title={step.title}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
