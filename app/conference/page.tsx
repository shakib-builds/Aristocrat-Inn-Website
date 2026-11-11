import type { Metadata } from "next";
import Image from "next/image";
import { CountUp, ImageReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import EnquiryForm, { EventLink } from "@/components/venue/EnquiryForm";
import VenueHero from "@/components/venue/VenueHero";
import ZoomGallery from "@/components/venue/ZoomGallery";
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";
import hero from "@/public/assets/img/conference-hero.jpg";
import weddings from "@/public/assets/img/conference-weddings.jpg";
import birthdays from "@/public/assets/img/conference-birthdays.jpg";
import corporate from "@/public/assets/img/conference-corporate.jpg";
import included from "@/public/assets/img/conference-included.jpg";
import gallery1 from "@/public/assets/img/conference-gallery-1.jpg";
import gallery2 from "@/public/assets/img/conference-gallery-2.jpg";
import "./page.css";

export const metadata: Metadata = {
  title: "Royal Banquet & Conference",
  description:
    "Weddings, birthdays, private functions and corporate events for up to 150 guests in Gulshan-2, with digital and audio support included.",
};

// Same markup as the shared StatsBand, but with its own aria-label ("Venue at a glance").
const VENUE_FACTS = [
  ["150", "Guests, seated"],
  ["AV", "Digital & audio support"],
  ["24/7", "Business centre"],
  ["Gulshan-2", "Diplomatic zone"],
] as const;

const INCLUDED = [
  ["Digital & audio support", "Projector, screen and sound for speeches and presentations"],
  ["Seating for up to 150", "Banquet, theatre or classroom layouts"],
  ["24-hour business centre", "Printing and secretarial services"],
  ["Lobby & balcony lounges", "Quiet spaces for small meetings and breaks"],
  ["Rooms for your guests", "Stay on site – breakfast and airport pickup included"],
] as const;

const CARD_SIZES = "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 50vw, 460px";

export default function ConferencePage() {
  return (
    <main id="top" className="page-conference">
      {/* ===== Page hero ===== */}
      <VenueHero
        modifier="page-hero--conference"
        image={hero}
        crumb="Conference"
        title={
          <>
            Royal Banquet &amp; <span className="it">Conference</span>
          </>
        }
        lead="A venue for weddings, birthdays, private functions and corporate events in Gulshan-2 – for up to 150 guests, with digital and audio support included."
        cta={{ href: "#enquiry", label: "Get an event quote" }}
      />

      {/* ===== Venue facts ===== */}
      <section className="stats stats--white" aria-label="Venue at a glance">
        <Stagger className="wrap" stagger={0.1}>
          {VENUE_FACTS.map(([num, label]) => (
            <StaggerItem className="stat" key={label}>
              <CountUp className="stat__num" value={num} />
              <p className="stat__label">{label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ===== Intro ===== */}
      <section className="intro">
        <div className="wrap">
          <div className="intro__statement">
            <Reveal as="p" className="eyebrow">
              events &amp; meetings
            </Reveal>
            <RevealText className="intro__title c-intro__title">
              One venue, <span className="it">every occasion</span>
            </RevealText>
          </div>
          <Reveal as="p" className="intro__body" delay={0.2}>
            From a wedding reception to a board meeting, our team helps you create a memorable event for your guests or
            clients. The hall comes with well-equipped digital and audio support, and our location in the diplomatic
            zone makes it easy for guests to reach.
          </Reveal>
        </div>
      </section>

      {/* ===== Event types ===== */}
      <section className="events">
        <div className="wrap">
          <div className="events__head">
            <Reveal as="p" className="eyebrow">
              what we host
            </Reveal>
            <RevealText className="h-sub">
              Made for your <span className="it">moment</span>
            </RevealText>
          </div>
          <Stagger className="event-cards" stagger={0.12}>
            <StaggerItem as="article" className="event-card">
              <ImageReveal className="event-card__img" style={{ position: "relative" }}>
                <Image src={weddings} alt="Wedding reception table with flowers" fill sizes={CARD_SIZES} placeholder="blur" />
              </ImageReveal>
              <div className="event-card__body">
                <h3 className="event-card__title">
                  <span className="it">Weddings</span>
                </h3>
                <p>Receptions and walima dinners for up to 150 guests, with a dedicated team to help you plan the day.</p>
                <EventLink eventType="Wedding">Plan your wedding →</EventLink>
              </div>
            </StaggerItem>
            <StaggerItem as="article" className="event-card">
              <ImageReveal className="event-card__img" style={{ position: "relative" }}>
                <Image src={birthdays} alt="Decorated table for a private celebration" fill sizes={CARD_SIZES} placeholder="blur" />
              </ImageReveal>
              <div className="event-card__body">
                <h3 className="event-card__title">
                  Birthdays &amp; <span className="it">private functions</span>
                </h3>
                <p>Birthdays, anniversaries and family gatherings in an elegant, private setting.</p>
                <EventLink eventType="Birthday / private function">Plan a celebration →</EventLink>
              </div>
            </StaggerItem>
            <StaggerItem as="article" className="event-card">
              <ImageReveal className="event-card__img" style={{ position: "relative" }}>
                <Image src={corporate} alt="Conference room set up for a corporate meeting" fill sizes={CARD_SIZES} placeholder="blur" />
              </ImageReveal>
              <div className="event-card__body">
                <h3 className="event-card__title">
                  Corporate <span className="it">events</span>
                </h3>
                <p>Seminars, conferences and launches with digital and audio support included.</p>
                <EventLink eventType="Corporate event">Plan a corporate event →</EventLink>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ===== Everything your event needs ===== */}
      <section className="included dark">
        <div className="wrap">
          <ImageReveal className="included__img" style={{ position: "relative" }}>
            <Image
              src={included}
              alt="Lounge with armchairs for small meetings and breaks"
              fill
              sizes="(max-width: 1100px) calc(100vw - 80px), (max-width: 1280px) 46vw, 620px"
              placeholder="blur"
            />
          </ImageReveal>
          <div className="included__text">
            <div className="included__head">
              <Reveal as="p" className="eyebrow">
                included
              </Reveal>
              <RevealText className="h-sub">
                Everything your event <span className="it">needs</span>
              </RevealText>
            </div>
            <Stagger as="ul" className="inc-list" stagger={0.08}>
              {INCLUDED.map(([title, text]) => (
                <StaggerItem as="li" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <a className="btn btn--light" href="#enquiry">
              Get an event quote
            </a>
          </div>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section className="gallery">
        <div className="wrap">
          <RevealText className="h-gallery">
            Set the <span className="it">scene</span>
          </RevealText>
          <ZoomGallery
            sizes="(max-width: 760px) 100vw, (max-width: 1280px) 60vw, 800px"
            photos={[
              { src: gallery1, alt: "Banquet hall set for an event", label: "Enlarge photo: banquet hall" },
              { src: gallery2, alt: "Event room setting", label: "Enlarge photo: event setting" },
            ]}
          />
        </div>
      </section>

      {/* ===== Enquiry ===== */}
      <section className="enquiry" id="enquiry">
        <div className="wrap">
          <div className="enquiry__info">
            <Reveal as="p" className="eyebrow">
              plan your event
            </Reveal>
            <RevealText className="h-sub">
              Tell us about your <span className="it">event</span>
            </RevealText>
            <Reveal as="p" delay={0.15}>
              Share a few details and our events team will get back to you with availability and a quote.
            </Reveal>
            <Stagger className="details">
              <StaggerItem className="details__row">
                <span className="details__label">Phone</span>
                <span className="details__value">
                  <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> &nbsp;·&nbsp; <a href="tel:+880222281014">+880 2 222281014</a>
                </span>
              </StaggerItem>
              <StaggerItem className="details__row">
                <span className="details__label">WhatsApp</span>
                <span className="details__value">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                    {PHONE_DISPLAY}
                  </a>
                </span>
              </StaggerItem>
              <StaggerItem className="details__row">
                <span className="details__label">Email</span>
                <span className="details__value">
                  <a href={EMAIL_HREF}>{EMAIL}</a>
                </span>
              </StaggerItem>
              <StaggerItem className="details__row">
                <span className="details__label">Venue</span>
                <span className="details__value">House 12, Road 68/A, Gulshan-2, Dhaka 1212</span>
              </StaggerItem>
            </Stagger>
          </div>

          <EnquiryForm
            title={
              <>
                Request a <span className="it">quote</span>
              </>
            }
            doneText={
              <>
                Your enquiry is noted. Our events team will get back to you with availability and a quote, usually
                within one working day. Need it sooner? Message us on{" "}
                <a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noopener">
                  WhatsApp
                </a>
                .
              </>
            }
            againLabel="Send another enquiry"
          >
            <div className="form-card__row">
              <label className="fbox">
                <span className="fbox__label">Event type</span>
                <select className="fbox__input" name="event" required>
                  <option>Wedding</option>
                  <option>Birthday / private function</option>
                  <option>Corporate event</option>
                  <option>Other</option>
                </select>
                <span className="fbox__error" aria-live="polite"></span>
              </label>
              <label className="fbox">
                <span className="fbox__label">Date</span>
                <input className="fbox__input js-date" type="text" name="date" placeholder="Select date" required />
                <span className="fbox__error" aria-live="polite"></span>
              </label>
            </div>
            <div className="form-card__row">
              <label className="fbox">
                <span className="fbox__label">Guests</span>
                <input
                  className="fbox__input"
                  type="number"
                  name="guests"
                  placeholder="Approx. number"
                  min="1"
                  max="150"
                  inputMode="numeric"
                  required
                />
                <span className="fbox__error" aria-live="polite"></span>
              </label>
              <label className="fbox">
                <span className="fbox__label">Layout</span>
                <select className="fbox__input" name="layout">
                  <option>Banquet</option>
                  <option>Theatre</option>
                  <option>Classroom</option>
                  <option>Not sure yet</option>
                </select>
                <span className="fbox__error" aria-live="polite"></span>
              </label>
            </div>
            <div className="form-card__row">
              <label className="fbox">
                <span className="fbox__label">Full name</span>
                <input className="fbox__input" type="text" name="name" placeholder="Your name" autoComplete="name" required />
                <span className="fbox__error" aria-live="polite"></span>
              </label>
              <label className="fbox">
                <span className="fbox__label">Phone</span>
                <input
                  className="fbox__input"
                  type="tel"
                  name="phone"
                  placeholder="+880…"
                  autoComplete="tel"
                  required
                  pattern="(?:\D*\d){7,}\D*"
                />
                <span className="fbox__error" aria-live="polite"></span>
              </label>
            </div>
            <label className="fbox">
              <span className="fbox__label">Email</span>
              <input
                className="fbox__input"
                type="email"
                name="email"
                placeholder="you@email.com"
                autoComplete="email"
                required
              />
              <span className="fbox__error" aria-live="polite"></span>
            </label>
            <label className="fbox">
              <span className="fbox__label">Message</span>
              <textarea className="fbox__input" name="message" rows={3} placeholder="Tell us about your event…"></textarea>
              <span className="fbox__error" aria-live="polite"></span>
            </label>
            <button className="btn btn--primary" type="submit">
              Send enquiry
            </button>
            <p className="form-card__note">We usually reply within one working day.</p>
          </EnquiryForm>
        </div>
      </section>
    </main>
  );
}
