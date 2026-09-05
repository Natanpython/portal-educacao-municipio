"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  direction?: "left" | "right" | "up";
};

export default function ScrollReveal({ children, direction = "up" }: ScrollRevealProps) {
  const reduzirMovimento = useReducedMotion();
  const deslocamento = direction === "left" ? -54 : direction === "right" ? 54 : 0;

  if (reduzirMovimento) return <>{children}</>;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: deslocamento,
        y: direction === "up" ? 64 : 28,
        scale: 0.975,
        clipPath: "inset(7% 0 7% 0 round 28px)",
        filter: "blur(5px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clipPath: "inset(0% 0 0% 0 round 0px)",
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-full overflow-hidden"
    >
      {children}
      <motion.span
        aria-hidden="true"
        initial={{ left: "-25%", opacity: 0 }}
        whileInView={{ left: "115%", opacity: [0, 0.75, 0] }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 1.15, delay: 0.12, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 z-50 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-sm"
      />
    </motion.div>
  );
}
