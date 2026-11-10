"use client";

/**
 * Client-side validation for the Contact and Career forms
 * (port of reference/js/form-validation.js).
 *
 * Rules are read from the field's own attributes, like the original script:
 * `required` + `data-error-required`, `type="email"`, `data-phone`
 * (7–15 digits) and `type="file"` (PDF/DOC/DOCX, up to 5 MB).
 *
 * There is no backend yet: a valid submit calls `onValid` so the form can show
 * a confirmation instead. Hook it up to a form service (e.g. Formspree) later.
 */

import { useCallback, useRef, useState, type FormEvent, type SyntheticEvent } from "react";

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const MAX_FILE_MB = 5;
const FILE_TYPES = /\.(pdf|doc|docx)$/i;

function isField(el: EventTarget | null): el is Field {
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLSelectElement ||
    el instanceof HTMLTextAreaElement
  );
}

export function messageFor(field: Field): string {
  if (field instanceof HTMLInputElement && field.type === "file") {
    const file = field.files?.[0];
    if (!file) return field.required ? field.dataset.errorRequired || "Please choose a file." : "";
    if (!FILE_TYPES.test(file.name)) return "Please upload a PDF or Word document.";
    if (file.size > MAX_FILE_MB * 1024 * 1024)
      return `Your file is larger than ${MAX_FILE_MB} MB. Please upload a smaller file.`;
    return "";
  }
  const value = field.value.trim();
  if (field.required && !value) return field.dataset.errorRequired || "This field is required.";
  if (!value) return "";
  if (
    field.type === "email" &&
    (field.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
  ) {
    return "Please enter a valid email address, like name@example.com.";
  }
  if ("phone" in field.dataset) {
    const digits = value.replace(/\D/g, "");
    if (!/^[+\d\s()-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
      return "Please enter a valid phone number, like +880 1817 019200.";
    }
  }
  return "";
}

export function useFormValidation(onValid: () => void) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const touched = useRef(new Set<string>());

  const check = useCallback((field: Field) => {
    const msg = messageFor(field);
    setErrors((prev) => (prev[field.id] === msg ? prev : { ...prev, [field.id]: msg }));
    return msg;
  }, []);

  /** Event handlers for the <form> (delegated to every field inside it). */
  const formProps = {
    noValidate: true,
    onBlur: (e: SyntheticEvent) => {
      const field = e.target;
      if (!isField(field)) return;
      if (field.value) touched.current.add(field.id);
      if (touched.current.has(field.id)) check(field);
    },
    onInput: (e: SyntheticEvent) => {
      const field = e.target;
      if (isField(field) && field.type !== "file" && touched.current.has(field.id)) check(field);
    },
    onChange: (e: SyntheticEvent) => {
      const field = e.target;
      if (isField(field) && field.type === "file") check(field);
    },
    onSubmit: (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let firstInvalid: Field | null = null;
      for (const el of Array.from(e.currentTarget.elements)) {
        if (!isField(el) || !el.id) continue;
        touched.current.add(el.id);
        if (check(el) && !firstInvalid) firstInvalid = el;
      }
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      // TODO: send to a form service (e.g. Formspree) once one is set up.
      onValid();
    },
  };

  /** aria attributes for a field with an error slot `${id}-error`. */
  const ariaFor = (id: string) =>
    errors[id]
      ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` }
      : {};

  const invalidClass = (id: string) => (errors[id] ? " is-invalid" : "");

  return { errors, formProps, ariaFor, invalidClass };
}
