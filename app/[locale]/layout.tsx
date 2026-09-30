import type { ReactNode } from "react";
import MapStage from "@/components/MapStage";
import SiteHeader from "@/components/SiteHeader";
import { toLocale } from "@/content/world";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = toLocale((await params).locale);

  return (
    // The root layout cannot see route params, so <html lang> is the default
    // locale and this wrapper corrects it for the other language's subtree.
    // Nested lang is valid HTML and assistive tech honours the nearest one.
    <div lang={locale} className="flex min-h-0 flex-1 flex-col">
      <SiteHeader locale={locale} />
      <MapStage>{children}</MapStage>
    </div>
  );
}
