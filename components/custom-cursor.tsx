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
  const idleTimeout = useRef<number>();
  const lastPointer = useRef<{ time: number; x: number; y: number }>();
  const rotation = useRef(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [glyph, setGlyph] = useState<string>(BRAINGLYPH_GLYPHS[0]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointer.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;

      const cursor = cursorRef.current;

      if (!hasAppeared.current) {
        hasAppeared.current = true;
        setIsVisible(true);
      }

      cursor?.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor?.style.setProperty("--cursor-y", `${event.clientY}px`);

      const previousPointer = lastPointer.current;
      const now = performance.now();

      if (cursor && previousPointer && !shouldReduceMotion) {
        const distance = Math.hypot(
          event.clientX - previousPointer.x,
          event.clientY - previousPointer.y,
        );
        const elapsed = Math.max(now - previousPointer.time, 8);
        const velocity = distance / elapsed;
        const degreesPerPixel = 0.35 + Math.min(velocity, 2.5) * 0.16;

        if (distance > 0.2) {
          cursor.removeAttribute("data-idle");
          rotation.current += distance * degreesPerPixel;
          cursor.style.setProperty(
            "--cursor-rotation",
            `${rotation.current}deg`,
          );
        }
      }

      lastPointer.current = {
        time: now,
        x: event.clientX,
        y: event.clientY,
      };

      window.clearTimeout(idleTimeout.current);
      idleTimeout.current = window.setTimeout(() => {
        if (!cursor || shouldReduceMotion) return;

        const nearestAngle = ((rotation.current + 540) % 360) - 180;

        rotation.current = nearestAngle;
        cursor.style.setProperty("--cursor-rotation", `${nearestAngle}deg`);
        void cursor.offsetWidth;
        cursor.setAttribute("data-idle", "");
        rotation.current = 0;
        cursor.style.setProperty("--cursor-rotation", "0deg");
      }, 1000);

      const target = event.target;

      setIsInteractive(
        target instanceof Element &&
          Boolean(target.closest(INTERACTIVE_SELECTOR)),
      );
    }

    function hideCursor() {
      window.clearTimeout(idleTimeout.current);
      hasAppeared.current = false;
      lastPointer.current = undefined;
      setIsVisible(false);
      setIsInteractive(false);
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.clearTimeout(idleTimeout.current);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
    };
  }, [shouldReduceMotion]);

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
        <span className={styles.face}>
          <span className={styles.rotor}>
            <span className={styles.asterisk} />
          </span>
          <span className={styles.glyph}>{glyph}</span>
        </span>
      </div>
    </div>
  );
}
