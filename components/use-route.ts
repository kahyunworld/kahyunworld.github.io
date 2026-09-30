"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/content/world";

/**
 * The active locale and location, read from the URL.
 *
 * The map lives in the layout so it never remounts (a remount would kill the
 * zoom animation), which means it cannot receive the location as a prop from the
 * page. It reads the pathname instead. `usePathname` has basePath already
 * stripped.
 */
export function useRoute(): { locale: Locale; locationId?: string } {
  const segments = usePathname().split("/").filter(Boolean);
  const [first, second] = segments;

  return {
    locale: first && isLocale(first) ? first : defaultLocale,
    locationId: second,
  };
}
