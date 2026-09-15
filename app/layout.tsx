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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    apple: [{ url: "/site-icon.png", sizes: "192x192", type: "image/png" }],
    icon: [
      { url: "/site-icon.png", sizes: "192x192", type: "image/png" },
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: light)",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: "Brainglyph",
        height: 630,
        url: "/og-summary.png",
        width: 1200,
      },
    ],
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    images: ["/og-summary.png"],
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
