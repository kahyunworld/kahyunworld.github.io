import Link from "next/link";
import LocaleToggle from "./LocaleToggle";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/world";
import { worldHref } from "@/lib/paths";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <header className="border-parchment-dark flex items-baseline justify-between gap-4 border-b px-4 py-3 sm:px-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Link
          href={worldHref(locale)}
          className="font-display hover:text-lamp text-xl tracking-[0.18em] uppercase transition-colors sm:text-2xl"
        >
          {t.siteTitle}
        </Link>
        <p className="text-ink-soft text-sm">{t.siteTagline}</p>
      </div>
      <LocaleToggle />
    </header>
  );
}
