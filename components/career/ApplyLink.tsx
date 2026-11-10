"use client";

/**
 * "Apply" on a job row (port of reference/js/career.js): jumps to the
 * application form with that position selected and focuses the name field.
 */

import type { MouseEvent } from "react";

export const APPLY_EVENT = "career:apply";

export default function ApplyLink({ position }: { position: string }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const section = document.getElementById("apply");
    if (!section) return;
    e.preventDefault();
    // CareerForm selects the position (and reports whether the form is still shown).
    const detail = { position, formShown: false };
    window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail }));
    if (!detail.formShown) return section.scrollIntoView();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(history.state, "", "#apply");
    document.getElementById("k-name")?.focus({ preventScroll: true });
  };

  return (
    <a
      className="btn btn--outline k-job__apply"
      href="#apply"
      data-position={position}
      aria-label={`Apply for ${position}`}
      onClick={onClick}
    >
      Apply
    </a>
  );
}
