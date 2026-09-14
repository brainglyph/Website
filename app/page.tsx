import clsx from "clsx";
import Image from "next/image";

import {
  DiscordIcon,
  EmailIcon,
  TikTokIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons";
import { title, subtitle } from "@/components/primitives";
import { HeliosHero } from "@/components/helios-hero";
import { SignalButton } from "@/components/signal-button";
import { SiteIntro } from "@/components/site-intro";
import { StudioManifesto } from "@/components/studio-manifesto";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <>
      <SiteIntro />
      <section className="flex flex-col items-center justify-center gap-0 pb-0">
        <HeliosHero />
        <StudioManifesto />
        <ScrollReveal className="inline-block w-full text-center justify-center lineHeightLoose mt-14 zIndex2 relative">
          <h1 className={clsx(title(), "auxMono notBold daff01")}>
            Some handy links
          </h1>
          <h2
            className={clsx(
              "text-2xl poppins-regular daff01 mt-3 maxWidth90pc",
            )}
          >
            Follow our journey on YouTube, TikTok, and X—or reach us through
            Discord and email.
          </h2>
          <br className={"noMob"} />
          <br />
          <SignalButton
            href={"https://www.youtube.com/channel/UCeoSz0hPS2aMPHh3hiE6czg"}
            icon={<YoutubeIcon />}
            target={"_blank"}
            variant="signal"
          >
            YouTube
          </SignalButton>
          <div className={"mb-6"} />
          <SignalButton
            href={"https://www.tiktok.com/@brainglyph"}
            icon={<TikTokIcon />}
            target={"_blank"}
            variant="signal"
          >
            TikTok
          </SignalButton>
          <div className={"mb-6"} />
          <SignalButton
            href={"https://x.com/brainglyph"}
            icon={<TwitterIcon />}
            target={"_blank"}
            variant="signal"
          >
            X (Twitter)
          </SignalButton>
          <div className={"mb-6"} />
          <SignalButton
            href={"mailto:hello@brainglyph.com"}
            icon={<EmailIcon />}
            target={"_blank"}
            variant="signal"
          >
            Mail
          </SignalButton>
          <div className={"mb-6"} />
          <SignalButton
            href={"https://ourdiscordserver.com"}
            icon={<DiscordIcon />}
            target={"_blank"}
            variant="signal"
          >
            Discord
          </SignalButton>
          <h2
            className={clsx(
              "text-sm poppins-regular daff01 mt-3 maxWidth90pc opacity-75",
            )}
          >
            Yes, we do own this Discord domain&nbsp; (¬‿¬)
          </h2>
          <br />
          <h1
            className={clsx(
              "auxMono daff01 text-4xl font-medium maxWidth90pc mb-10",
            )}
          >
            As a member of the Community, you can:
          </h1>
          <div className={"maxWidth90pc mobilePerks mb-52"}>
            <p className={clsx("text-xl auxMono daff01 mt-5")}>
              <b>Have a chat with us</b> -{" "}
              <span className={"poppins-regular"}>
                We will take some time daily to answer messages.
              </span>
            </p>
            <p className={clsx("text-xl auxMono daff01 mt-5")}>
              <b>Playtest the game</b> -{" "}
              <span className={"poppins-regular"}>
                We will often perform playtests.
              </span>
            </p>
            <p className={clsx("text-xl auxMono daff01 mt-5")}>
              <b>Watch as we do</b> -{" "}
              <span className={"poppins-regular"}>
                We will occasionally stream our work.
              </span>
            </p>
          </div>
          <div className="custom-shape-divider-bottom-1721854866-g littleNegativeBottom">
            <svg
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
        <ScrollReveal className="bgDaff01 inline-block w-full text-center relative justify-center lineHeightLoose zIndex4">
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
          <div
            className={
              "flex items-start justify-center mt-16 teamFlex flex-wrap"
            }
          >
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(35%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Gio.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={"https://www.linkedin.com/in/giorgio-perri/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Giorgio Perri
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                Co-Founder <br /> UI & Gameplay programmer
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(35%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Soren.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={"https://www.linkedin.com/in/sskouv/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Søren Skouv
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                Co-Founder <br /> Programmer & Project manager
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(25%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Charles.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={"https://www.linkedin.com/in/charlesboury/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Charles Boury
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                Art director
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(25%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Gunnar.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={"https://www.linkedin.com/in/gunnar-magnussen/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Gunnar Magnussen
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                Programmer
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(25%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Joanna.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={"https://www.linkedin.com/in/saskia-joanna-rauhut/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Joanna Rauhut
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                Narrative designer
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(25%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Lasse.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={"https://www.linkedin.com/in/lasse-boie-/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Lasse Boie
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                Sound designer
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(25%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Frode.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={
                    "https://www.linkedin.com/in/frode-s%C3%B8rensen-407886302/"
                  }
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Frode Sørensen
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                Sound designer
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(25%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Richard.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={"https://www.linkedin.com/in/richard-rippe-b2aab3273/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Richard Rippe
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                3D artist
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(25%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Roman.png"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={
                    "https://www.linkedin.com/in/roman-chacornac-3b0b47193/"
                  }
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Roman Chacornac
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                VFX Artist
              </h2>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(25%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/mito.jpg"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}>
                <a
                  href={"https://www.linkedin.com/in/mathias-mito-gregersen/"}
                  rel="noreferrer"
                  target={"_blank"}
                >
                  Mathias Gregersen
                </a>
              </h1>
              <h2
                className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}
              >
                3D Animator & rigger
              </h2>
            </div>
          </div>
          <div className={"mt-28"}>
            <div className={"maxWidth90pc"}>
              <h1 className={clsx(title(), "auxMono notBold col1d1d1b")}>
                We're not alone in this!
              </h1>
            </div>
            <h2
              className={clsx(
                subtitle(),
                "poppins-regular col1d1d1b advisorySect maxWidth90pc mt-10",
              )}
            >
              Together with our dynamic community and talented freelancers, we
              are honored to be advised by experts in the games industry. Our
              trustworthy, multidisciplinary, and diverse board of advisors is
              made up of:
            </h2>
          </div>
          <div
            className={
              "flex items-start justify-center mt-20 mb-40 advisorFlex flex-wrap"
            }
          >
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(35%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/soeren.jpg"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>
                Søren Lundgaard
              </h1>
              <div className={"h-16 flex flex-col justify-center"}>
                <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold")}>
                  CEO @ Ghost Ship Games
                </h2>
              </div>
              <p
                className={
                  "poppins-regular col1d1d1b text-md leading-7 max-w-xl"
                }
              >
                With a strong background in game development and leadership,
                Søren excels in innovation, player engagement, and fostering
                creative, community-focused projects, such as Deep Rock
                Galactic.
              </p>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(35%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Miguel.jpeg"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>
                Miguel Sicart
              </h1>
              <div className={"h-24 flex flex-col justify-center"}>
                <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold")}>
                  Professor @ ITU <br /> Head of the Center for Digital Play
                </h2>
              </div>
              <p
                className={
                  "poppins-regular col1d1d1b text-md leading-7 max-w-xl"
                }
              >
                Miguel is a Professor at the IT University of Copenhagen and
                head of the Center for Digital Play. He writes and teaches about
                the design and culture of playable media.
              </p>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(35%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/Helena.jpeg"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>
                Helena Sokol
              </h1>
              <div
                className={
                  "h-16 flex flex-col justify-center mt-6 helenaMargin"
                }
              >
                <h2
                  className={clsx(
                    "auxMono col1d1d1b text-lg font-semibold helenaFont",
                  )}
                >
                  Director of members and organization <br /> @ Games Denmark
                </h2>
              </div>
              <p
                className={
                  "poppins-regular col1d1d1b text-md leading-7 max-w-xl mt-6 helenaMargin"
                }
              >
                Helena is a producer with years of experience and a passion for
                project management, organization, and creative production. She
                has been involved in several projects, both through student
                organization and work.
              </p>
            </div>
            <div
              className={
                "flex flex-col items-center flex-grow basis-[calc(35%-1rem)]"
              }
            >
              <Image
                alt="Ast Black Image"
                className={"imageShadow"}
                height="0"
                src="/brian.jpeg"
                width="200"
              />
              <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>
                Brian Martin Nielsen
              </h1>
              <div className={"h-16 flex flex-col justify-center"}>
                <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold")}>
                  CEO @ Kaiju Production
                </h2>
              </div>
              <p
                className={
                  "poppins-regular col1d1d1b text-md leading-7 max-w-xl"
                }
              >
                Brian’s focus is to lead people and teams to execute on their
                vision. His goal is ensuring each project reaches and unlocks
                its full potential, pushing boundaries to create memorable
                games.
              </p>
            </div>
          </div>
          <div className="custom-shape-divider-bottom-1721854866-gr littleNegativeTop">
            <svg
              data-name="Layer 1"
              preserveAspectRatio="none"
              viewBox="0 0 1200 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="shape-fill"
                d="M333.105 104.653L0 40.5698V0H1200V40.5698L924.558 80.477L604.292 40.5698L333.105 104.653Z"
              />
            </svg>
          </div>
        </ScrollReveal>
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
            We'll get back to you as soon as possible!
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
