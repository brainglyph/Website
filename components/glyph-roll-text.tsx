"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

import styles from "./glyph-roll-text.module.css";

import { BRAINGLYPH_GLYPHS } from "@/lib/glyphs";

export type GlyphTextSegment = {
  emphasis?: boolean;
  text: string;
};

type GlyphRollTextProps = {
  active?: boolean;
  className?: string;
  segments?: readonly GlyphTextSegment[];
  text?: string;
};

const STANDARD_ROLL_DURATION_MS = 980;
const STANDARD_DURATION_VARIANCE_MS = 120;
const EARLY_ROLL_DURATION_MS = 740;
const EARLY_DURATION_VARIANCE_MS = 120;
const EARLY_RESOLVE_CHANCE = 28;
const SCATTER_PER_CHARACTER_MS = 7;
const MAX_PROGRESSIVE_SCATTER_MS = 320;
const RANDOM_SCATTER_MS = 32;
const MAX_SCATTER_MS = MAX_PROGRESSIVE_SCATTER_MS + RANDOM_SCATTER_MS;
const MAX_ROLL_DURATION_MS =
  STANDARD_ROLL_DURATION_MS + STANDARD_DURATION_VARIANCE_MS;

export const GLYPH_ROLL_DURATION_MS = MAX_ROLL_DURATION_MS + MAX_SCATTER_MS;

function hashText(value: string) {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function buildGlyphReel(seed: number, glyphCount: number) {
  const glyphs: string[] = [];
  let cursor = seed;

  while (glyphs.length < glyphCount) {
    cursor =
      (Math.imul(cursor ^ (cursor >>> 15), 2246822519) + 3266489917) >>> 0;
    const glyph = BRAINGLYPH_GLYPHS[cursor % BRAINGLYPH_GLYPHS.length];

    if (glyph !== glyphs[glyphs.length - 1]) glyphs.push(glyph);
  }

  return glyphs;
}

export function GlyphRollText({
  active = true,
  className,
  segments,
  text = "",
}: GlyphRollTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const resolvedSegments = useMemo(
    () => segments ?? [{ text }],
    [segments, text],
  );
  const contentKey = resolvedSegments
    .map(
      ({ emphasis, text: segmentText }) =>
        `${emphasis ? "1" : "0"}:${segmentText}`,
    )
    .join("|");
  const accessibleText = resolvedSegments
    .map(({ text: segmentText }) => segmentText)
    .join("");
  const baseSeed = hashText(contentKey);
  let characterIndex = 0;

  return (
    <span aria-label={accessibleText} className={className}>
      <span key={contentKey} aria-hidden="true" className={styles.line}>
        {resolvedSegments.map((segment, segmentIndex) =>
          segment.text.split(/(\s+)/).map((word, wordIndex) => {
            if (/^\s+$/.test(word)) {
              characterIndex += word.length;

              return (
                <span
                  key={`${segmentIndex}-${wordIndex}-space`}
                  className={styles.space}
                >
                  {word}
                </span>
              );
            }

            return (
              <span
                key={`${segmentIndex}-${wordIndex}`}
                className={styles.word}
              >
                {Array.from(word).map((character) => {
                  const index = characterIndex++;
                  const characterSeed = (baseSeed + index * 2654435761) >>> 0;
                  const resolvesEarly =
                    (characterSeed >>> 7) % 100 < EARLY_RESOLVE_CHANCE;
                  const glyphCount = resolvesEarly
                    ? 5 + (characterSeed % 2)
                    : 8 + (characterSeed % 2);
                  const reelGlyphs = buildGlyphReel(characterSeed, glyphCount);
                  const progressiveDelay = Math.min(
                    index * SCATTER_PER_CHARACTER_MS,
                    MAX_PROGRESSIVE_SCATTER_MS,
                  );
                  const randomDelay =
                    (characterSeed >>> 13) % RANDOM_SCATTER_MS;
                  const delay = (progressiveDelay + randomDelay) / 1000;
                  const duration = resolvesEarly
                    ? EARLY_ROLL_DURATION_MS +
                      ((characterSeed >>> 17) % EARLY_DURATION_VARIANCE_MS)
                    : STANDARD_ROLL_DURATION_MS +
                      ((characterSeed >>> 17) % STANDARD_DURATION_VARIANCE_MS);
                  const characterClass = `${styles.reelCharacter} ${
                    segment.emphasis ? styles.emphasis : ""
                  }`;

                  return (
                    <span key={index} className={styles.cell}>
                      <span
                        className={`${styles.measure} ${
                          segment.emphasis ? styles.emphasis : ""
                        }`}
                      >
                        {character}
                      </span>
                      <span className={styles.viewport}>
                        <span className={styles.reelCenter}>
                          <motion.span
                            animate={
                              active || shouldReduceMotion
                                ? {
                                    opacity: 1,
                                    y: `-${reelGlyphs.length}lh`,
                                  }
                                : { opacity: 0, y: "0.22lh" }
                            }
                            className={styles.reel}
                            initial={
                              active && !shouldReduceMotion
                                ? { opacity: 0, y: "0.22lh" }
                                : false
                            }
                            transition={{
                              delay: shouldReduceMotion ? 0 : delay,
                              duration: shouldReduceMotion
                                ? 0
                                : duration / 1000,
                              ease: [0.2, 0.82, 0.25, 1],
                            }}
                          >
                            {reelGlyphs.map((glyph, glyphIndex) => (
                              <span
                                key={`${glyphIndex}-${glyph}`}
                                className={characterClass}
                              >
                                {glyph}
                              </span>
                            ))}
                            <span className={characterClass}>{character}</span>
                          </motion.span>
                        </span>
                      </span>
                    </span>
                  );
                })}
              </span>
            );
          }),
        )}
      </span>
    </span>
  );
}
