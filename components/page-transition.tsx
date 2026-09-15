"use client";

import { useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

import styles from "./page-transition.module.css";

const COVER_DURATION_MS = 420;
const MINIMUM_COVER_MS = 220;
const REVEAL_DURATION_MS = 460;
const TRANSITION_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

function waitForNextPaint() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

function cancelAnimations(element: HTMLElement) {
  element.getAnimations().forEach((animation) => animation.cancel());
}

function captureCurrentPage(className: string) {
  const source = document.querySelector<HTMLElement>(".site-shell");

  if (!source) return null;

  const sourceBounds = source.getBoundingClientRect();
  const snapshot = document.createElement("div");
  const clone = source.cloneNode(true) as HTMLElement;

  snapshot.className = className;
  snapshot.setAttribute("aria-hidden", "true");
  clone.style.position = "absolute";
  clone.style.top = `${sourceBounds.top}px`;
  clone.style.left = `${sourceBounds.left}px`;
  clone.style.width = `${sourceBounds.width}px`;
  clone.style.margin = "0";
  snapshot.appendChild(clone);
  document.body.appendChild(snapshot);

  return snapshot;
}

async function play(
  element: HTMLElement,
  keyframes: Keyframe[],
  duration: number,
) {
  const animation = element.animate(keyframes, {
    duration,
    easing: TRANSITION_EASE,
    fill: "forwards",
  });

  try {
    await animation.finished;

    return true;
  } catch {
    return false;
  }
}

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const covered = useRef(false);
  const coveredAt = useRef(0);
  const historyCovering = useRef(false);
  const previousPathname = useRef(pathname);
  const routeReady = useRef(false);
  const snapshot = useRef<HTMLDivElement | null>(null);
  const transitioning = useRef(false);

  const reveal = useCallback(async () => {
    const overlay = overlayRef.current;

    if (!overlay) return;

    await Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      waitForNextPaint(),
    ]);
    await wait(
      Math.max(0, MINIMUM_COVER_MS - (performance.now() - coveredAt.current)),
    );

    cancelAnimations(overlay);
    overlay.style.transform = "translate3d(0, 0, 0)";
    const completed = await play(
      overlay,
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: "translate3d(0, -101%, 0)" },
      ],
      REVEAL_DURATION_MS,
    );

    if (!completed) return;

    cancelAnimations(overlay);
    overlay.style.transform = "translate3d(0, 101%, 0)";
    overlay.removeAttribute("data-active");
    covered.current = false;
    historyCovering.current = false;
    routeReady.current = false;
    transitioning.current = false;
  }, []);

  useEffect(() => {
    if (pathname === previousPathname.current) return;

    previousPathname.current = pathname;
    routeReady.current = true;
    if (covered.current) void reveal();
  }, [pathname, reveal]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      const anchor =
        target instanceof Element
          ? target.closest<HTMLAnchorElement>("a[href]")
          : null;

      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);

      if (
        destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname ||
        shouldReduceMotion
      ) {
        return;
      }

      event.preventDefault();
      if (transitioning.current) return;

      const overlay = overlayRef.current;

      if (!overlay) {
        router.push(
          `${destination.pathname}${destination.search}${destination.hash}`,
        );

        return;
      }

      transitioning.current = true;
      cancelAnimations(overlay);
      overlay.style.transform = "translate3d(0, 101%, 0)";
      overlay.setAttribute("data-active", "");

      void play(
        overlay,
        [
          { transform: "translate3d(0, 101%, 0)" },
          { transform: "translate3d(0, 0, 0)" },
        ],
        COVER_DURATION_MS,
      ).then((completed) => {
        if (!completed) return;

        cancelAnimations(overlay);
        overlay.style.transform = "translate3d(0, 0, 0)";
        covered.current = true;
        coveredAt.current = performance.now();
        router.push(
          `${destination.pathname}${destination.search}${destination.hash}`,
        );
      });
    }

    function handlePopState() {
      if (shouldReduceMotion || transitioning.current) return;

      const overlay = overlayRef.current;

      if (!overlay) return;

      transitioning.current = true;
      historyCovering.current = true;
      routeReady.current = false;
      snapshot.current = captureCurrentPage(styles.snapshot);
      cancelAnimations(overlay);
      overlay.setAttribute("data-active", "");
      overlay.style.transform = "translate3d(0, 101%, 0)";

      void play(
        overlay,
        [
          { transform: "translate3d(0, 101%, 0)" },
          { transform: "translate3d(0, 0, 0)" },
        ],
        COVER_DURATION_MS,
      ).then((completed) => {
        snapshot.current?.remove();
        snapshot.current = null;

        if (!completed) return;

        cancelAnimations(overlay);
        overlay.style.transform = "translate3d(0, 0, 0)";
        covered.current = true;
        coveredAt.current = performance.now();
        historyCovering.current = false;

        if (routeReady.current) void reveal();
      });
    }

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      snapshot.current?.remove();
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, shouldReduceMotion]);

  return <div ref={overlayRef} aria-hidden="true" className={styles.overlay} />;
}
