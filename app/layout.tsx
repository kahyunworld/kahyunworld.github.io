import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { ui } from "@/content/ui";
import { defaultLocale } from "@/content/world";

/** Display serif for headings. Latin only — see the Hangul note below. */
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Hangul is deliberately NOT a webfont. next/font/google exposes no `korean`
 * subset for Noto Serif KR, so loading it would ship the entire multi-megabyte
 * face. Instead `--font-serif-kr` is a stack of serif faces that actually cover
 * Hangul and are already installed on every platform. Browsers fall through per
 * character, so Latin still renders in Georgia and Hangul in a Myeongjo.
 */
const koreanSerifStack = [
  '"Noto Serif CJK KR"',
  '"Noto Serif KR"',
  "AppleMyungjo",
  '"Nanum Myeongjo"',
  '"Batang"',
  "serif",
].join(", ");

export const metadata: Metadata = {
  title: {
    default: ui[defaultLocale].siteTitle,
    template: `%s — ${ui[defaultLocale].siteTitle}`,
  },
  description: ui[defaultLocale].siteDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // lang is the default locale here; app/[locale]/layout.tsx overrides it on its
  // wrapper for the /en subtree. The root layout cannot see route params.
  return (
    <html
      lang={defaultLocale}
      className={`${cinzel.variable} h-full antialiased`}
      style={{ "--font-serif-kr": koreanSerifStack } as React.CSSProperties}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
