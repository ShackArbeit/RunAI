import { CTASection } from "@/components/landing/CTASection";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { RouteSection } from "@/components/landing/RouteSection";
import { getDictionary, isLocale, locales } from "@/components/landing/dictionary";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const pageParams = await params;
  const locale = pageParams.locale;
  console.log('pageParams:',pageParams)

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <>
      <div id="top" />
      <Header dictionary={dictionary} locale={locale} />
      <main>
        <HeroSection dictionary={dictionary} />
        <FeatureSection dictionary={dictionary} />
        <HowItWorksSection dictionary={dictionary} />
        <RouteSection dictionary={dictionary} />
        <CTASection dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} locale={locale} />
    </>
  );
}
