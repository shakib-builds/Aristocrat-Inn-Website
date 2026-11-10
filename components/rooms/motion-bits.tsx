"use client";

/**
 * Small additions to components/motion.tsx for elements its building blocks
 * don't cover (tables, description lists, nav, aside). Same easing/viewport
 * and the same "hidden"/"show" variant names, so <StaggerItem> children work
 * inside <StaggerGroup>.
 */

import { motion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type GroupTag = "dl" | "table" | "tbody" | "ul" | "div";

/** Stagger container for tags <Stagger> doesn't support (dl, table…). */
export function StaggerGroup({
  children,
  as = "div",
  stagger = 0.08,
  className,
}: {
  children: ReactNode;
  as?: GroupTag;
  stagger?: number;
  className?: string;
}) {
  const Comp = motion[as];
  const variants: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger } } };
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  );
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Table row that fades/slides in as part of a <StaggerGroup>. */
export function StaggerRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.tr className={className} variants={rowVariants}>
      {children}
    </motion.tr>
  );
}

/** Opacity-only fade (no transform — safe for sticky elements and their parents). */
export function Fade({
  children,
  as = "div",
  delay = 0,
  className,
  style,
  ...rest
}: {
  children: ReactNode;
  as?: "div" | "aside" | "nav";
  delay?: number;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
