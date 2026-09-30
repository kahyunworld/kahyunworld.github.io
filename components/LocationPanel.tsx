import Link from "next/link";
import { ui } from "@/content/ui";
import type { Locale, Location } from "@/content/world";
import { worldHref } from "@/lib/paths";

export default function LocationPanel({
  locale,
  location,
}: {
  locale: Locale;
  location: Location;
}) {
  const t = ui[locale];
  const text = location.text[locale];
  // A buy link only makes sense once the story exists.
  const buyUrl = location.published ? location.buyUrl : undefined;

  return (
    <aside className="panel">
      <Link
        href={worldHref(locale)}
        className="text-ink-soft hover:text-lamp text-sm transition-colors"
      >
        &larr; {t.backToWorld}
      </Link>

      <p className="text-ink-soft mt-6 text-xs tracking-[0.2em] uppercase">
        {text.region}
      </p>
      <h1 className="font-display mt-1 text-3xl tracking-wide">{text.name}</h1>
      <p className="text-ink-soft mt-2 text-sm italic">{text.tagline}</p>

      {location.published ? (
        <>
          {text.bookTitle && (
            <h2 className="border-parchment-dark font-display mt-8 border-t pt-6 text-lg tracking-wide">
              {text.bookTitle}
            </h2>
          )}

          <div className="mt-4 space-y-4 text-sm leading-relaxed">
            {text.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {buyUrl && (
            <div className="mt-8">
              <a
                href={buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink text-parchment hover:bg-lamp inline-block rounded px-5 py-2.5 text-sm tracking-wide transition-colors"
              >
                {t.buy}
              </a>
              <p className="text-ink-soft mt-2 text-xs">{t.buyNote}</p>
            </div>
          )}
        </>
      ) : (
        <div className="border-parchment-dark mt-8 border-t pt-6">
          <p className="font-display text-sm tracking-[0.2em] uppercase">
            {t.comingSoon}
          </p>
          <p className="text-ink-soft mt-2 text-sm leading-relaxed">
            {t.comingSoonNote}
          </p>
        </div>
      )}
    </aside>
  );
}
