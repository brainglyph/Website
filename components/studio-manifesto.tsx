"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import styles from "./studio-manifesto.module.css";

import {
  GLYPH_ROLL_DURATION_MS,
  GlyphRollText,
} from "@/components/glyph-roll-text";
import { getRandomGlyph } from "@/lib/glyphs";

const ASTERISK = "asterisk";
const GLYPH_INTERVAL_MS = 340;
const ASTERISK_CHANCE = 0.18;
const PHRASE_HOLD_MS = 2400;
const PHRASES = [
  "you can't stop thinking about",
  "you'll never forget",
  "where knowledge is the deadliest weapon",
  "you’ll want to play one more run of",
  "that hide answers in plain sight",
] as const;

export function StudioManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35, once: true });
  const shouldReduceMotion = useReducedMotion();
  const [glyph, setGlyph] = useState<string>("Ø");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGlyph((currentGlyph) => {
        if (currentGlyph !== ASTERISK && Math.random() < ASTERISK_CHANCE) {
          return ASTERISK;
        }

        return getRandomGlyph(currentGlyph === ASTERISK ? "" : currentGlyph);
      });
    }, GLYPH_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const timeoutId = window.setTimeout(
      () => setPhraseIndex((current) => (current + 1) % PHRASES.length),
      PHRASE_HOLD_MS + (shouldReduceMotion ? 0 : GLYPH_ROLL_DURATION_MS),
    );

    return () => window.clearTimeout(timeoutId);
  }, [isInView, phraseIndex, shouldReduceMotion]);

  return (
    <motion.section
      ref={sectionRef}
      aria-labelledby="studio-manifesto-title"
      className={styles.section}
      layout={shouldReduceMotion ? false : "size"}
      transition={{
        layout: {
          duration: 0.58,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
    >
      <div className={styles.content}>
        <motion.div
          aria-hidden="true"
          className={styles.brainLockup}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ amount: 0.4, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className={styles.brain} />
          <span className={styles.glyphStage}>
            <AnimatePresence initial={false} mode="popLayout">
              {glyph === ASTERISK ? (
                <motion.span
                  key={ASTERISK}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.asterisk}
                  exit={{ opacity: 0, y: -4 }}
                  initial={{ opacity: 0, y: 4 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.06 }}
                />
              ) : (
                <motion.span
                  key={glyph}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.glyph}
                  exit={{ opacity: 0, y: -4 }}
                  initial={{ opacity: 0, y: 4 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.06 }}
                >
                  {glyph}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.h2
          className={styles.heading}
          id="studio-manifesto-title"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.1,
            duration: 0.7,
            ease: [0.23, 1, 0.32, 1],
          }}
          viewport={{ amount: 0.4, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span>At brainglyph, we&apos;re making games</span>
          <span aria-live="polite" className={styles.scrambleLine}>
            <GlyphRollText active={isInView} text={PHRASES[phraseIndex]} />
          </span>
        </motion.h2>
      </div>
    </motion.section>
  );
}
