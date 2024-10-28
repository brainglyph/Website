"use client";

import { Link } from "@nextui-org/link";
import { title, subtitle } from "@/components/primitives";
import { DiscordIcon, GithubIcon } from "@/components/icons";
import clsx from "clsx";
import Image from "next/image";

import React, { useState, useEffect, useRef } from "react";

import Typewriter from "typewriter-effect";
import { Button } from "@nextui-org/button";

export default function Home() {
  const glyphArray = ["%", "#", "Ø", "↙", "&"];
  const [currentGlyph, setCurrentGlyph] = useState(glyphArray[0]);
  const currentGlyphRef = useRef(currentGlyph);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let interval: any;

    const changeGlyph = () => {
      setCurrentGlyph(prevGlyph => {
        const nextIndex = (glyphArray.indexOf(prevGlyph) + 1) % glyphArray.length;
        const nextGlyph = glyphArray[nextIndex];
        currentGlyphRef.current = nextGlyph;
        return nextGlyph;
      });

      if (currentGlyphRef.current === glyphArray[glyphArray.length - 1]) {
        setShowImage(true);

        clearInterval(interval);

        setTimeout(() => {
          setShowImage(false);
          setCurrentGlyph(glyphArray[0]);

          interval = setInterval(changeGlyph, 150);
        }, 2000);
      }
    };

    interval = setInterval(changeGlyph, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-0 pb-0">
      <div
        className="bgDaff01 inline-block w-full text-center justify-center lineHeightLoose negativeMarginXL bigPaddingBottom zIndex4 firstSect">
        <span className={clsx("glyph col1d1d1b auxMono", showImage && "invisible")}>{currentGlyph}{showImage &&
          <Image src="/astBlack.svg" alt="Ast Black Image" width="135" height="0" className={"astGlyph"} />
        }</span>
        <Image src="/logoBlackEmpty.svg" alt={""} width="130" height="0" className={"mx-auto mb-10"} />
        <h1 className={clsx(title(), "auxMono notBold col1d1d1b")}>We're making games</h1>
        <span className={clsx(title(), "auxMono notBold spantype")}><Typewriter
          options={{
            strings: ["you can't stop thinking about", "you'll never forget"],
            autoStart: true,
            loop: true,
            cursor: "_",
            deleteSpeed: 20,
            delay: 50,
            wrapperClassName: "auxMono"
          }}
        />
        </span>
      </div>
      <div className="custom-shape-divider-top-1721854402 littleNegativeTop">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M333.105 104.653L0 40.5698V0H1200V40.5698L924.558 149.477L604.292 40.5698L333.105 104.653Z"
                className="shape-fill"></path>
        </svg>
      </div>
      <div className={"PRDiv"}>
        <Image src="/heliosLogo.png" alt="HeliosLogo" width="2000" height="0" className={"zIndex4 HeliosLogo maxWidth90pc"} />
        <h2 className={"firaCode zIndex4 PRSubtitle maxWidth90pc"}>We are working on our first game, <b>heli.os</b>,
          a knowledge-based action roguelite.</h2>
        <div className="custom-shape-divider-bottom-1721854866 littleNegativeBottom">
          <svg className="mt-10" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
               preserveAspectRatio="none">
            <path
              d="M1022 24.5L1200 76.9068L1200 120.477L0 120.476L3.54672e-06 76.9067L198 -3.67428e-06L490.5 76.9067L1022 24.5Z"
              className="shape-fill"></path>
          </svg>
        </div>
      </div>
      <div className="inline-block w-full text-center justify-center lineHeightLoose mt-14 zIndex2 relative">
        <h1 className={clsx(title(), "auxMono notBold daff01")}>Join our community</h1>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc")}>Stay updated and be part of the
          development of Heli.os</h2>
        <br className={"noMob"}></br>
        <br></br>
        <Button as={Link} className={"buttonCTA auxMono"} href={"https://discord.gg/compact-claustrophobia-650043435243405352"}
                target={"_blank"}><DiscordIcon /> <span className={"ml-2"}>Join our Discord server!</span></Button>
        <br></br>
        <br className={"noMob"}></br>
        <br></br>
        <h1 className={clsx("auxMono daff01 text-4xl font-medium maxWidth90pc mb-10")}>Community perks include:</h1>
        <div className={"maxWidth90pc mobilePerks mb-52"}>
          <p className={clsx("text-xl auxMono daff01 mt-5")}><b>Have a chat with us</b> - <span
            className={"poppins-regular"}>We will take some time daily to answer messages.</span></p>
          <p className={clsx("text-xl auxMono daff01 mt-5")}><b>Playtest the game</b> - <span
            className={"poppins-regular"}>We will often perform playtests.</span></p>
          <p className={clsx("text-xl auxMono daff01 mt-5")}><b>Watch as we do</b> - <span
            className={"poppins-regular"}>We will occasionally stream our work.</span></p>
        </div>
        <div className="custom-shape-divider-bottom-1721854866-g littleNegativeBottom">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 90" preserveAspectRatio="none">
            <path
              d="M986.5 15L1200 52.9068L1200 93.4766L0 93.4765L3.54672e-06 52.9067L324 0.5L748.5 52.9068L986.5 15Z"
              className="shape-fill"></path>
          </svg>
        </div>
      </div>
      <div
        className="bgDaff01 inline-block w-full text-center relative justify-center lineHeightLoose zIndex4">
        <div className={"mt-10 maxWidth90pc"}><h1 className={clsx(title(), "auxMono notBold col1d1d1b")}>The brainglyph
          team</h1></div>
        <h2 className={clsx("text-lg poppins-regular col1d1d1b mt-10 teamDesc")}>We have worked together for almost two
          years,
          since we found out our shared passion for independent game development. We met at the IT University of
          Copenhagen
          Master of Sciences in Games Technology, which we completed in June 2024. Our drive and passion brought us
          closer both professionally and as friends.</h2>
        <div className={"flex items-start justify-center mt-16 teamFlex"}>
          <div className={"flex flex-col items-center"}>
            <Image src="/Gio.png" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}><a
              href={"https://www.linkedin.com/in/giorgio-perri/"} target={"_blank"}>Giorgio</a></h1>
            <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}>Co-Founder // Art Director</h2>
            <p className={"poppins-regular col1d1d1b text-lg leading-7 max-w-md mt-3"}>Giorgio is an art director &
              front-end
              specialist with a background in interaction design, who focuses on UI programming and UX design.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/Soren.png" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl mt-6 underline")}><a
              href={"https://www.linkedin.com/in/sskouv/"} target={"_blank"}>Søren</a></h1>
            <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}>Co-Founder // Tech Director</h2>
            <p className={"poppins-regular col1d1d1b text-lg leading-7 max-w-md mt-3"}>Søren is a developer and
              technical director with a background in cross-media studies and a deep interest in emergent gameplay and
              replayability. </p>
          </div>
        </div>
        <div className={"mt-28"}>
          <div className={"maxWidth90pc"}><h1 className={clsx(title(), "auxMono notBold col1d1d1b")}>We're not alone in
            this!</h1></div>
          <h2 className={clsx(subtitle(), "poppins-regular col1d1d1b advisorySect maxWidth90pc mt-10")}>Together with
            our
            dynamic community and talented freelancers, we are honored to be advised by experts in the games
            industry. Our trustworthy, multidisciplinary, and diverse board of advisors is made up of:</h2>
        </div>
        <div className={"flex items-start justify-center mt-20 mb-40 advisorFlex flex-wrap"}>
          <div className={"flex flex-col items-center"}>
            <Image src="/soeren.jpg" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>Søren Lundgaard</h1>
            <div className={"h-16 flex flex-col justify-center"}>
              <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold")}>CEO @ Ghost Ship Games</h2>
            </div>
            <p className={"poppins-regular col1d1d1b text-md leading-7 max-w-xl"}>With a strong background in game
              development and leadership, Søren excels in innovation, player engagement, and fostering creative,
              community-focused projects, such as Deep Rock Galactic.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/Miguel.jpeg" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>Miguel Sicart</h1>
            <div className={"h-24 flex flex-col justify-center"}>
              <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold")}>Professor @ ITU <br></br> Head of the
                Center for Digital Play</h2>
            </div>
            <p className={"poppins-regular col1d1d1b text-md leading-7 max-w-xl"}>Miguel is a Professor
              at the IT University of Copenhagen and head of the Center for Digital Play. He writes and teaches
              about the design and culture of playable media.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/Stella.jpeg" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>Stella Vaka</h1>
            <div className={"h-24 flex flex-col justify-center"}>
              <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold")}>CEO @ Silkroad
                Studios <br></br> Ambassador @ Women in games</h2>
            </div>
            <p className={"poppins-regular col1d1d1b text-md leading-7 max-w-xl"}>Stella is an expert in independent
              game
              business and design management, dedicated to fostering meritocratic teams who know no borders,
              built upon ambitious dreams and passionate creatives.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/Philip.jpeg" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>Philip Schlüter Wittendorff</h1>
            <div className={"h-16 flex flex-col justify-center"}>
              <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold")}>CEO @ Trinor Entertainment</h2>
            </div>
            <p className={"poppins-regular col1d1d1b text-md leading-7 max-w-xl"}>Recognized as a future growth
              adventure by the Danish Minister of Culture and supported by the Danish Innovation Fund, Trinor
              Entertainment is an emerging Danish game development startup.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/Helena.jpeg" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>Helena Sokol</h1>
            <div className={"h-16 flex flex-col justify-center mt-6 helenaMargin"}>
              <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold helenaFont")}>Producer @ Flashbulb
                Games <br></br> Founder @ Danish Game Producers' Network <br></br> Board
                Member @ Games Denmark</h2>
            </div>
            <p className={"poppins-regular col1d1d1b text-md leading-7 max-w-xl mt-6 helenaMargin"}>Helena is a producer
              at Flashbulb Games with years of experience and a passion for project management, organization, and
              creative production. She has been involved in several projects, both through student organization and
              work.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/brian.jpeg" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl mt-6")}>Brian Martin Nielsen</h1>
            <div className={"h-16 flex flex-col justify-center"}>
              <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold")}>CEO @ Kaiju Production</h2>
            </div>
            <p className={"poppins-regular col1d1d1b text-md leading-7 max-w-xl"}>Brian’s focus is to lead people and
              teams to execute on their vision. His goal is ensuring each project reaches and unlocks its full
              potential, pushing boundaries to create memorable games.</p>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1721854866-gr littleNegativeTop">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M333.105 104.653L0 40.5698V0H1200V40.5698L924.558 80.477L604.292 40.5698L333.105 104.653Z"
                  className="shape-fill"></path>
          </svg>
        </div>
      </div>
      <div className="inline-block w-full text-center justify-center lineHeightLoose supportersMargin zIndex4">
        <h1 className={clsx(title(), "auxMono notBold daff01")}>We are supported by</h1>
        <div className={"supporters"}>
          <Image src="/ITUNextGen.png" alt="Ast Black Image" width="500" height="0" />
        </div>
        <div className="custom-shape-divider-bottom-1721854866-g littleNegativeBottom">
          <svg className="mt-10" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 90"
               preserveAspectRatio="none">
            <path d="M986.5 15L1200 52.9068L1200 93.4766L0 93.4765L3.54672e-06 52.9067L324 0.5L748.5 52.9068L986.5 15Z"
                  className="shape-fill"></path>
          </svg>
        </div>
      </div>
      <div
        className="bgDaff01 inline-block w-full text-center justify-center lineHeightLoose pb-6 zIndex4">
        <div className={"mt-10"}><h1 className={clsx(title(), "auxMono notBold col1d1d1b")}>Feel free to reach out!</h1>
        </div>
        <h2 className={clsx("text-xl poppins-regular col1d1d1b mt-6 teamDesc")}>We'll get back to you as soon as
          possible!</h2>
        <br></br>
        <div className={"contactButtons maxWidth90pc"}>
          <Button as={Link} className={"buttonCTAReverse auxMono"} href={"https://discord.gg/compact-claustrophobia-650043435243405352"}
                  target={"_blank"}><DiscordIcon /> Join our Discord server!</Button>
          <Button as={Link} className={"buttonCTAReverse auxMono"} href={"mailto:admin@brainglyph.com"}
                  target={"_blank"}>Shoot us an email!</Button>
        </div>
      </div>
      <div
        className="inline-block w-full text-center justify-center lineHeightLoose pb-6">
        <div className={"mt-7 maxWidth90pc"}><h1 className={clsx("auxMono daff01 text-xs")}>This website is made and
          maintained with ♥ by us, brainglyph!</h1></div>
      </div>
    </section>
  );
}
