import Link from "next/link";
import { ui } from "@/content/ui";
import { locations, type Locale } from "@/content/world";
import { locationHref } from "@/lib/paths";

/**
 * The clickable places on the world map.
 *
 * Positioned in plain percentages of the stage, which is exactly the art's own
 * box — so a hotspot stays put no matter what resolution or format the artwork
 * is. Deliberately HTML rather than an SVG overlay: an SVG stretched with
 * `preserveAspectRatio="none"` would squash the labels and rings along with it,
 * and real anchors get focus and keyboard activation for free.
 *
 * Lives inside `.camera`, so hotspots travel with the map as it zooms; the
 * labels counter-scale by `1 / --s` in CSS to keep a constant size on screen.
 */
export default function HotspotLayer({
  locale,
  activeId,
  zoomed,
}: {
  locale: Locale;
  activeId?: string;
  zoomed: boolean;
}) {
  return (
    // Faded out and inert once a city's detail map has covered the stage.
    <div className="hotspot-layer" data-zoomed={zoomed}>
      {locations.map((location) => {
        const text = location.text[locale];
        return (
          <Link
            key={location.id}
            href={locationHref(locale, location.id)}
            className="hotspot"
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            aria-current={activeId === location.id ? "page" : undefined}
            tabIndex={zoomed ? -1 : undefined}
          >
            <span className="hotspot-dot" aria-hidden="true" />
            <span className="hotspot-label">
              {text.name}
              {!location.published && (
                <span className="hotspot-flag">{ui[locale].comingSoon}</span>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
