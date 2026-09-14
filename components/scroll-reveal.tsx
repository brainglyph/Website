"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

type ScrollRevealProps = ComponentPropsWithoutRef<typeof motion.div> & {
  delay?: number;
};

export function ScrollReveal({
  children,
  delay = 0,
  transition,
  ...props
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
        ...transition,
      }}
      viewport={{ amount: 0.12, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
