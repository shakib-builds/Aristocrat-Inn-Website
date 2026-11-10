"use client";

import { motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Props that make a form row/field/button fade up when it scrolls into view.
 * Spread onto a motion element that already carries the field's class, so the
 * form's flex/grid children stay exactly as in the reference markup.
 */
export const fieldReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

/** Error line under a field (hidden while there is no message). */
export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p className="f-error" id={`${id}-error`} hidden={!message}>
      {message}
    </p>
  );
}

/** Exit animation for the <motion.form> when it is swapped for its confirmation. */
export const formExit = { opacity: 0, y: -8, transition: { duration: 0.3, ease: EASE } };

/**
 * Confirmation panel shown after a valid submit (render it inside
 * <AnimatePresence mode="wait"> in place of the form). Fades in and takes focus.
 */
export function SuccessPanel({ id, children }: { id: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <motion.div
      ref={ref}
      className="f-success"
      id={id}
      tabIndex={-1}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
