import "@/styles/fonts.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

//dummy change

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.png',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon_dark.png',
      media: '(prefers-color-scheme: light)',
    },
  ],
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
    <html suppressHydrationWarning lang="en">
    <head>
      <meta property="og:title" content="We're making games you can't stop thinking about" />
      <meta property="og:description"
            content="brainglyph is an independent game development duo working on heli.os." />
      <meta property="og:image" content="https://i.postimg.cc/SsXg7xwy/animated-card.gif" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="localhost-og-checker.vercel.app" />
      <meta property="twitter:url" content="https://localhost-og-checker.vercel.app/66df2d6897123e7b91ed8f5d" />
      <meta name="twitter:title" content="We're making games you can't stop thinking about" />
      <meta name="twitter:description"
            content="brainglyph is an independent game development duo working on heli.os." />
      <meta name="twitter:image" content="https://i.postimg.cc/SsXg7xwy/animated-card.gif" />
    </head>
    <body
      className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className={clsx("pt-16 flex-grow bg1d1d1b")}>
          {children}
        </main>
      </div>
    </Providers>
    </body>
    </html>
  );
}
