import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "RunAI",
  description:
    "AI running platform that adapts training plans, route recommendations, and race predictions to every runner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <body className="h-full bg-[var(--surface)] font-body text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
