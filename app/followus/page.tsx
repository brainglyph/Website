"use client";

import { subtitle, title } from "@/components/primitives";
import clsx from "clsx";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { DiscordIcon, TikTokIcon, YoutubeIcon } from "@/components/icons";

export default function FollowUsPage() {
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
        <h1 className={clsx(title(), "auxMono notBold col1d1d1b")}>We're making games <br></br> you can't stop
          thinking
          about
        </h1>
      </div>
      <div className="custom-shape-divider-top-1721854402 littleNegativeTop">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150" preserveAspectRatio="none">
          <path d="M333.105 104.653L0 40.5698V0H1200V40.5698L924.558 149.477L604.292 40.5698L333.105 104.653Z"
                className="shape-fill"></path>
        </svg>
      </div>
      <div className="inline-block w-full text-center justify-center lineHeightLoose mt-14 zIndex2 relative">
        <h1 className={clsx(title(), "auxMono notBold daff01")}>Follow our journey</h1>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc")}>Stay updated and be part of the
          development of HeliOS</h2>
        <br className={"noMob"}></br>
        <br></br>
        <Button as={Link} className={"buttonCTA auxMono"} href={"https://discord.gg/compact-claustrophobia-650043435243405352"}
                target={"_blank"}><DiscordIcon /> <span className={"ml-2"}>Join our Discord server!</span></Button>
        <div className={"mb-6"}></div>
        <Button as={Link} className={"buttonCTA auxMono"}
                href={"https://www.youtube.com/channel/UCeoSz0hPS2aMPHh3hiE6czg"}
                target={"_blank"}><YoutubeIcon /> <span className={"ml-2"}>Subscribe to our channel!</span></Button>
        <div className={"mb-6"}></div>
        <Button as={Link} className={"buttonCTA auxMono"} href={"https://www.tiktok.com/@playhelios"}
                target={"_blank"}><TikTokIcon /> <span className={"ml-2"}>Follow us on TikTok!</span></Button>
        <br></br>
        <br></br>
        <Link href={"/"}><h1 className={clsx(title(), "fontMedium auxMono notBold daff01")}>← Back to homepage</h1></Link>
        <br className={"noMob"}></br>
        <br></br>
        <div className={"maxWidth90pc mobilePerks mb-40"}>
        </div>
        <div className="custom-shape-divider-bottom-1721854866-g littleNegativeBottom">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 90"
               preserveAspectRatio="none">
            <path
              d="M986.5 15L1200 52.9068L1200 93.4766L0 93.4765L3.54672e-06 52.9067L324 0.5L748.5 52.9068L986.5 15Z"
              className="shape-fill"></path>
          </svg>
        </div>
      </div>

      <div
        className="bgDaff01 inline-block w-full text-center justify-center lineHeightLoose pb-6">
          <div className={"mt-7 maxWidth90pc"}><h1 className={clsx("auxMono col1d1d1b text-xs")}>This website is made
            and
            maintained with ♥ by us, brainglyph!</h1></div>
        </div>
    </section>
);
}