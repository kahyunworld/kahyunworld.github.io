"use client";

import Link from "next/link";
import { useRoute } from "./use-route";
import { ui } from "@/content/ui";
import { locales } from "@/content/world";

/**
 * Switches language while staying on the same place. Client-side only because it
 * needs the current path to mirror it.
 */
export default function LocaleToggle() {
  const { locale, locationId } = useRoute();
  const other = locales.find((candidate) => candidate !== locale) ?? locale;
  const href = locationId ? `/${other}/${locationId}/` : `/${other}/`;

  return (
    <Link
      href={href}
      hrefLang={other}
      className="border-parchment-dark text-ink-soft hover:border-lamp hover:text-lamp rounded-full border px-3 py-1 text-sm transition-colors"
    >
      {ui[locale].switchLanguage}
    </Link>
  );
}
