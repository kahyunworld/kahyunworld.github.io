import WorldIntro from "@/components/WorldIntro";
import { ui } from "@/content/ui";
import { locales, toLocale } from "@/content/world";

// Never export `dynamicParams` here: `true` is a hard build error under
// `output: 'export'`, and `false` is already the implicit behaviour.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = ui[toLocale((await params).locale)];
  return { title: t.siteTitle, description: t.siteDescription };
}

/**
 * The world view. The map itself is in the layout — this page only fills the
 * panel slot beside it.
 */
export default async function WorldPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <WorldIntro locale={toLocale((await params).locale)} />;
}
