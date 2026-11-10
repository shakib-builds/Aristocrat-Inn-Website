"use client";

/**
 * Home-only motion helpers.
 * - FadeIn: fade + rise, either on load (first screen) or when scrolled into
 *   view; supports tags Reveal doesn't (a, ul, form) and passes link props.
 */

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type FadeTag = "div" | "ul" | "a" | "p";

export function FadeIn({
  children,
  as = "div",
  delay = 0,
  y = 20,
  duration = 0.9,
  onLoad = false,
  className,
  style,
  href,
  target,
  rel,
}: {
  children: ReactNode;
  as?: FadeTag;
  delay?: number;
  y?: number;
  duration?: number;
  /** Animate immediately (first screen) instead of on scroll. */
  onLoad?: boolean;
  className?: string;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
}) {
  const Comp = motion[as] as typeof motion.a;
  const trigger = onLoad
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT };
  return (
    <Comp
      className={className}
      style={style}
      href={href}
      target={target}
      rel={rel}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
