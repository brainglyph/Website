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
  const glyphArray = ["d", "A", "f", "F", "=", "!"];
  const [currentGlyph, setCurrentGlyph] = useState(glyphArray[0]);
  const currentGlyphRef = useRef(currentGlyph);
  const [showImage, setShowImage] = useState(false);

  //find the navbar and hide it
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.classList.add("hidden");
    }
  }, []);

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

          interval = setInterval(changeGlyph, 500);
        }, 2000);
      }
    };

    interval = setInterval(changeGlyph, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="">
      <div
        className="fullHeight negativeMarginXL bgDaff01 inline-block w-full text-center justify-center lineHeightLoose">
        <div className="mt-64 enlarge">
          <span className="hidden">Knowledge comes to those who seek it.</span>
          <span className={clsx("glyph col1d1d1b auxMono", showImage && "invisible")}>{currentGlyph}{showImage &&
            <Image src="/astBlack.svg" alt="Ast Black Image" width="135" height="0" className={"astGlyph"} />
          }</span>
          <Image src="/logoBlackEmpty.svg" alt={""} width="130" height="0" className={"mx-auto mb-10"} />
        </div>
      </div>
    </section>
  );
}