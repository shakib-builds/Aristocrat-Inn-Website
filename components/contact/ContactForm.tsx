"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FieldError, SuccessPanel, fieldReveal, formExit } from "@/components/forms/FormParts";
import { useFormValidation } from "@/components/forms/useFormValidation";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";

const TOPICS = [
  "Room booking",
  "Airport pickup",
  "Restaurant",
  "Banquet & events",
  "Conference",
  "Other question",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { errors, formProps, ariaFor, invalidClass } = useFormValidation(() => setSent(true));

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <SuccessPanel key="success" id="contact-success">
          <p className="f-success__title">
            Thank you, <span className="it">message received</span>
          </p>
          <p>
            We’ll reply within a few hours. For anything urgent, message us on{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener">
              WhatsApp
            </a>{" "}
            or call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
          </p>
        </SuccessPanel>
      ) : (
        <motion.form key="form" className="f-form" id="contact-form" exit={formExit} {...formProps}>
          <motion.div className="f-row" {...fieldReveal(0)}>
            <div className="f-wrap">
              <label className={`f-field${invalidClass("c-name")}`} htmlFor="c-name">
                <span className="f-field__label">Full name</span>
                <input
                  className="f-field__input"
                  id="c-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  data-error-required="Please enter your name."
                  {...ariaFor("c-name")}
                />
              </label>
              <FieldError id="c-name" message={errors["c-name"]} />
            </div>
            <div className="f-wrap">
              <label className={`f-field${invalidClass("c-phone")}`} htmlFor="c-phone">
                <span className="f-field__label">Phone</span>
                <input
                  className="f-field__input"
                  id="c-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+880…"
                  data-phone=""
                  {...ariaFor("c-phone")}
                />
              </label>
              <FieldError id="c-phone" message={errors["c-phone"]} />
            </div>
          </motion.div>
          <motion.div className="f-row" {...fieldReveal(0.08)}>
            <div className="f-wrap">
              <label className={`f-field${invalidClass("c-email")}`} htmlFor="c-email">
                <span className="f-field__label">Email</span>
                <input
                  className="f-field__input"
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  required
                  data-error-required="Please enter your email address."
                  {...ariaFor("c-email")}
                />
              </label>
              <FieldError id="c-email" message={errors["c-email"]} />
            </div>
            <div className="f-wrap">
              <label className="f-field f-field--select" htmlFor="c-topic">
                <span className="f-field__label">Topic</span>
                <span className="f-select">
                  <select className="f-field__input" id="c-topic" name="topic">
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </span>
              </label>
            </div>
          </motion.div>
          <motion.div className="f-wrap" {...fieldReveal(0.16)}>
            <label className={`f-field f-field--area${invalidClass("c-message")}`} htmlFor="c-message">
              <span className="f-field__label">Message</span>
              <textarea
                className="f-field__input"
                id="c-message"
                name="message"
                rows={7}
                placeholder="How can we help?"
                required
                data-error-required="Please write a short message."
                {...ariaFor("c-message")}
              />
            </label>
            <FieldError id="c-message" message={errors["c-message"]} />
          </motion.div>
          <motion.button className="btn btn--primary" type="submit" {...fieldReveal(0.24)}>
            Send message
          </motion.button>
          <motion.p className="f-note" {...fieldReveal(0.3)}>
            We reply within a few hours – faster on WhatsApp.
          </motion.p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
