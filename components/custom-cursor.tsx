"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { BRAINGLYPH_GLYPHS, getRandomGlyph } from "@/lib/glyphs";

import styles from "./custom-cursor.module.css";

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
  const animationFrame = useRef<number>();
  const angularVelocity = useRef(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hasAppeared = useRef(false);
  const hasResetRotation = useRef(false);
  const lastPointer = useRef<{ time: number; x: number; y: number }>();
  const rotation = useRef(0);
  const standstillStartedAt = useRef<number>();
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [glyph, setGlyph] = useState<string>(BRAINGLYPH_GLYPHS[0]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointer.matches) return;

    document.documentElement.classList.add("has-custom-cursor");
    let previousFrameTime = performance.now();

    function resetRotation(cursor: HTMLDivElement) {
      const nearestAngle = ((rotation.current + 540) % 360) - 180;

      rotation.current = nearestAngle;
      cursor.style.setProperty("--cursor-rotation", `${nearestAngle}deg`);
      void cursor.offsetWidth;
      cursor.setAttribute("data-idle", "");
      rotation.current = 0;
      cursor.style.setProperty("--cursor-rotation", "0deg");
      hasResetRotation.current = true;
    }

    function animateRotation(now: number) {
      const cursor = cursorRef.current;
      const elapsedSeconds = Math.min(
        Math.max((now - previousFrameTime) / 1000, 0),
        0.05,
      );

      previousFrameTime = now;

      if (cursor && hasAppeared.current && !shouldReduceMotion) {
        if (angularVelocity.current > 4) {
          rotation.current += angularVelocity.current * elapsedSeconds;
          angularVelocity.current *= Math.exp(-2.35 * elapsedSeconds);
          cursor.style.setProperty(
            "--cursor-rotation",
            `${rotation.current}deg`,
          );
          standstillStartedAt.current = undefined;
        } else {
          angularVelocity.current = 0;
          standstillStartedAt.current ??= now;

          if (
            !hasResetRotation.current &&
            now - standstillStartedAt.current >= 500
          ) {
            resetRotation(cursor);
          }
        }
      }

      animationFrame.current = window.requestAnimationFrame(animateRotation);
    }

    animationFrame.current = window.requestAnimationFrame(animateRotation);

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

        if (distance > 0.2) {
          cursor.removeAttribute("data-idle");
          hasResetRotation.current = false;
          standstillStartedAt.current = undefined;
          angularVelocity.current = Math.max(
            angularVelocity.current,
            Math.min(velocity * 480, 900),
          );
        }
      }

      lastPointer.current = {
        time: now,
        x: event.clientX,
        y: event.clientY,
      };

      const target = event.target;

      setIsInteractive(
        target instanceof Element &&
          Boolean(target.closest(INTERACTIVE_SELECTOR)),
      );
    }

    function hideCursor() {
      const cursor = cursorRef.current;

      hasAppeared.current = false;
      angularVelocity.current = 0;
      hasResetRotation.current = false;
      lastPointer.current = undefined;
      rotation.current = 0;
      standstillStartedAt.current = undefined;
      cursor?.removeAttribute("data-idle");
      cursor?.style.setProperty("--cursor-rotation", "0deg");
      setIsVisible(false);
      setIsInteractive(false);
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.cancelAnimationFrame(animationFrame.current ?? 0);
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
