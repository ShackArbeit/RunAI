import type { Metadata } from "next";
import { getHtmlLang, isLocale, type Locale } from "@/components/landing/dictionary";
import { cookies } from "next/headers";

import "./globals.css";

export const metadata: Metadata = {
  title: "RunAI",
  description:
    "AI running platform that adapts training plans, route recommendations, and race predictions to every runner.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const currentLocale = localeCookie ?? "";
  let locale: Locale = "zh";

  if (isLocale(currentLocale)) {
    locale = currentLocale;
  }

  return (
    <html
      lang={getHtmlLang(locale)}
      className="h-full dark"
      suppressHydrationWarning
    >
      <body className="h-full bg-[var(--surface)] font-body text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
