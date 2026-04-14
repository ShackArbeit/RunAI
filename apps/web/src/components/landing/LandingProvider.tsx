"use client";

import {
  createContext,
  type PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";

import {
  dict,
  locales,
  type LandingDictionary,
  type Locale,
} from "@/components/landing/dictionary";

type ThemeMode = "dark" | "light";

type LandingContextValue = {
  dictionary: LandingDictionary;
  locale: Locale;
  locales: Locale[];
  setLocale: (locale: Locale) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
};

const LandingContext = createContext<LandingContextValue | null>(null);

export function LandingProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<Locale>("zh");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hant" : locale;
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  const value: LandingContextValue = {
    dictionary: dict[locale],
    locale,
    locales,
    setLocale,
    theme,
    toggleTheme,
  };

  return <LandingContext.Provider value={value}>{children}</LandingContext.Provider>;
}

export function useLanding() {
  const context = use(LandingContext);

  if (!context) {
    throw new Error("useLanding must be used within LandingProvider.");
  }

  return context;
}
