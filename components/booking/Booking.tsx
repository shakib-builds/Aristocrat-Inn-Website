"use client";

/**
 * Booking page: URL prefill, live summary, validation and success state.
 * No backend: a valid submit only switches to the confirmation view.
 */

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { flushSync } from "react-dom";
import { RevealText } from "@/components/motion";
import UrlPrefill from "./UrlPrefill";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";
import {
  COUNTRIES,
  ORDER,
  ROOMS,
  ROOM_OPTIONS,
  formatRange,
  DEFAULT_VALUES,
  prefillFromQuery,
  iso,
  money,
  nightsBetween,
  pad,
  parseDate,
  plural,
  splitRoomTitle,
  today,
  validate,
  type CheckedKey,
  type Errors,
  type Values,
} from "./booking-utils";
import successIcon from "@/public/assets/icons/booking-success.svg";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const MotionImage = motion.create(Image);

/** Column gap of .bk-form (40px, 24px on phones) – cancelled while the banner is collapsed. */
const formGap = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches ? 24 : 40;

const HINT_DEFAULT = "Speeds up check-in for foreign guests · stored securely";

type Done = {
  first: string;
  ref: string;
  room: string;
  dates: string;
  guests: string;
  total: string;
  pickup: string;
};

/* ---------- small animated pieces ---------- */
function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          key="err"
          className="bk-error"
          id={id}
          style={{ overflow: "hidden" }}
          // marginTop cancels the 6px group gap while collapsed
          initial={{ opacity: 0, height: 0, marginTop: -6 }}
          animate={{ opacity: 1, height: "auto", marginTop: 0 }}
          exit={{ opacity: 0, height: 0, marginTop: -6 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function SelectArrow() {
  return (
    <span className="bk-select__arrow" aria-hidden="true">
      ▾
    </span>
  );
}

/** Click anywhere in a select's field box opens the picker (the select is sized to its value). */
function openPicker(e: MouseEvent<HTMLLabelElement>) {
  const sel = e.currentTarget.querySelector("select");
  if (!sel || e.target === sel) return;
  sel.focus();
  try {
    sel.showPicker();
  } catch {
    /* unsupported: focus is enough */
  }
}

function RoomTitle({ name }: { name: string }) {
  if (!ROOMS[name]) return <>Choose a room</>;
  const [lead, accent] = splitRoomTitle(name);
  return (
    <>
      {lead && `${lead} `}
      <span className="it">{accent}</span>
    </>
  );
}

/* ---------- success view ---------- */
function SuccessView({ done }: { done: Done }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
    document.title = "Request received · Hotel Aristocrat Inn";
  }, []);
  return (
    <motion.section
      key="done"
      className="bk-done"
      id="success-view"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="wrap">
        <div className="bk-done__card">
          <MotionImage
            className="bk-done__icon"
            src={successIcon}
            width={64}
            height={64}
            alt=""
            unoptimized
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          />
          <h1 className="bk-done__title" id="done-title" tabIndex={-1} ref={titleRef}>
            Request <span className="it">received</span>
          </h1>
          <p className="bk-done__text">
            Thank you, <span id="done-name">{done.first}</span>. We’ve received your booking request and will
            confirm by phone or email within the hour. Your reference is <span id="done-ref">{done.ref}</span>.
          </p>
          <dl className="bk-lines bk-lines--done">
            <div className="bk-line"><dt>Room</dt><dd id="done-room">{done.room}</dd></div>
            <div className="bk-line"><dt>Dates</dt><dd id="done-dates">{done.dates}</dd></div>
            <div className="bk-line"><dt>Guests</dt><dd id="done-guests">{done.guests}</dd></div>
            <div className="bk-line"><dt>Estimated total</dt><dd id="done-total">{done.total}</dd></div>
            <div className="bk-line"><dt>Airport pickup</dt><dd id="done-pickup">{done.pickup}</dd></div>
          </dl>
          <div className="bk-done__actions">
            <a className="btn btn--primary" href={WHATSAPP_URL} target="_blank" rel="noopener">
              Message us on WhatsApp
            </a>
            <Link className="btn btn--outline" href="/">
              Back to home
            </Link>
          </div>
          <p className="bk-done__note">
            Need to change something? Call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>, 24 hours a day.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

/* ---------- booking page ---------- */
export default function Booking() {
  const [values, setValues] = useState<Values>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [dateFocus, setDateFocus] = useState({ checkin: false, checkout: false });
  const [countryLong, setCountryLong] = useState(false);
  const [passport, setPassport] = useState<string | null>(null);
  const [photoRoom, setPhotoRoom] = useState(DEFAULT_VALUES.room);
  const [todayIso, setTodayIso] = useState<string | undefined>(undefined);
  const [done, setDone] = useState<Done | null>(null);


  // Date limits depend on "today" – set after mount (keeps server and client HTML identical).
  useEffect(() => {
    setTodayIso(iso(today())); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  // Prefill from the URL (applied once the search params are known on the client)
  const applyPrefill = useCallback((query: string) => {
    const p = prefillFromQuery(query);
    if (!Object.keys(p).length) return;
    setValues((v) => ({ ...v, ...p }));
    if (p.room) setPhotoRoom(p.room);
  }, []);

  /* ---------- live summary ---------- */
  const s = useMemo(() => {
    const a = parseDate(values.checkin);
    const b = parseDate(values.checkout);
    const n = nightsBetween(a, b);
    const room = ROOMS[values.room];
    const rooms = +values.rooms || 1;
    const guests = +values.guests || 1;
    const total = room && n > 0 ? room.price * n * rooms : 0;
    const msg = ["Hello, I would like to book a stay at Hotel Aristocrat Inn."];
    if (room) msg.push(`Room: ${values.room} × ${rooms}`);
    if (n > 0) msg.push(`Dates: ${formatRange(a, b)} (${plural(n, "night", "nights")})`);
    msg.push(`Guests: ${plural(guests, "adult", "adults")}`);
    return {
      a,
      b,
      n,
      room,
      rooms,
      guests,
      total,
      whatsapp: `${WHATSAPP_URL}?text=${encodeURIComponent(msg.join("\n"))}`,
    };
  }, [values.checkin, values.checkout, values.room, values.rooms, values.guests]);

  const checkoutMin = (() => {
    const a = parseDate(values.checkin);
    if (!a) return todayIso;
    const b = new Date(a);
    b.setDate(b.getDate() + 1);
    return iso(b);
  })();

  /* ---------- field handlers ---------- */
  function update(k: keyof Values, value: string) {
    const next = { ...values, [k]: value };
    setValues(next);
    if (k === "room" && ROOMS[value]) setPhotoRoom(value);
    // Re-check fields live once the guest has tried to submit
    if (attempted && (ORDER as readonly string[]).includes(k)) {
      const keys: CheckedKey[] = k === "checkin" ? ["checkin", "checkout"] : [k as CheckedKey];
      setErrors((prev) => validate(next, keys, prev));
    }
  }
  const onChange =
    (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(k, e.target.value);

  // Before the first submit, a touched field is checked when the guest leaves it
  const onBlurCheck = (k: CheckedKey) => () => {
    if (!attempted && values[k].trim()) setErrors((prev) => validate(values, [k], prev));
  };

  const dateProps = (k: "checkin" | "checkout") => ({
    className: "bk-field__input js-date",
    type: values[k] || dateFocus[k] ? "date" : "text",
    id: k,
    name: k,
    placeholder: "Select date",
    required: true,
    autoComplete: "off",
    min: k === "checkin" ? todayIso : checkoutMin,
    value: values[k],
    onChange: onChange(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    onFocus: (e: FocusEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      input.type = "date";
      setDateFocus((f) => ({ ...f, [k]: true }));
      try {
        input.showPicker?.();
      } catch {
        /* not supported */
      }
    },
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      if (!e.currentTarget.value) e.currentTarget.type = "text";
      setDateFocus((f) => ({ ...f, [k]: false }));
      onBlurCheck(k)();
    },
  });

  const textProps = (k: "name" | "email" | "phone") => ({
    className: "bk-field__input",
    id: k,
    name: k,
    required: true,
    value: values[k],
    onChange: onChange(k),
    onBlur: onBlurCheck(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  const groupClass = (k: CheckedKey) => (errors[k] ? "bk-group is-invalid" : "bk-group");

  // Country code shows just the code when closed ("+880"), full names while choosing.
  const showLong = () => flushSync(() => setCountryLong(true));

  /* ---------- submit ---------- */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    const errs = validate(values, ORDER);
    setErrors(errs);
    const invalid = ORDER.filter((k) => errs[k]);
    if (invalid.length) {
      const first = document.getElementById(invalid[0]);
      first?.focus({ preventScroll: true });
      first?.closest(".bk-group")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const a = s.a as Date;
    const flight = values.flight.trim().toUpperCase();
    const time = values.arrival.trim();
    setDone({
      first: values.name.trim().split(/\s+/)[0],
      ref: `AI-${String(a.getFullYear()).slice(-2)}-${pad(a.getMonth() + 1)}${pad(a.getDate())}`,
      room: `${values.room} · ${plural(s.rooms, "room", "rooms")}`,
      dates: `${formatRange(s.a, s.b)} · ${plural(s.n, "night", "nights")}`,
      guests: plural(s.guests, "adult", "adults"),
      total: money(s.total),
      pickup: flight
        ? `Flight ${flight}${time ? " · " + time : ""}`
        : time
          ? `Arriving ${time}`
          : "Send your flight number on WhatsApp",
    });
    window.scrollTo({ top: 0 });
  }

  const invalidCount = attempted ? ORDER.filter((k) => errors[k]).length : 0;

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <SuccessView key="done" done={done} />
      ) : (
        <motion.div
          key="form"
          className="bk-page"
          id="booking-view"
          initial={false}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.35, ease: EASE } }}
        >
          <Suspense fallback={null}>
            <UrlPrefill onPrefill={applyPrefill} />
          </Suspense>
          <section className="bk-title">
            <div className="wrap">
              <motion.nav className="bk-crumbs" aria-label="Breadcrumb" {...rise(0, 12)}>
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Booking</span>
              </motion.nav>
              <RevealText as="h1" className="h-display bk-title__h" onLoad delay={0.05}>
                Book your <span className="it-lg">stay</span>
              </RevealText>
              <motion.p className="bk-title__sub" {...rise(0.2)}>
                Send us your request – we confirm by phone or email, usually within the hour.
              </motion.p>
              <motion.ol
                className="bk-steps"
                aria-label="Booking steps"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
              >
                {[
                  ["bk-step is-done", "1", "Your stay"],
                  ["line"],
                  ["bk-step is-done", "2", "Your details"],
                  ["line"],
                  ["bk-step", "3", "Confirmation"],
                ].map(([cls, num, label], i) => (
                  <motion.li
                    key={i}
                    className={cls === "line" ? "bk-step__line" : cls}
                    aria-hidden={cls === "line" ? "true" : undefined}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                  >
                    {cls !== "line" && (
                      <>
                        <span className="bk-step__dot">{num}</span>
                        {label}
                      </>
                    )}
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </section>

          <section className="bk-body">
            <form className="wrap bk-layout" id="booking-form" noValidate onSubmit={onSubmit}>
              <div className="bk-form">
                <AnimatePresence initial={false}>
                  {invalidCount > 0 && (
                    <motion.div
                      key="banner"
                      className="bk-banner"
                      id="bk-banner"
                      role="alert"
                      tabIndex={-1}
                      style={{ overflow: "hidden" }}
                      // negative margin cancels the column gap while collapsed
                      initial={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, marginBottom: -formGap() }}
                      animate={{ opacity: 1, height: "auto", paddingTop: 14, paddingBottom: 14, marginBottom: 0 }}
                      exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, marginBottom: -formGap() }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      Please fix {invalidCount === 1 ? "1 field" : `${invalidCount} fields`} highlighted below
                      before sending your request.
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 01 Your stay */}
                <motion.section className="bk-card" {...rise(0.35)}>
                  <h2 className="bk-card__head">
                    <span className="bk-card__num">01</span>
                    <span className="bk-card__title">
                      Your <span className="it">stay</span>
                    </span>
                  </h2>

                  <div className="bk-row bk-row--3">
                    <div className={groupClass("checkin")}>
                      <label className="bk-field" htmlFor="checkin">
                        <span className="bk-field__label">Check-in *</span>
                        <input {...dateProps("checkin")} />
                      </label>
                      <FieldError id="checkin-error" message={errors.checkin} />
                    </div>
                    <div className={groupClass("checkout")}>
                      <label className="bk-field" htmlFor="checkout">
                        <span className="bk-field__label">Check-out *</span>
                        <input {...dateProps("checkout")} />
                      </label>
                      <FieldError id="checkout-error" message={errors.checkout} />
                    </div>
                    <div className="bk-group">
                      <div className="bk-field bk-field--readonly">
                        <span className="bk-field__label" id="nights-label">
                          Nights
                        </span>
                        <output className="bk-field__input" id="nights" aria-labelledby="nights-label" aria-live="polite">
                          {s.n > 0 ? `${s.n} (calculated)` : "– (calculated)"}
                        </output>
                      </div>
                    </div>
                  </div>

                  <div className="bk-row bk-row--3">
                    <div className={groupClass("room")}>
                      <label className="bk-field bk-field--select" htmlFor="room" onClick={openPicker}>
                        <span className="bk-field__label">Room type *</span>
                        <span className="bk-select">
                          <select
                            className="bk-field__input"
                            id="room"
                            name="room"
                            required
                            value={values.room}
                            onChange={onChange("room")}
                            onBlur={onBlurCheck("room")}
                            aria-invalid={errors.room ? true : undefined}
                            aria-describedby={errors.room ? "room-error" : undefined}
                          >
                            <option value="">Choose a room</option>
                            {ROOM_OPTIONS.map((r) => (
                              <option key={r}>{r}</option>
                            ))}
                          </select>
                          <SelectArrow />
                        </span>
                      </label>
                      <FieldError id="room-error" message={errors.room} />
                    </div>
                    <div className="bk-group">
                      <label className="bk-field bk-field--select" htmlFor="rooms" onClick={openPicker}>
                        <span className="bk-field__label">Rooms *</span>
                        <span className="bk-select">
                          <select
                            className="bk-field__input"
                            id="rooms"
                            name="rooms"
                            required
                            value={values.rooms}
                            onChange={onChange("rooms")}
                          >
                            {[1, 2, 3, 4, 5].map((n) => (
                              <option key={n}>{n}</option>
                            ))}
                          </select>
                          <SelectArrow />
                        </span>
                      </label>
                    </div>
                    <div className="bk-group">
                      <label className="bk-field bk-field--select" htmlFor="guests" onClick={openPicker}>
                        <span className="bk-field__label">Guests *</span>
                        <span className="bk-select">
                          <select
                            className="bk-field__input"
                            id="guests"
                            name="guests"
                            required
                            value={values.guests}
                            onChange={onChange("guests")}
                          >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                              <option key={n} value={n}>
                                {plural(n, "adult", "adults")}
                              </option>
                            ))}
                          </select>
                          <SelectArrow />
                        </span>
                      </label>
                    </div>
                  </div>
                </motion.section>

                {/* 02 Your details */}
                <motion.section className="bk-card" {...rise(0.45)}>
                  <h2 className="bk-card__head">
                    <span className="bk-card__num">02</span>
                    <span className="bk-card__title">
                      Your <span className="it">details</span>
                    </span>
                  </h2>

                  <div className="bk-row bk-row--2">
                    <div className={groupClass("name")}>
                      <label className="bk-field" htmlFor="name">
                        <span className="bk-field__label">Full name *</span>
                        <input {...textProps("name")} type="text" placeholder="Rahim Chowdhury" autoComplete="name" />
                      </label>
                      <FieldError id="name-error" message={errors.name} />
                    </div>
                    <div className={groupClass("email")}>
                      <label className="bk-field" htmlFor="email">
                        <span className="bk-field__label">Email *</span>
                        <input
                          {...textProps("email")}
                          type="email"
                          placeholder="rahim@email.com"
                          autoComplete="email"
                          spellCheck={false}
                        />
                      </label>
                      <FieldError id="email-error" message={errors.email} />
                    </div>
                  </div>

                  <div className="bk-row bk-row--2">
                    <div className="bk-group">
                      <label
                        className="bk-field bk-field--select"
                        htmlFor="country"
                        onClickCapture={(e) => {
                          if (e.target !== e.currentTarget.querySelector("select")) showLong();
                        }}
                        onClick={openPicker}
                      >
                        <span className="bk-field__label">Country code</span>
                        <span className="bk-select">
                          <select
                            className="bk-field__input"
                            id="country"
                            name="country"
                            autoComplete="tel-country-code"
                            value={values.country}
                            onChange={(e) => {
                              update("country", e.target.value);
                              setCountryLong(false);
                            }}
                            onMouseDown={showLong}
                            onKeyDown={showLong}
                            onBlur={() => setCountryLong(false)}
                          >
                            {COUNTRIES.map(([code, label]) => (
                              <option key={code} value={code}>
                                {countryLong ? label : code}
                              </option>
                            ))}
                          </select>
                          <SelectArrow />
                        </span>
                      </label>
                    </div>
                    <div className={groupClass("phone")}>
                      <label className="bk-field" htmlFor="phone">
                        <span className="bk-field__label">Phone / WhatsApp *</span>
                        <input
                          {...textProps("phone")}
                          type="tel"
                          placeholder="1817 019200"
                          autoComplete="tel-national"
                          inputMode="tel"
                        />
                      </label>
                      <FieldError id="phone-error" message={errors.phone} />
                    </div>
                  </div>

                  <div className="bk-row bk-row--2">
                    <div className="bk-group">
                      <label className="bk-field" htmlFor="flight">
                        <span className="bk-field__label">Flight number (for free pickup)</span>
                        <input
                          className="bk-field__input"
                          type="text"
                          id="flight"
                          name="flight"
                          placeholder="e.g. BG 084"
                          autoComplete="off"
                          autoCapitalize="characters"
                          value={values.flight}
                          onChange={onChange("flight")}
                        />
                      </label>
                    </div>
                    <div className="bk-group">
                      <label className="bk-field" htmlFor="arrival">
                        <span className="bk-field__label">Arrival time</span>
                        <input
                          className="bk-field__input"
                          type="text"
                          id="arrival"
                          name="arrival"
                          placeholder="e.g. 02:30"
                          autoComplete="off"
                          inputMode="numeric"
                          value={values.arrival}
                          onChange={onChange("arrival")}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Passport file stays in the browser – there is no upload backend yet */}
                  <label className={passport ? "bk-upload has-file" : "bk-upload"} htmlFor="passport">
                    <input
                      className="bk-upload__input"
                      type="file"
                      id="passport"
                      name="passport"
                      accept="image/*,.pdf"
                      onChange={(e) => setPassport(e.target.files?.[0]?.name ?? null)}
                    />
                    <span className="bk-upload__title">Upload passport scan (optional)</span>
                    <span className="bk-upload__hint" id="passport-hint">
                      {passport ? `Selected: ${passport}` : HINT_DEFAULT}
                    </span>
                  </label>

                  <label className="bk-field bk-field--area" htmlFor="requests">
                    <span className="bk-field__label">Special requests</span>
                    <textarea
                      className="bk-field__input"
                      id="requests"
                      name="requests"
                      rows={2}
                      placeholder="Late arrival, extra bed, celebration…"
                      value={values.requests}
                      onChange={onChange("requests")}
                    />
                  </label>
                </motion.section>
              </div>

              {/* Booking summary */}
              <motion.aside className="bk-summary" aria-label="Booking summary" {...rise(0.4)}>
                <div className="bk-summary__img">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={photoRoom}
                      className="bk-summary__photo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Image
                        id="sum-img"
                        src={ROOMS[photoRoom].img}
                        alt={`${photoRoom} room`}
                        fill
                        placeholder="blur"
                        sizes="(max-width: 1100px) 100vw, 440px"
                        style={{ objectFit: "cover" }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="bk-summary__body">
                  <h2 className="bk-summary__room" id="sum-room">
                    <RoomTitle name={values.room} />
                  </h2>
                  <dl className="bk-lines">
                    <div className="bk-line">
                      <dt>Dates</dt>
                      <dd id="sum-dates">{s.n > 0 ? formatRange(s.a, s.b) : "Select dates"}</dd>
                    </div>
                    <div className="bk-line">
                      <dt>Guests</dt>
                      <dd id="sum-guests">
                        {plural(s.guests, "adult", "adults")} · {plural(s.rooms, "room", "rooms")}
                      </dd>
                    </div>
                    <div className="bk-line">
                      <dt id="sum-rate">
                        {s.room ? money(s.room.price) : "Room rate"} ×{" "}
                        {s.n > 0 ? plural(s.n, "night", "nights") : "– nights"}
                        {s.rooms > 1 ? ` × ${s.rooms} rooms` : ""}
                      </dt>
                      <dd id="sum-subtotal">{s.total ? money(s.total) : "–"}</dd>
                    </div>
                    <div className="bk-line bk-line--total">
                      <dt>Estimated total</dt>
                      <dd id="sum-total">{s.total ? money(s.total) : "–"}</dd>
                    </div>
                  </dl>
                  <p className="bk-summary__note">Final price confirmed by the hotel. Pay at the hotel.</p>
                  <button className="btn btn--primary bk-summary__btn" type="submit">
                    Send booking request
                  </button>
                  {/* WhatsApp hand-off with the stay details (no personal data) */}
                  <a
                    className="btn btn--outline bk-summary__btn"
                    id="sum-whatsapp"
                    href={s.whatsapp}
                    target="_blank"
                    rel="noopener"
                  >
                    Ask on WhatsApp
                  </a>
                  <ul className="bk-included">
                    <li>Buffet breakfast included</li>
                    <li>Free airport pickup</li>
                    <li>Free cancellation up to 24 h before arrival</li>
                    <li>Check-in &amp; check-out 12:00 noon</li>
                  </ul>
                </div>
              </motion.aside>
            </form>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
