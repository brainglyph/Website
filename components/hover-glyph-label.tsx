"use client";

import { useState } from "react";

import { GlyphRollText } from "@/components/glyph-roll-text";

type HoverGlyphLabelProps = {
  text: string;
};

export function HoverGlyphLabel({ text }: HoverGlyphLabelProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  return (
    <span
      onPointerEnter={() => {
        setAnimationKey((current) => current + 1);
        setIsAnimated(true);
      }}
      onPointerLeave={() => setIsAnimated(false)}
    >
      {isAnimated ? <GlyphRollText key={animationKey} text={text} /> : text}
    </span>
  );
}
