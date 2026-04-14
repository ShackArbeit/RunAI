import type { Metadata } from "next";
import { Anton, Geist, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

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
    <html
      lang="zh-Hant"
      className={`${geist.variable} ${anton.variable} ${ibmPlexMono.variable} h-full dark`}
      suppressHydrationWarning
    >
      <body className="h-full bg-[var(--surface)] font-body text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
