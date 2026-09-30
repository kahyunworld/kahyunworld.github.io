import type { Locale } from "@/content/world";

/**
 * Next prefixes `next/link` hrefs and `_next/static` with `basePath`
 * automatically, but NOT raw `public/` asset URLs or `<Image src>`. Anything
 * hand-written has to go through `asset()`.
 *
 * Empty unless the site moves to a project subpath. Inlined at build time.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}

/** Route hrefs, for `next/link` — no basePath, Next adds it. */
export function worldHref(locale: Locale): string {
  return `/${locale}/`;
}

export function locationHref(locale: Locale, locationId: string): string {
  return `/${locale}/${locationId}/`;
}
