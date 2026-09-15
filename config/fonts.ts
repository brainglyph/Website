import { Inter as FontSans, Jura } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontJura = Jura({
  subsets: ["latin"],
  variable: "--font-jura",
});
