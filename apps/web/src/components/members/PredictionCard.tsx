import type { Prediction } from "@/lib/mock-data";

import { membersCopy } from "@/components/members/content";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type PredictionCardProps = {
  prediction: Prediction;
};

export function PredictionCard({ prediction }: PredictionCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 bg-[rgba(13,27,47,0.98)] sm:gap-5 md:min-h-[248px]">
      <div className="space-y-3">
        <Badge>{prediction.raceLabel}</Badge>
        <div className="space-y-1">
          <h2 className="text-[24px] font-semibold text-[var(--text-primary)]">
            {membersCopy.prediction.title}
          </h2>
          <p className="text-[28px] leading-none font-semibold text-[var(--text-primary)] md:text-[32px]">
            {prediction.estimate}
          </p>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {prediction.readiness.map((item, index) => (
          <div
            key={item.id}
            className="rounded-[18px] bg-[rgba(255,255,255,0.03)] px-3 py-4"
          >
            <div className="mb-3 flex gap-1.5">
              <span className="h-4 w-8 rounded-full bg-[rgba(42,106,245,0.26)]" />
              <span
                className="h-4 w-8 rounded-full"
                style={{
                  backgroundColor:
                    index === 2 ? "var(--accent)" : "rgba(255,255,255,0.08)",
                }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {item.label}
            </p>
            <p className="mt-2 text-base font-semibold text-[var(--text-primary)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">
            {membersCopy.prediction.confidencePrefix}
          </span>
          <span className="font-semibold text-[var(--text-primary)]">
            {prediction.confidenceLabel} {prediction.confidenceValue.toFixed(1)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
          <div
            className="h-full rounded-full bg-[var(--accent)]"
            style={{ width: `${prediction.confidenceValue}%` }}
          />
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{prediction.note}</p>
      </div>
    </Card>
  );
}
