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
      <meta property="og:title" content="Heli.os" />
      <meta property="og:description"
            content="An action roguelike where knowledge is power." />
      <meta property="og:image" content="https://i.ibb.co/BsZcfM6/Capsule-Art.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="localhost-og-checker.vercel.app" />
      <meta property="twitter:url" content="https://localhost-og-checker.vercel.app/66df2d6897123e7b91ed8f5d" />
      <meta name="twitter:title" content="Heli.os" />
      <meta name="twitter:description"
            content="An action roguelike where knowledge is power." />
      <meta name="twitter:image" content="https://i.ibb.co/BsZcfM6/Capsule-Art.png" />
    </head>
    <body
      className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className="relative flex flex-col h-screen">
        <main className={clsx("flex-grow bg1d1d1b")}>
          {children}
        </main>
      </div>
    </Providers>
    </body>
    </html>
  );
}
