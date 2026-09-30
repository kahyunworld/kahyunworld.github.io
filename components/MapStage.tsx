"use client";

import type { CSSProperties, ReactNode } from "react";
import HotspotLayer from "./HotspotLayer";
import MapArtLayer from "./MapArtLayer";
import { useRoute } from "./use-route";
import { ui } from "@/content/ui";
import { getLocation, locations, worldArt } from "@/content/world";

/**
 * The map, and the panel beside it.
 *
 * This is rendered by the [locale] layout, not by a page, so navigating between
 * the world view and a city does not remount it — which is the only reason the
 * zoom can animate across a route change. It reads the active city from the
 * pathname; `children` is whatever the page put in the panel slot.
 */
export default function MapStage({ children }: { children: ReactNode }) {
  const { locale, locationId } = useRoute();
  const active = locationId ? getLocation(locationId) : undefined;
  const zoomed = Boolean(active);
  const t = ui[locale];

  const camera = {
    "--s": active ? active.zoom : 1,
    "--px": active ? active.x / 100 : 0.5,
    "--py": active ? active.y / 100 : 0.5,
  } as CSSProperties;

  const frame = {
    "--ar": worldArt.width / worldArt.height,
  } as CSSProperties;

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <div className="map-frame" style={frame}>
        <div className="stage" data-zoomed={zoomed}>
          <div className="camera" style={camera}>
            <MapArtLayer art={worldArt} alt={t.mapLabel} priority />
            <HotspotLayer
              locale={locale}
              activeId={active?.id}
              zoomed={zoomed}
            />
          </div>

          {/*
            Detail maps sit above the camera rather than inside it, so they are
            drawn at their own native size instead of being magnified along with
            the world map. That is what keeps a zoomed city sharp, and it is why
            the world map itself never has to be a huge file.

            All of them are in the DOM so the crossfade has something to fade to.
            With one published city that is one extra request; if this ever grows
            past a handful, render only the active one and accept a first-open
            delay.
          */}
          {locations
            .filter((location) => location.art)
            .map((location) => (
              <div
                key={location.id}
                className="detail-art"
                data-active={active?.id === location.id}
              >
                <MapArtLayer
                  art={location.art!}
                  alt={location.text[locale].name}
                />
              </div>
            ))}
        </div>
      </div>

      {children}
    </div>
  );
}
