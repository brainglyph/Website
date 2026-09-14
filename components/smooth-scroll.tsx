"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      duration: 1.05,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      overscroll: false,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.82,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
