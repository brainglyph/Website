"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { BRAINGLYPH_GLYPHS, getRandomGlyph } from "@/lib/glyphs";

import styles from "./site-intro.module.css";

const MINIMUM_DISPLAY_MS = 1500;
const MARK_HOLD_MS = 320;
const GLYPH_INTERVAL_MS = 120;
let hasPlayedIntro = false;
let hasFinishedIntro = false;

export const SITE_INTRO_REVEAL_EVENT = "brainglyph:intro-reveal";

export function hasSiteIntroPlayed() {
  return hasPlayedIntro;
}

export function hasSiteIntroFinished() {
  return hasFinishedIntro;
}

export function SiteIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => !hasPlayedIntro);
  const [showMark, setShowMark] = useState(false);
  const [glyph, setGlyph] = useState<string>(BRAINGLYPH_GLYPHS[0]);
  const timeoutIds = useRef<number[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    hasPlayedIntro = true;
    const previousOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    setGlyph(getRandomGlyph());

    const glyphInterval = window.setInterval(() => {
      setGlyph((currentGlyph) => getRandomGlyph(currentGlyph));
    }, GLYPH_INTERVAL_MS);

    const minimumDisplay = new Promise<void>((resolve) => {
      const timeoutId = window.setTimeout(resolve, MINIMUM_DISPLAY_MS);

      timeoutIds.current.push(timeoutId);
    });
    const pageReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    void Promise.all([minimumDisplay, pageReady, fontsReady]).then(() => {
      window.clearInterval(glyphInterval);
      setShowMark(true);

      const timeoutId = window.setTimeout(() => {
        hasFinishedIntro = true;
        window.dispatchEvent(new Event(SITE_INTRO_REVEAL_EVENT));
        setIsVisible(false);
      }, MARK_HOLD_MS);

      timeoutIds.current.push(timeoutId);
    });

    return () => {
      window.clearInterval(glyphInterval);
      timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="site-intro"
          aria-label="Loading brainglyph"
          className={styles.overlay}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  y: "-100%",
                  transition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] },
                }
          }
          role="status"
        >
          <div aria-hidden="true" className={styles.glyphStage}>
            {showMark ? (
              <motion.div
                key="mark"
                animate={{ opacity: 1, y: 0 }}
                className={styles.mark}
                initial={{ opacity: 0, y: 8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.05 }}
              >
                <Image
                  priority
                  alt=""
                  height={179}
                  src="/astBlack.svg"
                  width={179}
                />
              </motion.div>
            ) : (
              <motion.span
                key={glyph}
                animate={{ opacity: 1, y: 0 }}
                className={styles.glyph}
                initial={{ opacity: 0, y: 5 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.04 }}
              >
                {glyph}
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
