import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import {
  faDiscord,
  faTiktok,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconSvgProps } from "@/types";

function createIcon(icon: IconDefinition) {
  return function Icon({
    "aria-hidden": ariaHidden,
    "aria-label": ariaLabel,
    className,
    color,
    size,
    width,
    height,
    id,
    role,
    style,
  }: IconSvgProps) {
    return (
      <FontAwesomeIcon
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        className={className}
        color={color}
        icon={icon}
        id={id}
        role={role}
        style={{
          width: width ?? size ?? undefined,
          height: height ?? size ?? undefined,
          ...style,
        }}
      />
    );
  };
}

export const DiscordIcon = createIcon(faDiscord);
export const EmailIcon = createIcon(faEnvelope);
export const TikTokIcon = createIcon(faTiktok);
export const TwitterIcon = createIcon(faXTwitter);
export const YoutubeIcon = createIcon(faYoutube);
