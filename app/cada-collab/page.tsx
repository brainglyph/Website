"use client";

import { Link } from "@nextui-org/link";
import { title, subtitle } from "@/components/primitives";
import { DiscordIcon, EmailIcon, GithubIcon, TikTokIcon, YoutubeIcon } from "@/components/icons";
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
        <Image src="/Brain.png" alt={"Brainglyph logo for google text result image"} width="130" height="0"
               className={"mx-auto mb-10 hidden"} />
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
        <Image src="/heliosLogo.png" alt="HeliosLogo" width="2000" height="0"
               className={"zIndex4 HeliosLogo maxWidth90pc"} />
        <h2 className={"firaCode zIndex4 PRSubtitle maxWidth90pc"}>We are working on our first game, <b>Heli.os</b>,
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
        <h1 className={clsx(title(), "auxMono notBold daff01")}>Company collaboration at brainglyph</h1>
        <br></br>
        <br></br>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc text-left")}>Giorgio & Søren here from
          brainglyph - a newly established independent games company in Copenhagen. Our studio received its first round
          of funding this year, and we're looking towards CADA for the first people to join our journey!
          <br></br>
          <br></br>
          As a young company, we offer different opportunities than more established games companies. For this to be a
          great match, these points should make you excited!
          <br></br>
          <br></br>
          <ul className="list-disc job-list">
            <li>
              We are committed to allow interns high creative influence on our project. It's only two of us, so your
              input won't have to go through different departments before making it into the game.
            </li>
            <li>
              Since we are a very small team, you are going to work on different types of tasks. If you like wearing
              different hats, you're going to have fun!
            </li>
            <li>
              We have learned a ton starting this journey, and this is a unique opportunity to gaining insight into
              starting an independent games company.
            </li>
          </ul>
        </h2>
        <br></br>
        <br></br>
        <h1 className={clsx(title(), "auxMono notBold daff01")}>About brainglyph</h1>
        <br></br>
        <br></br>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc text-left")}>
          At brainglyph, we are making games you can't stop thinking about.
          <br></br>
          <br></br>
          Here's how we do it:
          <br></br>
          <br></br>
          <ul className="list-disc job-list">
            <li>
              First of all, we value open and honest communication. There are no stupid questions, and every feedback,
              idea, or opinion is taken in consideration. We want our games to be the best they can be, and we believe
              ideas lie everywhere.
            </li>
            <li>
              We believe in chasing every opportunity. As a young start-up looking to grow, our priorities shift often.
              Our priority is working on the game, but calls for funds, business endeavours, and meetings happen to us
              all the time, and we like being prepared for these.
            </li>
            <li>
              We know it's a cliché, but making games is our dream, and we put everything on the line to make this a
              reality. We give it our best, and work enthusiastically every day to keep this dream real. Even with
              things we've never done before.
            </li>
            <li>
              We are extremely committed to a healthy work-life balance. As with every other job, life happens, and
              we're there for each other when needed.
            </li>
          </ul>
          <br></br>
          We know this all sounds very serious, but apart from these points, we are very easy going. Promise!
        </h2>
        <br></br>
        <br></br>
        <h1 className={clsx(title(), "auxMono notBold daff01")}>About heli.os</h1>
        <br></br>
        <br></br>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc text-left")}>
          Heli.os is a third-person roguelike where knowledge is power. Explore an Earth reclaimed by nature, uncovering
          the lost technology of the Old World. You play as Tinker, an on-field researcher that together with Repo,
          their robotic companion and journal, is tasked with recovering long lost knowledge. Experiment with mysterious
          Components, combining them into unique circuits to create powerful abilities, and fight back against _The
          Surge_, a parasite that corrupts technology. Each expedition brings new discoveries, and when you fall, only
          your knowledge endures, allowing you to push further, piece together the past, and shape your own path through
          this ever-evolving world.
          <br></br>
          <br></br>
          If this very brief description interests you, you can find more about Heli.os on our youtube channel! Find it
          here:
          <br></br>
          <br></br>
          <Button as={Link} className={"buttonCTA auxMono"}
                  href={"https://www.youtube.com/channel/UCeoSz0hPS2aMPHh3hiE6czg"}
                  target={"_blank"}><YoutubeIcon /> <span className={"ml-2"}>Youtube.com/@brainglyph</span></Button>
        </h2>
        <br></br>
        <br></br>
        <h1 className={clsx(title(), "auxMono notBold daff01")}>What we are looking for</h1>
        <br></br>
        <br></br>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc text-left")}>
          We are looking for someone who gets their commitment and drive out of enjoyment for their role, and passion
          for games. Bonus points if you easily adapt to change!
          <br></br>
          <br></br>
          We are open to discuss your ideas for what you'll do with us, but we'll mainly be looking for people who can
          help us with:
          <br></br>
          <br></br>
          <ul className="list-disc job-list">
            <li>
              Modeling props, characters and environments
            </li>
            <li>
              Rigging & animation, as well as experimenting with motion capture
            </li>
            <li>
              Environmental concept art, character design, promotional material
            </li>
          </ul>
          <br></br>
          If you have interests in procedural animations, VFX, lighting and shaders, we're sure we can figure something
          out too!
          <br></br>
          <br></br>
          As we want to make sure this is the best possible experience for every party involved, we will be only
          onboarding one or maximum two people, should the right candidates occur.
        </h2>
        <br></br>
        <br></br>
        <h1 className={clsx(title(), "auxMono notBold daff01")}>Our commitment</h1>
        <br></br>
        <br></br>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc text-left")}>
          We will do all that's in our power to make these collaborations benefit all parties involved. Here's what we
          commit to:
          <br></br>
          <br></br>
          <ul className="list-disc job-list">
            <li>
              We are planning on growing as a company, and consistency for the game is important to us. This means that
              if there is a match with the people who join us, and what they bring to the project, we will do what we
              can to keep them onboard in the future.
            </li>
            <li>
              We are believers that work should be credited. This means that we will cite you and your work wherever
              possible. Of course, this includes the game credits! However, as this is a commercial game, we will
              require you to waive commercial rights to the work you do on it and for brainglyph in general.
            </li>
          </ul>
          <br></br>
          We will be transparent: we are a start-up in the first year of operation, and we can't guarantee a hire after
          this collaboration or your graduation, but if we match well, we will do our best to make it happen.
        </h2>
        <br></br>
        <br></br>
        <h1 className={clsx(title(), "auxMono notBold daff01")}>How to apply</h1>
        <br></br>
        <br></br>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc text-left")}>
          To apply, please send us an email at: <a href="mailto:hello@brainglyph.com"
                                                   className="underline">hello@brainglyph.com</a>
          <br></br>
          <br></br>
          Please, use <b>"CADA Internship - [Name Surname]"</b> as the mail subject.
          <br></br>
          <br></br>
          Write a message that states what you're looking to get out of the collaboration, what you can contribute with
          (primarily from the list above, but shoot your shot!), and have an updated portfolio attached.
          <br></br>
          <br></br>
          We'll read and respond to all applications, and invite selected candidates to a short interview before moving
          forward.
        </h2>
        <br></br>
        <br></br>
        <h1 className={clsx(title(), "auxMono notBold daff01")}>Questions?</h1>
        <br></br>
        <br></br>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc text-left")}>
          We are always available for questions on Discord and in our office at the 3rd floor of the DR building in Kaj
          Munks Vej 11, 2300 Copenhagen.
          <br></br>
          <br></br>
          Our discord handles are:
          <br></br>
          <br></br>
          <ul className="list-disc job-list">
            <li>
              @your_hamster (Søren)
            </li>
            <li>
              @giorgioperridev (Gio)
            </li>
          </ul>
          <br></br>
          You can also write us a mail at any of these addresses:
          <br></br>
          <br></br>
          <ul className="list-disc job-list">
            <li>
              <a href="mailto:hello@brainglyph.com"
                 className="underline">hello@brainglyph.com</a>
            </li>
            <li>
              <a href="mailto:gio@brainglyph.com"
                 className="underline">gio@brainglyph.com</a>
            </li>
            <li>
              <a href="mailto:soren@brainglyph.com"
                 className="underline">soren@brainglyph.com</a>
            </li>
          </ul>
          <br></br>
          We can't wait to hear from you!
          <br></br>
          <br></br>
          Cheers,
          <br></br>
          Gio & Søren :)
        </h2>
        <br></br>
        <br></br>
        <h1 className={clsx(title(), "auxMono notBold daff01")}>Some handy links</h1>
        <h2 className={clsx("text-2xl poppins-regular daff01 mt-3 maxWidth90pc")}>Follow our journey on
          YouTube and TikTok, and contact us through
          Discord* or e-mail!</h2>
        <br className={"noMob"}></br>
        <br></br>
        <Button as={Link} className={"buttonCTA auxMono"}
                href={"https://www.youtube.com/channel/UCeoSz0hPS2aMPHh3hiE6czg"}
                target={"_blank"}><YoutubeIcon /> <span className={"ml-2"}>Youtube.com/@brainglyph</span></Button>
        <div className={"mb-6"}></div>
        <Button as={Link} className={"buttonCTA auxMono"} href={"https://www.tiktok.com/@playheli.os"}
                target={"_blank"}><TikTokIcon /> <span className={"ml-2"}>Tiktok.com/@playheli.os</span></Button>
        <div className={"mb-6"}></div>
        <Button as={Link} className={"buttonCTA auxMono"} href={"mailto:hello@brainglyph.com"}
                target={"_blank"}><EmailIcon /><span className={"ml-2"}>hello@brainglyph.com</span></Button>
        <div className={"mb-6"}></div>
        <Button as={Link} className={"buttonCTA auxMono"}
                href={"https://discord.gg/compact-claustrophobia-650043435243405352"}
                target={"_blank"}><DiscordIcon /> <span className={"ml-2"}>OurDiscordServer.com</span></Button>
        <h2 className={clsx("text-l poppins-regular daff01 mt-3 maxWidth90pc")}>*Yes, we do own this domain :D</h2>
        <br></br>
        <h1 className={clsx("auxMono daff01 text-4xl font-medium maxWidth90pc mb-10")}>As a member of the Community, you
          can:</h1>
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
        <div className={"flex items-start justify-center mt-16 teamFlex mb-28"}>
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
      </div>
      <div
        className="inline-block w-full text-center justify-center lineHeightLoose pb-6">
        <div className={"mt-7 maxWidth90pc"}><h1 className={clsx("auxMono daff01 text-xs")}>This website is made and
          maintained with ♥ by us, brainglyph!</h1></div>
      </div>
    </section>
  );
}
