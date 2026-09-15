"use client";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PressPopover } from "@/components/press-popover";
import { SocialsPopover } from "@/components/socials-popover";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const pathname = usePathname();
  const [hasBackground, setHasBackground] = useState(false);

  useEffect(() => {
    let frame = 0;
    const syncBackground = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const trigger = document.querySelector<HTMLElement>(
          "[data-navbar-background-trigger]",
        );
        const navbar = document.querySelector<HTMLElement>(".site-navbar");

        setHasBackground(
          Boolean(
            trigger &&
            trigger.getBoundingClientRect().top <=
              (navbar?.getBoundingClientRect().bottom ?? 66),
          ),
        );
      });
    };

    syncBackground();
    window.addEventListener("scroll", syncBackground, { passive: true });
    window.addEventListener("resize", syncBackground);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncBackground);
      window.removeEventListener("resize", syncBackground);
    };
  }, [pathname]);

  if (pathname === "/sequence") return null;

  return (
    <NextUINavbar
      className="site-navbar"
      data-scrolled={hasBackground || undefined}
      isBlurred={false}
      maxWidth="2xl"
      position="static"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="" height="0" src="/logoNeon.svg" width="32" />
            <p className={`auxMono ml-1 mt-1 ${styles.brandText}`}>
              brainglyph
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <span className="auxMono text-[#daff01] mr-5 mt-1">
            <PressPopover />
          </span>
          <span className="auxMono text-[#daff01] mr-0 mt-1">
            <SocialsPopover />
          </span>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4 gap-4" justify="end">
        <span className="auxMono text-[#daff01] text-sm">
          <PressPopover />
        </span>
        <span className="auxMono text-[#daff01] text-sm">
          <SocialsPopover />
        </span>
      </NavbarContent>
    </NextUINavbar>
  );
};
