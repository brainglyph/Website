import "@/styles/fonts.css";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "lenis/dist/lenis.css";
import { Analytics } from "@vercel/analytics/next";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import { fontJura, fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { SiteIntro } from "@/components/site-intro";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";

import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://brainglyph.com"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    apple: [{ url: "/site-icon.png", sizes: "512x512", type: "image/png" }],
    icon: [
      { url: "/site-icon.png", sizes: "512x512", type: "image/png" },
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: light)",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    description: siteConfig.description,
    title: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontJura.variable,
        )}
      >
        <Providers>
          <SmoothScroll />
          <SiteIntro />
          <PageTransition />
          <CustomCursor />
          <div className="site-shell relative flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
              <Analytics />
            </main>
          </div>
          <div aria-hidden="true" className="viewport-frame" />
        </Providers>
      </body>
    </html>
  );
}
