"use client";

import {
  DiscordIcon,
  EmailIcon,
  TikTokIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons";
import { NavPopover, ResourceLink } from "@/components/press-popover";
import { siteConfig } from "@/config/site";

import styles from "./press-popover.module.css";

const SOCIAL_LINKS = [
  {
    href: siteConfig.links.youtube,
    icon: <YoutubeIcon />,
    label: "YouTube",
  },
  {
    href: siteConfig.links.tiktok,
    icon: <TikTokIcon />,
    label: "TikTok",
  },
  {
    href: siteConfig.links.twitter,
    icon: <TwitterIcon />,
    label: "X (Twitter)",
  },
  {
    href: siteConfig.links.discord,
    icon: <DiscordIcon />,
    label: "Discord*",
  },
  {
    href: siteConfig.links.email,
    icon: <EmailIcon />,
    label: "Mail",
  },
] as const;

export function SocialsPopover() {
  return (
    <NavPopover
      id="social-links"
      label="Socials"
      panelClassName={styles.socialPanel}
      panelLabel="Brainglyph social links"
    >
      {SOCIAL_LINKS.map(({ href, icon, label }) => (
        <ResourceLink
          key={label}
          metaIsIcon
          href={href}
          label={label}
          meta={<span className={styles.socialIcon}>{icon}</span>}
          rel="noreferrer"
          target={href.startsWith("mailto:") ? undefined : "_blank"}
        />
      ))}
      <p className={styles.socialFootnote}>
        *Yes, we do own ourdiscordserver.com ;)
      </p>
    </NavPopover>
  );
}
