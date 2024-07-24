import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo
} from "@/components/icons";
import Image from "next/image";

export const Navbar = () => {

  return (
    <NextUINavbar maxWidth="2xl" position="sticky" className="bg1d1d1b">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src="/logoNeon.svg" alt={""} width="32" height="0" />
            <p className="text-inherit auxMono daff01 ml-1 mt-1">brainglyph</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500 iconFill" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500 iconFill" />
          </Link>
          {/*<Link isExternal aria-label="Github" href={siteConfig.links.github}>*/}
          {/*  <GithubIcon className="text-default-500 iconFill" />*/}
          {/*</Link>*/}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
          <TwitterIcon className="text-default-500 iconFill" />
        </Link>
        <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
          <DiscordIcon className="text-default-500 iconFill" />
        </Link>
      </NavbarContent>


    </NextUINavbar>
  );
};
