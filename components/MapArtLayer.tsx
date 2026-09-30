import Image from "next/image";
import type { MapArt } from "@/content/world";
import { asset } from "@/lib/paths";

/**
 * One map image, filling its positioned parent.
 *
 * Format-agnostic: SVG, WebP, PNG and JPG all render identically here. The
 * stage is always given the art's own aspect ratio, so `object-fit: fill`
 * neither stretches nor crops it — and that exact correspondence is what lets
 * hotspots be positioned in plain percentages.
 *
 * `images.unoptimized` is on (required by `output: 'export'`), so Next serves
 * the file as-is. Compress artwork before committing it.
 */
export default function MapArtLayer({
  art,
  alt,
  priority = false,
}: {
  art: MapArt;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset(art.src)}
      alt={alt}
      fill
      sizes="100vw"
      priority={priority}
      draggable={false}
      style={{ objectFit: "fill" }}
    />
  );
}
