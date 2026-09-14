import { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

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
  children,
  className,
  icon,
  rel,
  target,
  variant = "ink",
  ...props
}: SignalButtonProps) {
  const safeRel = target === "_blank" ? (rel ?? "noreferrer") : rel;

  return (
    <a
      className={clsx(styles.button, styles[variant], className)}
      rel={safeRel}
      target={target}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      <span aria-hidden="true" className={styles.iconWindow}>
        <span className={styles.iconPrimary}>{icon ?? <ArrowUpRight />}</span>
        <span className={styles.iconEcho}>{icon ?? <ArrowUpRight />}</span>
      </span>
    </a>
  );
}
