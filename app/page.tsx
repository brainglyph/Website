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
        <h1 className={clsx(title(), "auxMono col1d1d1b")}>We're making games</h1>
        <span className={clsx(title(), "auxMono spantype")}><Typewriter
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
      <Image src="/SectionEnd.svg" alt="Ast Black Image" width="0" height="0"
             style={{ width: "100%", height: "auto" }} className={"sectionImage"}/>
      <div className={"PRDiv"}>
        <h1 className={"morne zIndex4 PRTitle maxWidth90pc"}>Project Repo</h1>
        <h2 className={"firaCode zIndex4 PRSubtitle maxWidth90pc"}>We are working on our first game, <b>Project Repo</b>, <br></br>a knowledge-based action roguelite.</h2>
      </div>
      <Image src="/SectionEndBlack.svg" alt="Ast Black Image" width="0" height="0"
             style={{ width: "100%", height: "auto" }} className={"flipImage mobileImageReverse sectionImageReverse sectionImageBlack"} />
      <div className="inline-block w-full text-center justify-center lineHeightLoose mt-14 bigPaddingBottom zIndex2">
        <h1 className={clsx(title(), "auxMono daff01")}>Join our community</h1>
        <h2 className={clsx("text-2xl auxMono daff01 mt-3 maxWidth90pc")}>Stay updated and be part of the development of
          Project
          Repo</h2>
        <br className={"noMob"}></br>
        <br></br>
        <Button as={Link} className={"buttonCTA auxMono"} href={"https://discord.gg/vhdEjdyr"} target={"_blank"}><DiscordIcon /> Join our Discord server!</Button>
        <br></br>
        <br className={"noMob"}></br>
        <br></br>
        <h1 className={clsx("auxMono daff01 text-4xl font-medium maxWidth90pc")}>Community perks include:</h1>
        <div className={"maxWidth90pc mobilePerks"}>
          <p className={clsx("auxMono daff01 mt-3")}><b>Have a chat with us!</b> - We will take some time daily to answer
            messages.</p>
          <p className={clsx("auxMono daff01")}><b>Playtest the game!</b> - We will often perform playtests.</p>
          <p className={clsx("auxMono daff01")}><b>Watch as we do!</b> - We will occasionally stream our work.</p>
        </div>
      </div>
      <Image src="/SectionEnd.svg" alt="Ast Black Image" width="0" height="0"
             style={{ width: "100%", height: "auto" }} className={"flipImage mobileImageReverse sectionImageReverse"} />
      <div
        className="bgDaff01 inline-block w-full text-center justify-center lineHeightLoose pb-6 zIndex4">
        <div className={"mt-10"}><h1 className={clsx(title(), "auxMono col1d1d1b maxWidth90pc")}>The brainglyph team</h1></div>
        <h2 className={clsx("text-lg auxMono col1d1d1b mt-6 teamDesc")}>We have worked together for almost two years,
          since we found out our shared passion for independent game development. We met at the IT University of Copenhagen
          Master of Sciences in Games Technology, which we completed in June 2024. Our drive and passion brought us
          closer both professionally and as friends.</h2>
        <div className={"flex items-start justify-center mt-12 teamFlex"}>
          <div className={"flex flex-col items-center"}>
            <Image src="/Gio.png" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl font-semibold mt-6")}>Giorgio</h1>
            <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}>Co-Founder // Art Director</h2>
            <p className={"auxMono col1d1d1b text-md leading-7 max-w-md mt-3"}>Giorgio is an art director & front-end
              specialist with a background in Interaction Design who specializes in UI Programming and UX Design.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/Soren.png" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl font-semibold mt-6")}>Søren</h1>
            <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}>Co-Founder // Tech Director</h2>
            <p className={"auxMono col1d1d1b text-md leading-7 max-w-md mt-3"}>Søren is a senior developer and technical
              director with a background in cross-media studies and a deep interest in emergent gameplay and
              replayability. </p>
          </div>
        </div>
        <div className={"mt-20"}>
          <div className={"maxWidth90pc"}><h1 className={clsx(title(), "auxMono col1d1d1b")}>We're not alone in this!</h1></div>
          <h2 className={clsx(subtitle(), "auxMono col1d1d1b advisorySect maxWidth90pc")}>Along with our dynamic community and our
            talented freelancers, we are building a great board of advisors:</h2>
        </div>
        <div className={"flex items-start justify-center mt-20 advisorFlex"}>
          <div className={"flex flex-col items-center"}>
            <Image src="/Miguel.jpeg" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl font-semibold mt-6")}>Miguel Sicart</h1>
            <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}>Associate Professor @ ITU</h2>
            <p className={"auxMono col1d1d1b text-md leading-7 max-w-md mt-3"}>Miguel is an Associate Professor
              at the IT University of Copenhagen and leads the Center for Computer Games Research. He writes and teaches
              about the design and culture of playable media.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/Stella.jpeg" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl font-semibold mt-6")}>Stella Vaka</h1>
            <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}>CEO @ Silkroad Studios</h2>
            <p className={"auxMono col1d1d1b text-md leading-7 max-w-md mt-3"}>Stella is an expert in independent game
              business and design management. As an ambassador for Women in Games, Stella
              is dedicated to fostering diversity and inclusivity in the gaming industry.</p>
          </div>
          <div className={"flex flex-col items-center"}>
            <Image src="/QuestionMark.png" alt="Ast Black Image" width="200" height="0" className={"imageShadow"} />
            <h1 className={clsx("auxMono col1d1d1b text-xl font-semibold mt-6")}>TBA</h1>
            <h2 className={clsx("auxMono col1d1d1b text-lg font-semibold mt-3")}>We're looking for you!</h2>
            <p className={"auxMono col1d1d1b text-md leading-7 max-w-md mt-3"}>We are looking for more advisors with
              expertise in game dev practices, like production and distribution. If you
              have experience in these areas and would like to contribute to innovative games, we'd
              love to hear from you!</p>
          </div>
        </div>
      </div>
      <Image src="/SectionEnd.svg" alt="Ast Black Image" width="0" height="0"
             style={{ width: "100%", height: "auto" }} className={"sectionImage"}/>
      <div className="inline-block w-full text-center justify-center lineHeightLoose mt-24 bigPaddingBottom zIndex4">
        <h1 className={clsx(title(), "auxMono daff01")}>We are supported by</h1>
        <div className={"supporters"}>
          <Image src="/ITUNextGen.png" alt="Ast Black Image" width="500" height="0" />
        </div>
      </div>
      <Image src="/SectionEnd.svg" alt="Ast Black Image" width="0" height="0"
             style={{ width: "100%", height: "auto" }} className={"flipImage sectionImageReverse"} />
      <div
        className="bgDaff01 inline-block w-full text-center justify-center lineHeightLoose pb-6 zIndex4">
        <div className={"mt-10"}><h1 className={clsx(title(), "auxMono col1d1d1b")}>Feel free to reach out!</h1></div>
        <h2 className={clsx("text-lg auxMono col1d1d1b mt-6 teamDesc")}>We'll get back to you as soon as possible!</h2>
        <br></br>
        <div className={"contactButtons maxWidth90pc"}>
          <Button as={Link} className={"buttonCTAReverse auxMono"} href={"https://discord.gg/vhdEjdyr"} target={"_blank"}><DiscordIcon/> Join our Discord server!</Button>
          <Button as={Link} className={"buttonCTAReverse auxMono"} href={"mailto:hello@brainglyph.com"} target={"_blank"}>Shoot us an email!</Button>
        </div>
      </div>
      <div
        className="inline-block w-full text-center justify-center lineHeightLoose pb-6">
        <div className={"mt-7 maxWidth90pc"}><h1 className={clsx("auxMono daff01 text-xs")}>This website is made and maintained with ♥ by brainglyph</h1></div>
      </div>
    </section>
  );
}
