import type { LandingDictionary } from "@/components/landing/dictionary";
import { SectionHeading, SectionShell } from "@/components/landing/shared";

const featureIcons = ["📅✨ ", "🏃‍♂️📍", "🏆📊"] as const;

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <article className="group surface-card rounded-[26px] p-6 transition-transform duration-300 hover:-translate-y-2 sm:p-7 ">
      <div className=" border flex h-15 w-15 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-lg text-[var(--accent)] transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="mt-5 mb-2 text-2xl font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
        {description}
      </p>
    </article>
  );
}

type FeatureSectionProps = {
  dictionary: LandingDictionary;
};

export function FeatureSection({ dictionary }: FeatureSectionProps) {

  return (
    <SectionShell id="features" className="border-4 border-blue-900 py-20 sm:py-24 lg:py-28">
      <div className="space-y-10">
        <SectionHeading
          description={dictionary.features.description}
          eyebrow={dictionary.features.eyebrow}
          title={dictionary.features.title}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {dictionary.features.items.map((item, index) => (
            <FeatureCard
              key={item.title}
              description={item.description}
              icon={featureIcons[index] ?? "•"}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
