"use client";

/**
 * Restaurant + Conference enquiry card (port of reference/js/venue.js, forms part).
 * Validated client-side only. There is no backend yet, so on submit we show a
 * confirmation instead of sending. Connect a form service here when one is chosen.
 */

import { useEffect, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from "react";
import { Reveal, RevealText } from "@/components/motion";

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const MESSAGES = {
  valueMissing: "Please fill this in.",
  typeMismatch: "Please check this format.",
  patternMismatch: "Please include a phone number we can call.",
  rangeUnderflow: "Please enter at least 1.",
  rangeOverflow: "The hall seats up to 150 guests.",
} as const;

function errorFor(input: Field) {
  const v = input.validity;
  if (v.valid) return "";
  for (const key of Object.keys(MESSAGES) as (keyof typeof MESSAGES)[]) {
    if (v[key]) return MESSAGES[key];
  }
  if (v.badInput) return "Please check this value.";
  return input.validationMessage;
}

/** Shows the error under a field; returns true when the field is valid. */
function showError(input: Field) {
  const box = input.closest(".fbox");
  const out = box?.querySelector(".fbox__error");
  const msg = errorFor(input);
  box?.classList.toggle("is-invalid", !!msg);
  if (out) out.textContent = msg;
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}

const isField = (el: EventTarget | null): el is Field =>
  el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement;

export default function EnquiryForm({
  title,
  children,
  doneText,
  againLabel,
}: {
  /** Content of the h2.form-card__title */
  title: ReactNode;
  /** The form fields, button and note (rendered inside <form>) */
  children: ReactNode;
  /** Confirmation copy shown after "Thank you, Name!" */
  doneText: ReactNode;
  againLabel: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [firstName, setFirstName] = useState("");
  const focusDone = useRef<"done" | "form" | null>(null);

  // Earliest date: today
  useEffect(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    formRef.current?.querySelectorAll<HTMLInputElement>(".js-date").forEach((d) => {
      d.min = today.toISOString().slice(0, 10);
    });
  }, []);

  // Move focus after the done/form swap has rendered
  useEffect(() => {
    if (focusDone.current === "done") doneRef.current?.focus();
    if (focusDone.current === "form") formRef.current?.querySelector<Field>("input, select, textarea")?.focus();
    focusDone.current = null;
  }, [done]);

  const fields = () => [...(formRef.current?.querySelectorAll<Field>("input, select, textarea") ?? [])];

  // Date/time fields: "Select date/time" placeholder, native picker on focus
  const onFocus = (e: FocusEvent<HTMLFormElement>) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    const kind = t.classList.contains("js-date") ? "date" : t.classList.contains("js-time") ? "time" : null;
    if (!kind) return;
    t.type = kind;
    try {
      t.showPicker?.();
    } catch {
      /* not supported */
    }
  };

  const onBlur = (e: FocusEvent<HTMLFormElement>) => {
    const f = e.target;
    if (!isField(f)) return;
    if (f instanceof HTMLInputElement && (f.classList.contains("js-date") || f.classList.contains("js-time")) && !f.value) {
      f.type = "text";
    }
    if (f.value || f.closest(".is-invalid")) showError(f);
  };

  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const f = e.target;
    if (isField(f) && f.closest(".is-invalid")) showError(f);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let firstBad: Field | null = null;
    for (const f of fields()) if (!showError(f) && !firstBad) firstBad = f;
    if (firstBad) {
      firstBad.focus();
      return;
    }
    const name = (form.elements.namedItem("name") as HTMLInputElement | null)?.value ?? "";
    setFirstName(name.split(/[ ,]/)[0]);
    form.reset();
    form.querySelectorAll<HTMLInputElement>(".js-date, .js-time").forEach((f) => {
      f.type = "text";
    });
    focusDone.current = "done";
    setDone(true);
  };

  const again = () => {
    focusDone.current = "form";
    setDone(false);
  };

  return (
    <Reveal className="form-card" delay={0.15}>
      <RevealText className="form-card__title">{title}</RevealText>
      <form
        ref={formRef}
        className="js-enquiry"
        method="post"
        noValidate
        hidden={done}
        onSubmit={onSubmit}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
      >
        {children}
      </form>
      <div ref={doneRef} className="form-card__done" tabIndex={-1} role="status" hidden={!done}>
        <strong>
          Thank you<span className="js-name">{firstName ? `, ${firstName}` : ""}</span>!
        </strong>
        {doneText}
        <p style={{ marginTop: 12 }}>
          <button className="btn btn--outline js-form-again" type="button" onClick={again}>
            {againLabel}
          </button>
        </p>
      </div>
    </Reveal>
  );
}

/** "Plan your wedding →" links: jump to the enquiry form with the event type selected. */
export function EventLink({ eventType, children }: { eventType: string; children: ReactNode }) {
  return (
    <a
      className="text-link"
      href="#enquiry"
      data-event-type={eventType}
      onClick={() => {
        const select = document.querySelector<HTMLSelectElement>('select[name="event"]');
        if (select) select.value = eventType;
      }}
    >
      {children}
    </a>
  );
}
