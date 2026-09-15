"use client";

import {
  type AnchorHTMLAttributes,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { GlyphRollText } from "@/components/glyph-roll-text";
import { HoverGlyphLabel } from "@/components/hover-glyph-label";

import styles from "./press-popover.module.css";

const PANEL_MAX_WIDTH = 316;
const PANEL_GUTTER = 12;

type PanelPosition = CSSProperties & {
  "--panel-anchor": string;
  left: number;
  top: number;
  width: number;
};

type ResourceLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  meta: ReactNode;
  metaAriaLabel?: string;
  metaIsIcon?: boolean;
};

export function ResourceLink({
  label,
  meta,
  metaAriaLabel,
  metaIsIcon = false,
  ...props
}: ResourceLinkProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  function startAnimation() {
    setAnimationKey((current) => current + 1);
    setIsAnimated(true);
  }

  return (
    <a
      {...props}
      aria-label={metaAriaLabel ? `${label}, ${metaAriaLabel}` : label}
      className={styles.resource}
      onBlur={() => setIsAnimated(false)}
      onFocus={startAnimation}
      onPointerEnter={startAnimation}
      onPointerLeave={() => setIsAnimated(false)}
    >
      <span aria-hidden="true" className={styles.resourceLabel}>
        {isAnimated ? (
          <GlyphRollText key={`label-${animationKey}`} text={label} />
        ) : (
          label
        )}
      </span>
      <span
        aria-hidden="true"
        className={`${styles.meta} ${metaIsIcon ? styles.iconMeta : ""}`}
      >
        {meta}
      </span>
    </a>
  );
}

type NavPopoverProps = {
  children: ReactNode;
  id: string;
  label: string;
  panelClassName?: string;
  panelLabel: string;
};

export function NavPopover({
  children,
  id,
  label,
  panelClassName,
  panelLabel,
}: NavPopoverProps) {
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PanelPosition>({
    "--panel-anchor": "50%",
    left: PANEL_GUTTER,
    top: 0,
    width: PANEL_MAX_WIDTH,
  });

  useEffect(() => setIsMounted(true), []);

  function updatePosition() {
    const bounds = triggerRef.current?.getBoundingClientRect();

    if (!bounds) return;

    const width = Math.min(
      PANEL_MAX_WIDTH,
      window.innerWidth - 2 * PANEL_GUTTER,
    );
    const idealLeft = bounds.left + bounds.width / 2 - width / 2;
    const left = Math.max(
      PANEL_GUTTER,
      Math.min(idealLeft, window.innerWidth - width - PANEL_GUTTER),
    );
    const anchor = ((bounds.left + bounds.width / 2 - left) / width) * 100;

    setPosition({
      "--panel-anchor": `${Math.max(14, Math.min(86, anchor))}%`,
      left,
      top: bounds.bottom + 15,
      width,
    });
  }

  useEffect(() => {
    if (!isOpen) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        !triggerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      triggerRef.current?.focus();
    }

    window.addEventListener("resize", updatePosition);
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        aria-controls={id}
        aria-expanded={isOpen}
        className={`${styles.navAction} ${styles.trigger}`}
        type="button"
        onClick={() => {
          updatePosition();
          setIsOpen((current) => !current);
        }}
        onKeyDown={(event) => {
          if (!isOpen || event.key !== "Tab" || event.shiftKey) return;

          event.preventDefault();
          panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
        }}
      >
        <HoverGlyphLabel text={label} />
      </button>
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.aside
                ref={panelRef}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                aria-label={panelLabel}
                className={`${styles.panel} ${panelClassName ?? ""}`}
                exit={{ opacity: 0, scale: 0.97, y: -8 }}
                id={id}
                initial={{ opacity: 0, scale: 0.96, y: -10 }}
                style={position}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.32,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div className={styles.content}>{children}</div>
              </motion.aside>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

export function PressPopover() {
  return (
    <NavPopover id="press-resources" label="Press" panelLabel="Press resources">
      <ResourceLink
        download
        href="/files/Brainglyph_PressKit.zip"
        label="Download media kit"
        meta="27MB"
        metaAriaLabel="27 megabytes"
      />
      <ResourceLink
        href="mailto:hello@brainglyph.com"
        label="Send us a mail"
        meta="~"
      />
    </NavPopover>
  );
}
