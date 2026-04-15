export type TodayTraining = {
  title: string;
  focus: string;
  paceWindow: string;
  duration: string;
  zone: string;
  recommendation: string;
  actionLabel: string;
};

export type Route = {
  id: string;
  name: string;
  summary: string;
  distance: string;
  elevation: string;
  terrain: string;
  tone: "green" | "blue" | "slate";
};

export type Prediction = {
  raceLabel: string;
  estimate: string;
  confidenceLabel: string;
  confidenceValue: number;
  note: string;
  readiness: Array<{
    id: string;
    label: string;
    value: string;
  }>;
};

export type Stat = {
  id: string;
  label: string;
  value: string;
  trend: string;
};

export type FeedbackMetric = {
  id: string;
  label: string;
  value: number;
};

export type Feedback = {
  title: string;
  summary: string;
  highlight: string;
  metrics: FeedbackMetric[];
  tags: string[];
};

export const todayTraining: TodayTraining = {
  title: "Tempo 12K",
  focus: "Today-first training block",
  paceWindow: "5:10-5:25 / km",
  duration: "85 min",
  zone: "Zone 3",
  recommendation:
    "Threshold work is favored today because your recent volume is stable, recovery markers are neutral, and route options support sustained rhythm.",
  actionLabel: "Review session",
};

export const routes: Route[] = [
  {
    id: "river-loop",
    name: "Riverside tempo loop",
    summary: "Best fit for a controlled threshold block with long uninterrupted sections.",
    distance: "8.2 km",
    elevation: "+43 m",
    terrain: "Flat riverside",
    tone: "green",
  },
  {
    id: "city-cut",
    name: "City morning cut-through",
    summary: "Balanced option for shorter execution with easier turnaround points.",
    distance: "6.0 km",
    elevation: "+28 m",
    terrain: "Urban lanes",
    tone: "blue",
  },
  {
    id: "hill-bridge",
    name: "Bridge rise fallback",
    summary: "Useful when weather shifts and you need a compact route with small hill stimulus.",
    distance: "5.8 km",
    elevation: "+71 m",
    terrain: "Rolling bridge",
    tone: "slate",
  },
];

export const prediction: Prediction = {
  raceLabel: "10K projection",
  estimate: "46:51",
  confidenceLabel: "Goal attainment",
  confidenceValue: 95.9,
  note:
    "Projected from current aerobic consistency, threshold repeat quality, and route compliance over the last 14 days.",
  readiness: [
    { id: "load", label: "Load", value: "5K 22:18" },
    { id: "shape", label: "Shape", value: "10K 46:51" },
    { id: "recovery", label: "Recovery", value: "Half 1:42:38" },
  ],
};

export const stats: Stat[] = [
  {
    id: "distance",
    label: "This week",
    value: "42.8 km",
    trend: "+6.4% vs last week",
  },
  {
    id: "consistency",
    label: "Training consistency",
    value: "86%",
    trend: "4 of 5 planned sessions completed",
  },
  {
    id: "fatigue",
    label: "Fatigue level",
    value: "Moderate",
    trend: "Down from yesterday",
  },
];

export const feedback: Feedback = {
  title: "Today feedback",
  summary:
    "Mock recovery and completion signals suggest strong execution, with moderate residual fatigue after the last quality block.",
  highlight: "Route recommendation remains aligned with the training intent.",
  metrics: [
    { id: "completion", label: "Completion", value: 82 },
    { id: "fatigue", label: "Fatigue", value: 64 },
    { id: "route-fit", label: "Route fit", value: 88 },
  ],
  tags: ["Stable form", "Good pacing", "Hydration ready"],
};
