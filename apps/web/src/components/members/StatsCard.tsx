"use client";

import { useState } from "react";

import type { Stat } from "@/lib/mock-data";

import { membersCopy } from "@/components/members/content";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type StatsCardProps = {
  stats: Stat[];
};

export function StatsCard({ stats }: StatsCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <section className="hidden gap-3 md:grid md:grid-cols-3 md:gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className="flex min-h-[124px] flex-col gap-2 rounded-[22px] bg-[rgba(13,27,47,0.98)] p-4"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {stat.label}
            </p>
            <p className="text-3xl font-semibold text-[var(--text-primary)]">
              {stat.value}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">{stat.trend}</p>
          </Card>
        ))}
      </section>
      <section className="flex flex-col gap-3 md:hidden">
        <button
          className="w-full text-left"
          onClick={() => setExpanded((current) => !current)}
          type="button"
        >
          <Card className="flex flex-col gap-3 rounded-[22px] bg-[rgba(13,27,47,0.98)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {membersCopy.stats.title}
                </p>
                <p className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
                  {stats[0]?.value}
                </p>
              </div>
              <Badge tone="muted">{expanded ? "Open" : "Compact"}</Badge>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{stats[0]?.trend}</p>
          </Card>
        </button>
        {expanded ? (
          <div className="grid gap-3">
            {stats.slice(1).map((stat) => (
              <Card
                key={stat.id}
                className="flex min-h-[108px] flex-col gap-2 rounded-[22px] bg-[rgba(13,27,47,0.98)] p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {stat.label}
                </p>
                <p className="text-3xl font-semibold text-[var(--text-primary)]">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">{stat.trend}</p>
              </Card>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}
