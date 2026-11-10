"use client";

/**
 * Animation building blocks (Motion for React).
 * Every effect respects the visitor's "reduce motion" setting via
 * <MotionProvider> (MotionConfig reducedMotion="user").
 */

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

const EASE = [0.22, 1, 0.36, 1] as const; // soft "ease-out-quint"
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type Tag = "div" | "section" | "article" | "li" | "ul" | "p" | "span" | "figure" | "header";

/* ------------------------------------------------------------------ */
/* Reveal: fade + slide up when scrolled into view                     */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  duration = 0.8,
  className,
  style,
  id,
}: {
  children: ReactNode;
  as?: Tag;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  const Comp = motion[as];
  return (
    <Comp
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger: children appear one after another                           */
/* ------------------------------------------------------------------ */
const groupVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Stagger({
  children,
  as = "div",
  stagger = 0.09,
  className,
  style,
}: {
  children: ReactNode;
  as?: Tag;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      style={style}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
  style,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} style={style} variants={itemVariants}>
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* RevealText: headline words rise in one by one                        */
/* Keeps inner elements (e.g. <span className="it">) intact.            */
/* ------------------------------------------------------------------ */
const wordVariants: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

function splitWords(node: ReactNode, keyPrefix = "w"): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, i) =>
      /^\s+$/.test(part) || part === "" ? (
        part
      ) : (
        <span key={`${keyPrefix}-${i}`} className="word-mask">
          <motion.span className="word" variants={wordVariants}>
            {part}
          </motion.span>
        </span>
      ),
    );
  }
  if (Array.isArray(node)) return node.map((n, i) => splitWords(n, `${keyPrefix}-${i}`));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    // Keep a stable key: elements inside arrays (mixed text + elements) need one.
    return cloneElement(
      el,
      { key: el.key ?? keyPrefix } as Partial<{ children?: ReactNode }>,
      splitWords(el.props.children, `${keyPrefix}-c`),
    );
  }
  return node;
}

export function RevealText({
  children,
  as = "h2",
  className,
  style,
  delay = 0,
  stagger = 0.06,
  onLoad = false,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  /** Animate immediately (for the first screen) instead of on scroll. */
  onLoad?: boolean;
}) {
  const Comp = motion[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const trigger = onLoad
    ? { animate: "show" }
    : { whileInView: "show", viewport: VIEWPORT };
  return (
    <Comp className={className} style={style} variants={variants} initial="hidden" {...trigger}>
      {Children.map(children, (c, i) => splitWords(c, `t${i}`))}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* ImageReveal: photo unveils from the bottom with a gentle zoom-out     */
/* ------------------------------------------------------------------ */
export function ImageReveal({
  children,
  className,
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{ ...style, overflow: "hidden" }}
      initial={{ clipPath: "inset(12% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0 }}
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.6, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax: content drifts slower than the page while scrolling         */
/* Wrap a position:absolute background layer with it.                   */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  style,
  distance = 80,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Total pixels of drift across the element's time on screen. */
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* CountUp: numbers count up when they come into view                    */
/* "4.7 km" → counts 0→4.7 and keeps " km"; "24/7" stays as-is.          */
/* ------------------------------------------------------------------ */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const reduce = useReducedMotion();
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const countable = match && !value.includes("/");
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!countable || !inView || reduce || !match) return;
    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setText(`${v.toFixed(decimals)}${match[2]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* HoverLift: small lift on hover for cards                             */
/* ------------------------------------------------------------------ */
export function HoverLift({
  children,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: Tag;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      style={style}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {children}
    </Comp>
  );
}
