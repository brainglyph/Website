"use client";

import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import clsx from "clsx";

import { GlyphRollText } from "@/components/glyph-roll-text";

import styles from "./signal-button.module.css";

type SignalButtonProps = ComponentPropsWithoutRef<"a"> & {
  icon?: ReactNode;
  variant?: "ink" | "signal";
};

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export function SignalButton({
  "aria-label": ariaLabel,
  children,
  className,
  icon,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  rel,
  target,
  variant = "ink",
  ...props
}: SignalButtonProps) {
  const [isLabelAnimated, setIsLabelAnimated] = useState(false);
  const [labelAnimationKey, setLabelAnimationKey] = useState(0);
  const safeRel = target === "_blank" ? (rel ?? "noreferrer") : rel;
  const label = typeof children === "string" ? children : null;

  function startLabelAnimation() {
    if (!label) return;

    setLabelAnimationKey((current) => current + 1);
    setIsLabelAnimated(true);
  }

  return (
    <a
      aria-label={ariaLabel ?? label ?? undefined}
      className={clsx(styles.button, styles[variant], className)}
      rel={safeRel}
      target={target}
      {...props}
      onBlur={(event) => {
        setIsLabelAnimated(false);
        onBlur?.(event);
      }}
      onFocus={(event) => {
        startLabelAnimation();
        onFocus?.(event);
      }}
      onPointerEnter={(event) => {
        startLabelAnimation();
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        setIsLabelAnimated(false);
        onPointerLeave?.(event);
      }}
    >
      <span aria-hidden={label ? "true" : undefined} className={styles.label}>
        {label && isLabelAnimated ? (
          <GlyphRollText key={labelAnimationKey} text={label} />
        ) : (
          children
        )}
      </span>
      <span aria-hidden="true" className={styles.iconWindow}>
        <span className={styles.iconPrimary}>{icon ?? <ArrowUpRight />}</span>
        <span className={styles.iconEcho}>{icon ?? <ArrowUpRight />}</span>
      </span>
    </a>
  );
}
