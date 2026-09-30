import Link from "next/link";
import { ui } from "@/content/ui";
import { defaultLocale } from "@/content/world";
import { worldHref } from "@/lib/paths";

/**
 * Exported as `out/404.html`, which GitHub Pages serves for anything it cannot
 * find. There is no locale in the URL to read at that point, so it is in the
 * default language with the other offered as a link.
 */
export default function NotFound() {
  const t = ui[defaultLocale];

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-display text-2xl tracking-[0.18em] uppercase">
        {t.notFoundTitle}
      </h1>
      <p className="text-ink-soft text-sm">{t.notFoundBody}</p>
      <Link
        href={worldHref(defaultLocale)}
        className="border-parchment-dark hover:border-lamp hover:text-lamp mt-2 rounded-full border px-4 py-1.5 text-sm transition-colors"
      >
        {t.notFoundAction}
      </Link>
    </main>
  );
}
