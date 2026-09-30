import Link from "next/link";
import { ui } from "@/content/ui";
import { defaultLocale } from "@/content/world";
import { basePath, worldHref } from "@/lib/paths";

/**
 * "/" -> "/ko/".
 *
 * A static export has no server, so there is nothing to emit a 3xx: neither
 * `redirect()` nor `next.config` redirects can work here. A meta refresh is the
 * only mechanism left. The visible link is the fallback for anyone who has meta
 * refresh disabled.
 */
export default function RootRedirect() {
  // Raw URL, so basePath has to be applied by hand.
  const target = `${basePath}${worldHref(defaultLocale)}`;
  const t = ui[defaultLocale];

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <link rel="canonical" href={target} />
      <main className="flex flex-1 items-center justify-center p-8 text-center">
        <p>
          <Link
            href={worldHref(defaultLocale)}
            className="font-display hover:text-lamp tracking-[0.18em] uppercase transition-colors"
          >
            {t.siteTitle}
          </Link>
        </p>
      </main>
    </>
  );
}
