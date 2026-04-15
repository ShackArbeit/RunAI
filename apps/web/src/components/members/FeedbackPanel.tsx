"use client";

import { useEffect, useState } from "react";

import type { Feedback } from "@/lib/mock-data";

import { membersCopy } from "@/components/members/content";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type FeedbackPanelProps = {
  initialFeedback: Feedback;
};

export function FeedbackPanel({ initialFeedback }: FeedbackPanelProps) {
  const [activeMetricId, setActiveMetricId] = useState(
    initialFeedback.metrics[0]?.id ?? "",
  );
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (activeMetricId) {
      window.sessionStorage.setItem("runai:feedback-metric", activeMetricId);
    }
  }, [activeMetricId]);

  return (
    <Card className="flex flex-col gap-4 bg-[rgba(13,27,47,0.98)] sm:gap-5 md:min-h-[288px]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h2 className="text-[24px] font-semibold text-[var(--text-primary)]">
            {membersCopy.feedback.title}
          </h2>
          <p className="max-w-2xl text-sm text-[var(--text-secondary)]">
            {initialFeedback.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{membersCopy.feedback.preparingLabel}</Badge>
          <Badge tone="muted">{membersCopy.feedback.syncLabel}</Badge>
          <button onClick={() => setExpanded((current) => !current)} type="button">
            <Badge tone="accent">
              {expanded
                ? membersCopy.feedback.collapseLabel
                : membersCopy.feedback.expandLabel}
            </Badge>
          </button>
        </div>
      </div>
      <div className="space-y-3.5">
        {initialFeedback.metrics.map((metric, index) => (
          <button
            key={metric.id}
            className="block w-full space-y-2 text-left"
            onClick={() => setActiveMetricId(metric.id)}
            type="button"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--text-secondary)]">{metric.label}</span>
              <span className="font-semibold text-[var(--text-primary)]">
                {metric.value}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${metric.value}%`,
                  backgroundColor:
                    index === 1 ? "#2a6af5" : index === 2 ? "#4ae59f" : "var(--accent)",
                  opacity: activeMetricId === metric.id ? 1 : 0.82,
                }}
              />
            </div>
          </button>
        ))}
      </div>
      <div className={expanded ? "space-y-3" : "hidden md:block md:space-y-3"}>
        <p className="text-sm font-medium text-[var(--text-primary)]">
          {initialFeedback.highlight}
        </p>
        <div className="flex flex-wrap gap-2">
          {initialFeedback.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
