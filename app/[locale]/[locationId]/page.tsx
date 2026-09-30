import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationPanel from "@/components/LocationPanel";
import { ui } from "@/content/ui";
import { getLocation, locales, locations, toLocale } from "@/content/world";

type Params = { locale: string; locationId: string };

/**
 * Generates both segments at once — a child route may produce params for the
 * segments above it, so this is the only place the two lists meet. Must never
 * return an empty array: that is a build error under `output: 'export'`.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    locations.map((location) => ({ locale, locationId: location.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale: rawLocale, locationId } = await params;
  const locale = toLocale(rawLocale);
  const location = getLocation(locationId);
  if (!location) return {};

  const text = location.text[locale];
  const title = text.bookTitle ? `${text.name} — ${text.bookTitle}` : text.name;
  const description = location.published
    ? (text.summary[0] ?? text.tagline)
    : `${text.tagline} (${ui[locale].comingSoon})`;

  // Shared links should preview well; that is the whole point of a buy page.
  return {
    title: text.name,
    description,
    openGraph: { title, description, type: "article", locale },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, locationId } = await params;
  const location = getLocation(locationId);
  // Unreachable in a static export — an unknown id has no file, so the host
  // serves 404.html. Kept so the type narrows and `next dev` behaves the same.
  if (!location) notFound();

  return <LocationPanel locale={toLocale(locale)} location={location} />;
}
