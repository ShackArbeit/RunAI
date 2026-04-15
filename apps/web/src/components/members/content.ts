export const membersCopy = {
  brand: "RunAI",
  nav: ["Dashboard", "Training", "Routes", "Profile"],
  header: {
    status: "Dark",
    locale: "EN",
    theme: "Today mode",
    title: "Members dashboard",
    subtitle: "A decision-driven view centered on today's training choices.",
    utilityLabel: "Live mock",
  },
  todayTraining: {
    eyebrow: "Today first",
    title: "Today's session",
    chips: {
      pace: "Target pace",
      duration: "Duration",
      zone: "Training zone",
    },
  },
  routeList: {
    eyebrow: "Route decisions",
    title: "Today's suggested routes",
    subtitle:
      "Choose the route that best matches the effort profile and time window for the session.",
    viewAllLabel: "See all routes",
    selectLabel: "Select route",
    selectedLabel: "Selected route",
    metrics: {
      distance: "Distance",
      elevation: "Elevation",
      terrain: "Terrain",
    },
  },
  prediction: {
    title: "Race prediction",
    confidencePrefix: "Confidence",
    readinessTitle: "Readiness markers",
  },
  stats: {
    title: "Snapshot",
  },
  feedback: {
    title: "Daily feedback",
    syncLabel: "Mock data refresh",
    preparingLabel: "Prepared for React Query integration",
    expandLabel: "Expand feedback",
    collapseLabel: "Collapse feedback",
  },
} as const;
