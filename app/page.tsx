import clsx from "clsx";
import Image from "next/image";

import { DiscordIcon, EmailIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { HeliosHero } from "@/components/helios-hero";
import { SignalButton } from "@/components/signal-button";
import { SiteIntro } from "@/components/site-intro";
import { StudioManifesto } from "@/components/studio-manifesto";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AdvisorsSection, TeamRoster } from "@/components/team-roster";

export default function Home() {
  return (
    <>
      <SiteIntro />
      <section className="flex flex-col items-center justify-center gap-0 pb-0">
        <HeliosHero />
        <StudioManifesto />
        <section className="bgDaff01 inline-block w-full text-center relative justify-center lineHeightLoose zIndex4">
          <div aria-hidden="true" className="team-zigzag">
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 1200 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M986.5 15L1200 52.9068L1200 93.4766L0 93.4765L3.54672e-06 52.9067L324 0.5L748.5 52.9068L986.5 15Z" />
            </svg>
          </div>
          <div className={"mt-10 maxWidth90pc"}>
            <h1 className={clsx(title(), "auxMono notBold col1d1d1b")}>
              The brainglyph team
            </h1>
          </div>
          <h2
            className={clsx("text-lg poppins-regular col1d1d1b mt-10 teamDesc")}
          >
            We have worked together for almost two years, since we found out our
            shared passion for independent game development. We met at the IT
            University of Copenhagen Master of Sciences in Games Technology,
            which we completed in June 2024. Our drive and passion brought us
            closer both professionally and as friends.
          </h2>
          <TeamRoster />
        </section>
        <AdvisorsSection />
        <ScrollReveal className="inline-block w-full text-center justify-center lineHeightLoose supportersMargin zIndex4">
          <h1
            className={clsx(title(), "auxMono notBold daff01")}
            id="supporters"
          >
            We are supported by
          </h1>
          <div
            className={"supporters flex flex-row gap-0 maxWidth70pc flex-wrap"}
          >
            <Image
              alt="Ast Black Image"
              height="0"
              src="/ITUNextGen.png"
              width="400"
            />
            <Image
              alt="Ast Black Image"
              className={"pt-10 pb-10"}
              height="0"
              src="/Innovationsfonden.png"
              width="400"
            />
            <Image
              alt="Ast Black Image"
              className={"pt-20 pb-0"}
              height="0"
              src="/eu.png"
              width="400"
            />
          </div>
          <div className="custom-shape-divider-bottom-1721854866-g littleNegativeBottom">
            <svg
              className="mt-10"
              data-name="Layer 1"
              preserveAspectRatio="none"
              viewBox="0 0 1200 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="shape-fill"
                d="M986.5 15L1200 52.9068L1200 93.4766L0 93.4765L3.54672e-06 52.9067L324 0.5L748.5 52.9068L986.5 15Z"
              />
            </svg>
          </div>
        </ScrollReveal>
        <ScrollReveal className="bgDaff01 inline-block w-full text-center justify-center lineHeightLoose pb-6 zIndex4">
          <div className={"mt-10"}>
            <h1 className={clsx(title(), "auxMono notBold col1d1d1b")}>
              Feel free to reach out!
            </h1>
          </div>
          <h2
            className={clsx("text-xl poppins-regular col1d1d1b mt-6 teamDesc")}
          >
            We&apos;ll get back to you as soon as possible!
          </h2>
          <br />
          <div className={"contactButtons maxWidth90pc"}>
            <SignalButton
              href={"https://ourdiscordserver.com"}
              icon={<DiscordIcon />}
              target={"_blank"}
            >
              Discord
            </SignalButton>
            <SignalButton
              href={"mailto:hello@brainglyph.com"}
              icon={<EmailIcon />}
              target={"_blank"}
            >
              Mail
            </SignalButton>
          </div>
        </ScrollReveal>
        <div className="inline-block w-full text-center justify-center lineHeightLoose pb-6">
          <div className={"mt-7 maxWidth90pc"}>
            <h1 className={clsx("auxMono daff01 text-xs")}>
              This website is made and maintained with ♥ by us, brainglyph!
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
