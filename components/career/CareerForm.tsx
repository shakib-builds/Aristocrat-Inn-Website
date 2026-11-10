"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { APPLY_EVENT } from "@/components/career/ApplyLink";
import { FieldError, SuccessPanel, fieldReveal, formExit } from "@/components/forms/FormParts";
import { useFormValidation } from "@/components/forms/useFormValidation";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const POSITIONS = [
  "Front Office Executive",
  "Restaurant Server",
  "Commis Chef",
  "Housekeeping Attendant",
  "Banquet & Events Coordinator",
  "Other / general application",
];

export default function CareerForm() {
  const [sent, setSent] = useState(false);
  const [position, setPosition] = useState(POSITIONS[0]);
  const [fileName, setFileName] = useState("");
  const { errors, formProps, ariaFor, invalidClass } = useFormValidation(() => setSent(true));
  const sentRef = useRef(sent);

  useEffect(() => {
    sentRef.current = sent;
  }, [sent]);

  // "Apply" links on the job rows preselect a position.
  useEffect(() => {
    const onApply = (e: Event) => {
      const detail = (e as CustomEvent<{ position: string; formShown: boolean }>).detail;
      if (POSITIONS.includes(detail.position)) setPosition(detail.position);
      detail.formShown = !sentRef.current;
    };
    window.addEventListener(APPLY_EVENT, onApply);
    return () => window.removeEventListener(APPLY_EVENT, onApply);
  }, []);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.files?.[0]?.name ?? "");

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <SuccessPanel key="success" id="career-success">
          <p className="f-success__title">
            Thank you, <span className="it">application received</span>
          </p>
          <p>
            We keep every CV on file and will contact you when a suitable position opens. Questions?
            Email <a href={EMAIL_HREF}>{EMAIL}</a> or call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
          </p>
        </SuccessPanel>
      ) : (
        <motion.form key="form" className="f-form" id="career-form" exit={formExit} {...formProps}>
          <motion.div className="f-row" {...fieldReveal(0)}>
            <div className="f-wrap">
              <label className={`f-field${invalidClass("k-name")}`} htmlFor="k-name">
                <span className="f-field__label">Full name</span>
                <input
                  className="f-field__input"
                  id="k-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  data-error-required="Please enter your name."
                  {...ariaFor("k-name")}
                />
              </label>
              <FieldError id="k-name" message={errors["k-name"]} />
            </div>
            <div className="f-wrap">
              <label className={`f-field${invalidClass("k-phone")}`} htmlFor="k-phone">
                <span className="f-field__label">Phone</span>
                <input
                  className="f-field__input"
                  id="k-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+880…"
                  required
                  data-phone=""
                  data-error-required="Please enter your phone number."
                  {...ariaFor("k-phone")}
                />
              </label>
              <FieldError id="k-phone" message={errors["k-phone"]} />
            </div>
          </motion.div>
          <motion.div className="f-row" {...fieldReveal(0.08)}>
            <div className="f-wrap">
              <label className={`f-field${invalidClass("k-email")}`} htmlFor="k-email">
                <span className="f-field__label">Email</span>
                <input
                  className="f-field__input"
                  id="k-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  required
                  data-error-required="Please enter your email address."
                  {...ariaFor("k-email")}
                />
              </label>
              <FieldError id="k-email" message={errors["k-email"]} />
            </div>
            <div className="f-wrap">
              <label className="f-field f-field--select" htmlFor="k-position">
                <span className="f-field__label">Position</span>
                <span className="f-select">
                  <select
                    className="f-field__input"
                    id="k-position"
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    {POSITIONS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </span>
              </label>
            </div>
          </motion.div>
          <motion.div className="f-wrap" {...fieldReveal(0.16)}>
            <label
              className={`f-upload${fileName ? " has-file" : ""}${invalidClass("k-cv")}`}
              htmlFor="k-cv"
            >
              <input
                id="k-cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                required
                data-error-required="Please upload your CV."
                onChange={onFile}
                {...ariaFor("k-cv")}
              />
              <span className="f-upload__title">Upload your CV</span>
              <span className="f-upload__hint">PDF or Word, up to 5 MB</span>
              <span className="f-upload__file" aria-live="polite">
                {fileName}
              </span>
            </label>
            <FieldError id="k-cv" message={errors["k-cv"]} />
          </motion.div>
          <motion.div className="f-wrap" {...fieldReveal(0.24)}>
            <label className="f-field" htmlFor="k-message">
              <span className="f-field__label">Message (optional)</span>
              <textarea
                className="f-field__input"
                id="k-message"
                name="message"
                rows={3}
                placeholder="Tell us a little about yourself…"
              />
            </label>
          </motion.div>
          <motion.button
            className="btn btn--primary k-apply__submit"
            type="submit"
            {...fieldReveal(0.3)}
          >
            Submit application
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
