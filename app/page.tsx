import clsx from "clsx";

import { title } from "@/components/primitives";
import { HeliosHero } from "@/components/helios-hero";
import { ReachOutSection } from "@/components/reach-out-section";
import { StudioManifesto } from "@/components/studio-manifesto";
import { SupportersSection } from "@/components/supporters-section";
import { AdvisorsSection, TeamRoster } from "@/components/team-roster";
import { siteConfig } from "@/config/site";

import styles from "./home.module.css";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/site-icon.png`,
      },
      sameAs: [
        siteConfig.links.youtube,
        siteConfig.links.tiktok,
        siteConfig.links.twitter,
        siteConfig.links.discord,
      ],
    },
    {
      "@type": "VideoGame",
      "@id": `${siteConfig.url}/#helios`,
      name: "Heli.os",
      description:
        "A knowledge-based action roguelite where discovery is your strongest weapon.",
      genre: ["Action", "Roguelite"],
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      url: siteConfig.url,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <section className="flex flex-col items-center justify-center gap-0 pb-0">
        <HeliosHero />
        <StudioManifesto />
        <section data-navbar-background-trigger className={styles.teamSection}>
          <div aria-hidden="true" className={styles.teamZigzag}>
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 1200 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M986.5 15L1200 52.9068L1200 93.4766L0 93.4765L3.54672e-06 52.9067L324 0.5L748.5 52.9068L986.5 15Z" />
            </svg>
          </div>
          <div className={styles.teamIntro}>
            <h2
              className={clsx(title(), "auxMono notBold", styles.teamHeading)}
            >
              The brainglyph team
            </h2>
            <p className={clsx("text-lg poppins-regular", styles.teamCopy)}>
              We have worked together for almost two years, since we found out
              our shared passion for independent game development. We met at the
              IT University of Copenhagen Master of Sciences in Games
              Technology, which we completed in June 2024. Our drive and passion
              brought us closer both professionally and as friends.
            </p>
          </div>
          <TeamRoster />
        </section>
        <AdvisorsSection />
        <SupportersSection />
        <ReachOutSection />
        <div className={styles.footer}>
          <p className={clsx("auxMono text-xs", styles.footerHeading)}>
            This website is made and maintained with ♥ by us, brainglyph!
          </p>
        </div>
      </section>
    </>
  );
}
