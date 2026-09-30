import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> `out/`. There is no `next export` step; `next build`
  // produces the directory directly.
  output: "export",

  // GitHub Pages has no rewrite control, so it cannot resolve /about to
  // about.html. With this flag every route exports as <route>/index.html and
  // resolves by ordinary directory indexing.
  trailingSlash: true,

  // The default image loader needs a server and throws a build error under
  // `output: 'export'`. Consequence: Next will not resize or convert anything,
  // so map artwork must be pre-sized and pre-compressed by hand.
  images: { unoptimized: true },

  // Empty for a <username>.github.io repo and for a custom domain, both of
  // which serve at the domain root. Set NEXT_PUBLIC_BASE_PATH=/kahyunworld if
  // the site ever moves to a project subpath. Baked in at build time.
  // Do not add `assetPrefix` — Next derives it from basePath.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

export default nextConfig;
