import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Image from "next/image";
import NextLink from "next/link";

import { PressPopover } from "@/components/press-popover";
import { SocialsPopover } from "@/components/socials-popover";

export const Navbar = () => {
  return (
    <NextUINavbar
      className="site-navbar bg1d1d1b"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image alt="" height="0" src="/logoNeon.svg" width="32" />
            <p className="text-inherit auxMono daff01 ml-1 mt-1">brainglyph</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <span className="auxMono daff01 mr-5 mt-1">
            <PressPopover />
          </span>
          <span className="auxMono daff01 mr-0 mt-1">
            <SocialsPopover />
          </span>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4 gap-4" justify="end">
        <span className="auxMono daff01 text-sm">
          <PressPopover />
        </span>
        <span className="auxMono daff01 text-sm">
          <SocialsPopover />
        </span>
      </NavbarContent>
    </NextUINavbar>
  );
};
