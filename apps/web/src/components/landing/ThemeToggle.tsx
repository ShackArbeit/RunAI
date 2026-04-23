"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

type ThemeToggleProps = {
  label: string;
};

function getInitialTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle({ label }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
  }

  return (
    <button
      aria-label={label}
      className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-soft)] px-3 py-2 text-md text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
      onClick={toggleTheme}
      type="button"
    >
      <span>{theme === "dark" ? "◐" : "◑"}</span>
      <span>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
