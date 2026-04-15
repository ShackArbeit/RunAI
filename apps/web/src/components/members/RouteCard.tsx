"use client";

import type { Route } from "@/lib/mock-data";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { membersCopy } from "@/components/members/content";
import { cn } from "@/lib/utils";

type RouteCardProps = {
  route: Route;
  isSelected: boolean;
  onSelect: (routeId: string) => void;
};

const toneClasses: Record<Route["tone"], string> = {
  green: "from-[#1f5f43] to-[#173f30]",
  blue: "from-[#234c78] to-[#1b3555]",
  slate: "from-[#23354d] to-[#172436]",
};

const pathClasses: Record<Route["tone"], string> = {
  green: "bg-[rgba(74,229,159,0.28)]",
  blue: "bg-[rgba(74,147,255,0.28)]",
  slate: "bg-[rgba(255,255,255,0.14)]",
};

export function RouteCard({ route, isSelected, onSelect }: RouteCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col gap-4 rounded-[22px] bg-[rgba(18,35,58,0.96)] p-4 sm:min-h-[248px]",
        isSelected && "ring-1 ring-[var(--accent)]",
      )}
    >
      <div
        className={cn(
          "relative h-20 overflow-hidden rounded-[16px] bg-gradient-to-br sm:h-24",
          toneClasses[route.tone],
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_78%_74%,rgba(255,255,255,0.08),transparent_22%)]" />
        <div className="absolute left-3 top-3 h-2 w-14 rounded-full bg-[rgba(255,255,255,0.14)]" />
        <div className="absolute right-3 top-3 h-2 w-8 rounded-full bg-[rgba(255,255,255,0.1)]" />
        <div
          className={cn(
            "absolute left-[18%] top-[26%] h-1.5 w-[48%] -rotate-[18deg] rounded-full",
            pathClasses[route.tone],
          )}
        />
        <div
          className={cn(
            "absolute left-[42%] top-[44%] h-1.5 w-[28%] rotate-[24deg] rounded-full",
            pathClasses[route.tone],
          )}
        />
        <div className="absolute left-[22%] top-[24%] h-3.5 w-3.5 rounded-full border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)]" />
        <div className="absolute left-[68%] top-[56%] h-3.5 w-3.5 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(167,255,60,0.12)]" />
      </div>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {route.name}
          </h3>
          {isSelected ? (
            <Badge tone="accent">{membersCopy.routeList.selectedLabel}</Badge>
          ) : null}
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{route.summary}</p>
      </div>
      <dl className="grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-[var(--text-muted)]">
            {membersCopy.routeList.metrics.distance}
          </dt>
          <dd className="mt-1 font-medium text-[var(--text-primary)]">
            {route.distance}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">
            {membersCopy.routeList.metrics.elevation}
          </dt>
          <dd className="mt-1 font-medium text-[var(--text-primary)]">
            {route.elevation}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">
            {membersCopy.routeList.metrics.terrain}
          </dt>
          <dd className="mt-1 font-medium text-[var(--text-primary)]">
            {route.terrain}
          </dd>
        </div>
      </dl>
      <Button
        className="mt-auto w-full"
        onClick={() => onSelect(route.id)}
        variant={isSelected ? "primary" : "secondary"}
      >
        {isSelected
          ? membersCopy.routeList.selectedLabel
          : membersCopy.routeList.selectLabel}
      </Button>
    </Card>
  );
}
