import type { TodayTraining } from "@/lib/mock-data";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { membersCopy } from "@/components/members/content";

type TodayTrainingCardProps = {
  training: TodayTraining;
};

export function TodayTrainingCard({ training }: TodayTrainingCardProps) {
  return (
    <Card className="flex flex-col gap-4 bg-[rgba(19,43,70,0.88)] sm:gap-5 md:min-h-[232px]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Badge tone="muted">{membersCopy.todayTraining.eyebrow}</Badge>
          <div className="space-y-2">
            <h2 className="text-[26px] leading-none font-semibold text-[var(--text-primary)] md:text-[34px]">
              {membersCopy.todayTraining.title}
            </h2>
            <p className="text-base font-semibold text-[var(--text-primary)] md:text-lg">
              {training.title}
            </p>
            <p className="max-w-[52rem] text-sm leading-6 text-[var(--text-secondary)]">
              {training.recommendation}
            </p>
          </div>
        </div>
        <Button className="min-w-36 self-start">{training.actionLabel}</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[20px] bg-[rgba(255,255,255,0.03)] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {training.focus}
          </p>
          <p className="mt-3 text-base font-semibold text-[var(--text-primary)]">
            {training.title}
          </p>
        </div>
        <div className="rounded-[20px] bg-[rgba(255,255,255,0.03)] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {membersCopy.todayTraining.chips.pace}
          </p>
          <p className="mt-3 text-base font-semibold text-[var(--text-primary)]">
            {training.paceWindow}
          </p>
        </div>
        <div className="rounded-[20px] bg-[rgba(255,255,255,0.03)] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {membersCopy.todayTraining.chips.duration}
          </p>
          <p className="mt-3 text-base font-semibold text-[var(--text-primary)]">
            {training.duration}
          </p>
        </div>
        <div className="rounded-[20px] bg-[rgba(255,255,255,0.03)] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {membersCopy.todayTraining.chips.zone}
          </p>
          <p className="mt-3 text-base font-semibold text-[var(--text-primary)]">
            {training.zone}
          </p>
        </div>
      </div>
    </Card>
  );
}
