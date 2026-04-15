"use client";

import { useEffect, useState } from "react";

import type { Route } from "@/lib/mock-data";

import { membersCopy } from "@/components/members/content";
import { RouteCard } from "@/components/members/RouteCard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type RouteListProps = {
  initialRoutes: Route[];
};

export function RouteList({ initialRoutes }: RouteListProps) {
  const [selectedRouteId, setSelectedRouteId] = useState(initialRoutes[0]?.id ?? "");

  useEffect(() => {
    if (selectedRouteId) {
      window.sessionStorage.setItem("runai:selected-route", selectedRouteId);
    }
  }, [selectedRouteId]);

  return (
    <Card className="flex flex-col gap-4 bg-[rgba(13,27,47,0.96)] sm:gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Badge tone="muted">{membersCopy.routeList.eyebrow}</Badge>
          <div className="space-y-2">
            <h2 className="text-[24px] font-semibold text-[var(--text-primary)] md:text-[28px]">
              {membersCopy.routeList.title}
            </h2>
            <p className="max-w-2xl text-sm text-[var(--text-secondary)]">
              {membersCopy.routeList.subtitle}
            </p>
          </div>
        </div>
        <span className="text-sm font-medium text-[var(--accent)] md:pb-1">
          {membersCopy.routeList.viewAllLabel}
        </span>
      </div>
      <div className="grid gap-3 md:gap-4 xl:grid-cols-3">
        {initialRoutes.map((route) => (
          <RouteCard
            key={route.id}
            isSelected={route.id === selectedRouteId}
            onSelect={setSelectedRouteId}
            route={route}
          />
        ))}
      </div>
    </Card>
  );
}
