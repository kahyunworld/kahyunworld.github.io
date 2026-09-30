import Link from "next/link";
import { ui } from "@/content/ui";
import { locations, type Locale } from "@/content/world";
import { locationHref } from "@/lib/paths";

/**
 * What sits in the panel slot on the world view.
 *
 * It also lists every place as an ordinary link, which is the plain-HTML route
 * into the site: crawlers and screen readers get a list instead of having to
 * find dots on a picture.
 */
export default function WorldIntro({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <aside className="panel">
      <p className="text-ink-soft text-sm leading-relaxed">
        {t.siteDescription}
      </p>

      <ul className="mt-6 space-y-1">
        {locations.map((location) => {
          const text = location.text[locale];
          return (
            <li key={location.id}>
              <Link
                href={locationHref(locale, location.id)}
                className="hover:border-lamp/60 hover:bg-parchment-deep/60 -mx-2 block rounded border border-transparent px-2 py-2 transition-colors"
              >
                <span className="font-display flex items-baseline justify-between gap-2 tracking-wide">
                  {text.name}
                  {!location.published && (
                    <span className="text-ink-soft/70 font-body text-xs tracking-normal">
                      {t.comingSoon}
                    </span>
                  )}
                </span>
                <span className="text-ink-soft mt-0.5 block text-xs">
                  {text.region}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
