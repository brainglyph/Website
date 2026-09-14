"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import styles from "./custom-cursor.module.css";

import { BRAINGLYPH_GLYPHS, getRandomGlyph } from "@/lib/glyphs";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "[role='button']",
  "[data-cursor-interactive]",
].join(",");

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const hasAppeared = useRef(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [glyph, setGlyph] = useState<string>(BRAINGLYPH_GLYPHS[0]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointer.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;

      if (!hasAppeared.current) {
        hasAppeared.current = true;
        setIsVisible(true);
      }

      cursorRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);

      const target = event.target;

      setIsInteractive(
        target instanceof Element &&
          Boolean(target.closest(INTERACTIVE_SELECTOR)),
      );
    }

    function hideCursor() {
      hasAppeared.current = false;
      setIsVisible(false);
      setIsInteractive(false);
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  useEffect(() => {
    if (!isInteractive || shouldReduceMotion) return;

    setGlyph(getRandomGlyph());
    const interval = window.setInterval(() => {
      setGlyph((currentGlyph) => getRandomGlyph(currentGlyph));
    }, 140);

    return () => window.clearInterval(interval);
  }, [isInteractive, shouldReduceMotion]);

  return (
    <div
      aria-hidden="true"
      className={styles.cursorLayer}
      data-visible={isVisible || undefined}
    >
      <div
        ref={cursorRef}
        className={styles.cursor}
        data-interactive={isInteractive || undefined}
      >
        <span className={styles.asterisk} />
        <span className={styles.glyph}>{glyph}</span>
      </div>
    </div>
  );
}
