import clsx from "clsx";

import { DiscordIcon, EmailIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SignalButton } from "@/components/signal-button";
import { siteConfig } from "@/config/site";

import styles from "./reach-out-section.module.css";

export function ReachOutSection() {
  return (
    <section aria-labelledby="reach-out-title" className={styles.section}>
      <div aria-hidden="true" className={styles.edge}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M333.105 104.653L0 40.5698V0H1200V40.5698L924.558 80.477L604.292 40.5698L333.105 104.653Z" />
        </svg>
      </div>

      <ScrollReveal className={styles.content}>
        <h2
          className={clsx(
            title({ fullWidth: true }),
            "auxMono notBold",
            styles.heading,
          )}
          id="reach-out-title"
        >
          Feel free to reach out!
        </h2>
        <p className={styles.copy}>
          We&apos;ll get back to you as soon as possible!
        </p>
        <div className={styles.actions}>
          <SignalButton
            href={siteConfig.links.discord}
            icon={<DiscordIcon />}
            target="_blank"
            variant="signal"
          >
            Discord
          </SignalButton>
          <SignalButton
            href={siteConfig.links.email}
            icon={<EmailIcon />}
            target="_blank"
            variant="signal"
          >
            Mail
          </SignalButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
