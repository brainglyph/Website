"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import styles from "./sequence.module.css";

import {
  hasSiteIntroFinished,
  SITE_INTRO_REVEAL_EVENT,
} from "@/components/site-intro";

const GLYPH_SEQUENCE = ["☐", "C", "D", "H", "I", "J", "3", "4"] as const;
const GLYPH_HOLD_MS = 500;
const ASTERISK_HOLD_MS = 2000;

export default function SequencePage() {
  const shouldReduceMotion = useReducedMotion();
  const [glyphIndex, setGlyphIndex] = useState(0);
  const [isActive, setIsActive] = useState(() => hasSiteIntroFinished());
  const [showAsterisk, setShowAsterisk] = useState(false);

  useEffect(() => {
    if (isActive) return;

    const beginSequence = () => setIsActive(true);

    window.addEventListener(SITE_INTRO_REVEAL_EVENT, beginSequence, {
      once: true,
    });

    return () =>
      window.removeEventListener(SITE_INTRO_REVEAL_EVENT, beginSequence);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const timeoutId = window.setTimeout(
      () => {
        if (showAsterisk) {
          setShowAsterisk(false);
          setGlyphIndex(0);

          return;
        }

        if (glyphIndex === GLYPH_SEQUENCE.length - 1) {
          setShowAsterisk(true);

          return;
        }

        setGlyphIndex((currentIndex) => currentIndex + 1);
      },
      showAsterisk ? ASTERISK_HOLD_MS : GLYPH_HOLD_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [glyphIndex, isActive, showAsterisk]);

  const currentGlyph = GLYPH_SEQUENCE[glyphIndex];

  return (
    <section aria-label="Glyph sequence" className={styles.page}>
      <span className={styles.clue}>Knowledge comes to those who seek it.</span>

      <div aria-live="polite" className={styles.brainLockup}>
        <span aria-hidden="true" className={styles.brain} />
        <span className={styles.glyphStage}>
          <AnimatePresence initial={false} mode="popLayout">
            {showAsterisk ? (
              <motion.span
                key="asterisk"
                animate={{ opacity: 1, y: 0 }}
                aria-label="Asterisk"
                className={styles.asterisk}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.08,
                  ease: [0.2, 0.82, 0.25, 1],
                }}
              />
            ) : (
              <motion.span
                key={`${glyphIndex}-${currentGlyph}`}
                animate={{ opacity: 1, y: 0 }}
                className={styles.glyph}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.08,
                  ease: [0.2, 0.82, 0.25, 1],
                }}
              >
                {currentGlyph}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
    </section>
  );
}
