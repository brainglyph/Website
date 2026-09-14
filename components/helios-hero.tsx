"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import styles from "./helios-hero.module.css";

import { SignalButton } from "@/components/signal-button";
import { GlyphRollText } from "@/components/glyph-roll-text";
import {
  hasSiteIntroPlayed,
  SITE_INTRO_REVEAL_EVENT,
} from "@/components/site-intro";

const MAGNETIC_PADDING = 75;
const MAGNETIC_STRENGTH = 10;
const MAX_OFFSET_X = 36;
const MAX_OFFSET_Y = 28;
const STEAM_WISHLIST_URL =
  "https://store.steampowered.com/search/?term=Heli.os";

export function HeliosHero() {
  const logoHitbox = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(hasSiteIntroPlayed);
  const logoX = useMotionValue(0);
  const logoY = useMotionValue(0);
  const springX = useSpring(logoX, { damping: 22, stiffness: 180, mass: 0.45 });
  const springY = useSpring(logoY, {
    damping: 22,
    stiffness: 180,
    mass: 0.45,
  });

  useEffect(() => {
    const revealHero = () => setHasEntered(true);

    window.addEventListener(SITE_INTRO_REVEAL_EVENT, revealHero);

    return () =>
      window.removeEventListener(SITE_INTRO_REVEAL_EVENT, revealHero);
  }, []);

  function resetLogo() {
    setIsLogoHovered(false);
    logoX.set(0);
    logoY.set(0);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const bounds = logoHitbox.current?.getBoundingClientRect();

    if (!bounds) return;

    const isInside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (isInside) {
      setIsLogoHovered(true);
    } else {
      setIsLogoHovered(false);
    }

    const distanceX = Math.max(
      bounds.left - event.clientX,
      0,
      event.clientX - bounds.right,
    );
    const distanceY = Math.max(
      bounds.top - event.clientY,
      0,
      event.clientY - bounds.bottom,
    );
    const distanceFromEdge = Math.hypot(distanceX, distanceY);

    if (distanceFromEdge > MAGNETIC_PADDING) {
      logoX.set(0);
      logoY.set(0);

      return;
    }

    const deltaX = event.clientX - (bounds.left + bounds.width / 2);
    const deltaY = event.clientY - (bounds.top + bounds.height / 2);
    const proximity = 1 - distanceFromEdge / MAGNETIC_PADDING;

    logoX.set(
      Math.max(
        -MAX_OFFSET_X,
        Math.min(MAX_OFFSET_X, (deltaX / MAGNETIC_STRENGTH) * proximity),
      ),
    );
    logoY.set(
      Math.max(
        -MAX_OFFSET_Y,
        Math.min(MAX_OFFSET_Y, (deltaY / MAGNETIC_STRENGTH) * proximity),
      ),
    );
  }

  return (
    <section
      aria-labelledby="helios-title"
      className={styles.hero}
      onPointerLeave={resetLogo}
      onPointerMove={handlePointerMove}
    >
      <motion.div
        animate={{ scale: isLogoHovered && !prefersReducedMotion ? 1 : 1.055 }}
        aria-hidden="true"
        className={styles.backdropWrap}
        transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
      >
        <Image
          fill
          priority
          alt=""
          className={styles.backdrop}
          sizes="110vw"
          src="/fakeScreen.webp"
        />
      </motion.div>
      <motion.div
        animate={{ opacity: isLogoHovered ? 0.57 : 0.46 }}
        aria-hidden="true"
        className={styles.veil}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      />
      <div className={styles.content}>
        <motion.div
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          className={styles.logoReveal}
          initial={false}
          transition={{ duration: 0.68, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1
            ref={logoHitbox}
            aria-label="Heli.os"
            className={styles.logoHitbox}
            id="helios-title"
          >
            <a
              aria-label="Wishlist Heli.os on Steam"
              className={styles.logoLink}
              href={STEAM_WISHLIST_URL}
              rel="noreferrer"
              target="_blank"
            >
              <span className="sr-only">Heli.os</span>
              <motion.div
                animate={{
                  scale: isLogoHovered && !prefersReducedMotion ? 1.055 : 1,
                }}
                className={styles.logoMotion}
                data-hovered={isLogoHovered || undefined}
                style={{ x: springX, y: springY }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              >
                <Image
                  priority
                  alt=""
                  className={styles.logo}
                  height={1024}
                  sizes="(max-width: 768px) 92vw, 928px"
                  src="/heliosLogo.png"
                  width={2000}
                />
              </motion.div>
            </a>
          </h1>
        </motion.div>
        <p className={styles.description}>
          <GlyphRollText
            active={hasEntered}
            segments={[
              { emphasis: true, text: "Tinker" },
              { text: " with " },
              { emphasis: true, text: "forgotten devices" },
            ]}
          />
          <br />
          <GlyphRollText
            active={hasEntered}
            segments={[
              { text: "to " },
              { emphasis: true, text: "destroy" },
              { text: " deadly robots and " },
              { emphasis: true, text: "repair" },
              { text: " broken communities" },
            ]}
          />
        </p>
      </div>
      <motion.div
        animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        className={styles.wishlistReveal}
        initial={false}
        transition={{
          delay: prefersReducedMotion ? 0 : 0.42,
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <SignalButton
          className={styles.wishlist}
          href={STEAM_WISHLIST_URL}
          icon={<span className={styles.steamIcon} />}
          target="_blank"
          variant="ink"
        >
          Wishlist on Steam
        </SignalButton>
      </motion.div>

      <div aria-hidden="true" className={styles.edge} />
    </section>
  );
}
