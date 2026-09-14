"use client";

import clsx from "clsx";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { PointerEvent, useEffect, useRef, useState } from "react";

import styles from "./team-roster.module.css";

import { GlyphRollText } from "@/components/glyph-roll-text";
import { title } from "@/components/primitives";

type Person = {
  description?: string;
  glyph: string;
  image: string;
  linkedin?: string;
  name: string;
  role: string;
};

const TEAM_MEMBERS: readonly Person[] = [
  {
    glyph: "§",
    image: "/Gio.png",
    linkedin: "https://www.linkedin.com/in/giorgio-perri/",
    name: "Giorgio Perri",
    role: "Co-Founder · UI & Gameplay Programmer",
  },
  {
    glyph: "⌘",
    image: "/Soren.png",
    linkedin: "https://www.linkedin.com/in/sskouv/",
    name: "Søren Skouv",
    role: "Co-Founder · Programmer & Project Manager",
  },
  {
    glyph: "⊕",
    image: "/Charles.png",
    linkedin: "https://www.linkedin.com/in/charlesboury/",
    name: "Charles Boury",
    role: "Art Director",
  },
  {
    glyph: "∞",
    image: "/Gunnar.png",
    linkedin: "https://www.linkedin.com/in/gunnar-magnussen/",
    name: "Gunnar Magnussen",
    role: "Programmer",
  },
  // {
  //   glyph: "¶",
  //   image: "/Joanna.png",
  //   linkedin: "https://www.linkedin.com/in/saskia-joanna-rauhut/",
  //   name: "Joanna Rauhut",
  //   role: "Narrative Designer",
  // },
  {
    glyph: "¤",
    image: "/Lasse.png",
    linkedin: "https://www.linkedin.com/in/lasse-boie-/",
    name: "Lasse Boie",
    role: "Sound Designer",
  },
  {
    glyph: "Ω",
    image: "/Frode.png",
    linkedin: "https://www.linkedin.com/in/frode-s%C3%B8rensen-407886302/",
    name: "Frode Sørensen",
    role: "Sound Designer",
  },
  {
    glyph: "≠",
    image: "/Richard.png",
    linkedin: "https://www.linkedin.com/in/richard-rippe-b2aab3273/",
    name: "Richard Rippe",
    role: "3D Artist",
  },
  {
    glyph: "⌁",
    image: "/Roman.png",
    linkedin: "https://www.linkedin.com/in/roman-chacornac-3b0b47193/",
    name: "Roman Chacornac",
    role: "VFX Artist",
  },
  {
    glyph: "±",
    image: "/Maxence.jpg",
    linkedin: "https://www.linkedin.com/in/maxence-rey-millet/",
    name: "Maxence Rey-Millet",
    role: "Environment Artist",
  },
  {
    glyph: "¿",
    image: "/Eva.jpeg",
    linkedin: "https://www.linkedin.com/in/eva-martinez-sanchis/",
    name: "Eva M. Sanchis",
    role: "Environment Technical Artist",
  },
  // {
  //   glyph: "µ",
  //   image: "/mito.jpg",
  //   linkedin: "https://www.linkedin.com/in/mathias-mito-gregersen/",
  //   name: "Mathias Gregersen",
  //   role: "3D Animator & Rigger",
  // },
] as const;

const ADVISORS: readonly Person[] = [
  {
    description:
      "With a strong background in game development and leadership, Søren excels in innovation, player engagement, and fostering creative, community-focused projects such as Deep Rock Galactic.",
    glyph: "©",
    image: "/soeren.jpg",
    name: "Søren Lundgaard",
    role: "CEO @ Ghost Ship Games",
  },
  {
    description:
      "Miguel is a professor at the IT University of Copenhagen and head of the Center for Digital Play. He writes and teaches about the design and culture of playable media.",
    glyph: "ƒ",
    image: "/Miguel.jpeg",
    name: "Miguel Sicart",
    role: "Professor @ ITU · Head of the Center for Digital Play",
  },
  {
    description:
      "Helena is a producer with years of experience and a passion for project management, organization, and creative production across games and student organizations.",
    glyph: "⊗",
    image: "/Helena.jpeg",
    name: "Helena Sokol",
    role: "Director of Members & Organization @ Games Denmark",
  },
  {
    description:
      "Brian focuses on helping people and teams execute their vision, ensuring each project reaches its full potential and creates memorable games.",
    glyph: "¥",
    image: "/brian.jpeg",
    name: "Brian M. Nielsen",
    role: "CEO @ Kaiju Production",
  },
] as const;

type TeamMemberRowProps = {
  member: Person;
  onPointerEnter: (event: PointerEvent<HTMLElement>, member: Person) => void;
  onPointerLeave: () => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
};

function TeamMemberRow({
  member,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
}: TeamMemberRowProps) {
  const rowRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(rowRef, { amount: 0.55, once: true });
  const [nameAnimationKey, setNameAnimationKey] = useState(0);
  const name = (
    <GlyphRollText
      key={`${member.name}-${nameAnimationKey}`}
      active={isInView}
      text={member.name}
    />
  );

  function handlePointerEnter(event: PointerEvent<HTMLElement>) {
    setNameAnimationKey((current) => current + 1);
    onPointerEnter(event, member);
  }

  return (
    <li ref={rowRef} className={styles.row}>
      <span aria-hidden="true" className={styles.glyph}>
        <GlyphRollText active={isInView} text={member.glyph} />
      </span>
      <div className={styles.details}>
        {member.linkedin ? (
          <a
            data-person-preview-trigger
            className={styles.name}
            data-person-name={member.name}
            href={member.linkedin}
            rel="noreferrer"
            target="_blank"
            onFocus={() => setNameAnimationKey((current) => current + 1)}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
          >
            {name}
          </a>
        ) : (
          <span
            data-cursor-interactive
            data-person-preview-trigger
            className={styles.name}
            data-person-name={member.name}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
          >
            {name}
          </span>
        )}
        <span aria-hidden="true" className={styles.separator}>
          {"//"}
        </span>
        <span className={styles.role}>{member.role}</span>
        {member.description && (
          <span className="sr-only">{member.description}</span>
        )}
      </div>
    </li>
  );
}

type PeopleRosterProps = {
  ariaLabel: string;
  inverted?: boolean;
  people: readonly Person[];
};

function PeopleRoster({
  ariaLabel,
  inverted = false,
  people,
}: PeopleRosterProps) {
  const shouldReduceMotion = useReducedMotion();
  const previewRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const x = useSpring(pointerX, { damping: 28, mass: 0.22, stiffness: 380 });
  const y = useSpring(pointerY, { damping: 28, mass: 0.22, stiffness: 380 });
  const [activeMember, setActiveMember] = useState<Person | null>(null);

  useEffect(() => {
    let frame = 0;
    const clearPreview = () => setActiveMember(null);
    const findMemberForTrigger = (trigger: Element | null) => {
      const hoveredName = trigger?.closest<HTMLElement>(
        "[data-person-preview-trigger]",
      )?.dataset.personName;

      return people.find((person) => person.name === hoveredName) ?? null;
    };
    const syncPreviewWithHover = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const hoveredTrigger = document.querySelector<HTMLElement>(
          "[data-person-preview-trigger]:hover",
        );

        setActiveMember(findMemberForTrigger(hoveredTrigger));
      });
    };
    const syncPreviewWithPointer = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") {
        clearPreview();

        return;
      }

      setActiveMember(
        findMemberForTrigger(
          event.target instanceof Element ? event.target : null,
        ),
      );
    };

    window.addEventListener("blur", clearPreview);
    window.addEventListener("pointermove", syncPreviewWithPointer, {
      passive: true,
    });
    window.addEventListener("resize", clearPreview);
    window.addEventListener("scroll", syncPreviewWithHover, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("blur", clearPreview);
      window.removeEventListener("pointermove", syncPreviewWithPointer);
      window.removeEventListener("resize", clearPreview);
      window.removeEventListener("scroll", syncPreviewWithHover);
    };
  }, [people]);

  function updatePreviewPosition(
    event: PointerEvent<HTMLElement>,
    immediate = false,
  ) {
    if (event.pointerType !== "mouse") return;

    const previewWidth = previewRef.current?.offsetWidth ?? 208;
    const previewHeight = previewRef.current?.offsetHeight ?? 208;
    const horizontalOffset = 28;
    const verticalPadding = 16;
    const preferredX = event.clientX + horizontalOffset;
    const nextX =
      preferredX + previewWidth > window.innerWidth - verticalPadding
        ? event.clientX - previewWidth - horizontalOffset
        : preferredX;
    const nextY = Math.min(
      Math.max(event.clientY - previewHeight / 2, verticalPadding),
      window.innerHeight - previewHeight - verticalPadding,
    );

    if (immediate) {
      x.jump(nextX);
      y.jump(nextY);
    }

    pointerX.set(nextX);
    pointerY.set(nextY);
  }

  return (
    <>
      <ul
        aria-label={ariaLabel}
        className={`${styles.roster} ${inverted ? styles.invertedRoster : ""}`}
        onPointerLeave={() => setActiveMember(null)}
      >
        {people.map((member) => (
          <TeamMemberRow
            key={member.name}
            member={member}
            onPointerEnter={(event, hoveredMember) => {
              updatePreviewPosition(event, true);
              setActiveMember(hoveredMember);
            }}
            onPointerLeave={() => setActiveMember(null)}
            onPointerMove={updatePreviewPosition}
          />
        ))}
      </ul>

      {activeMember && (
        <motion.div
          ref={previewRef}
          animate={{ opacity: 1, scale: 1 }}
          aria-hidden="true"
          className={`${styles.preview} ${
            activeMember.description ? styles.advisorPreview : ""
          }`}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
          style={{ x, y }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          <div className={styles.portraitFrame}>
            <Image
              fill
              alt=""
              className={styles.portrait}
              sizes="(max-width: 900px) 10rem, 13rem"
              src={activeMember.image}
            />
          </div>
          {activeMember.description && (
            <div className={styles.descriptionShell}>
              <p className={styles.descriptionCard}>
                {activeMember.description}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}

export function TeamRoster() {
  return <PeopleRoster ariaLabel="Brainglyph team" people={TEAM_MEMBERS} />;
}

export function AdvisorsSection() {
  return (
    <section
      aria-labelledby="advisors-title"
      className={styles.advisorsSection}
    >
      <div aria-hidden="true" className={styles.advisorEdge}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M333.105 104.653L0 40.5698V0H1200V40.5698L924.558 80.477L604.292 40.5698L333.105 104.653Z" />
        </svg>
      </div>
      <div className={styles.advisorIntro}>
        <h2
          className={clsx(title(), "auxMono notBold", styles.advisorHeading)}
          id="advisors-title"
        >
          We&apos;re not alone in this!
        </h2>
        <p className={clsx("text-lg poppins-regular", styles.advisorCopy)}>
          Together with our dynamic community and talented freelancers, we are
          honored to be advised by experts in the games industry.
        </p>
      </div>
      <PeopleRoster
        inverted
        ariaLabel="Brainglyph advisors"
        people={ADVISORS}
      />
    </section>
  );
}
