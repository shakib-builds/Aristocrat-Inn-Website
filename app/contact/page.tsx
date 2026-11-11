import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import GoogleMap from "@/components/GoogleMap";
import { HoverLift, ImageReveal, Parallax, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { Faq } from "@/components/shared";
import { EMAIL, EMAIL_HREF, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";
import contactHero from "@/public/assets/img/contact-hero.jpg";
import "@/components/forms/forms.css";
import "./page.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp, email or visit Hotel Aristocrat Inn in Gulshan-2, Dhaka. Our reception is open 24 hours, every day.",
};

const icon = (name: string) => (
  <Image
    className="c-card__icon"
    src={`/assets/icons/contact-${name}.svg`}
    width={28}
    height={28}
    alt=""
    unoptimized
  />
);

export default function ContactPage() {
  return (
    <main id="top" className="page-contact">
      {/* ===== Page hero ===== */}
      <section className="c-hero">
        <div className="c-hero__inner">
          <div className="c-hero__bg">
            <Parallax style={{ position: "absolute", inset: "-30px 0" }} distance={60}>
              <Image
                src={contactHero}
                alt=""
                fill
                priority
                sizes="(max-width: 760px) 100vw, (max-width: 1472px) calc(100vw - 32px), 1408px"
                placeholder="blur"
                style={{ objectFit: "cover" }}
              />
            </Parallax>
          </div>
          <nav className="crumbs crumbs--light" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>
          <RevealText as="h1" className="c-hero__title" onLoad>
            We’re here, <span className="it-lg">24/7</span>
          </RevealText>
          <Reveal as="p" className="c-hero__text" delay={0.3}>
            Our reception is open around the clock. Call, message or visit us in Gulshan-2 – we
            usually reply within the hour.
          </Reveal>
        </div>
      </section>

      {/* ===== Contact options ===== */}
      <section className="c-options" aria-label="Ways to reach us">
        <Stagger className="wrap" stagger={0.1}>
          <StaggerItem>
            <HoverLift as="article" className="c-card" style={{ height: "100%" }}>
              {icon("call")}
              <h2 className="c-card__label">Call</h2>
              <a className="c-card__value" href={PHONE_TEL}>
                {PHONE_DISPLAY}
              </a>
              <a className="c-card__value" href="tel:+8801732279155">
                +880 1732 279155
              </a>
              <a className="c-card__value" href="tel:+8801924304304">
                +880 1924 304304
              </a>
              <a className="c-card__link" href={PHONE_TEL}>
                Call now →
              </a>
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift as="article" className="c-card" style={{ height: "100%" }}>
              {icon("whatsapp")}
              <h2 className="c-card__label">WhatsApp</h2>
              <p className="c-card__value">{PHONE_DISPLAY}</p>
              <p className="c-card__value">Fastest for bookings and airport pickup</p>
              <a className="c-card__link" href={WHATSAPP_URL} target="_blank" rel="noopener">
                Open WhatsApp →
              </a>
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift as="article" className="c-card" style={{ height: "100%" }}>
              {icon("email")}
              <h2 className="c-card__label">Email</h2>
              <p className="c-card__value">{EMAIL}</p>
              <p className="c-card__value">For bookings, events and general questions</p>
              <a className="c-card__link" href={EMAIL_HREF}>
                Send an email →
              </a>
            </HoverLift>
          </StaggerItem>
          <StaggerItem>
            <HoverLift as="article" className="c-card" style={{ height: "100%" }}>
              {icon("visit")}
              <h2 className="c-card__label">Visit</h2>
              <p className="c-card__value">House 12, Road 68/A</p>
              <p className="c-card__value">Gulshan-2, Dhaka 1212, Bangladesh</p>
              <a className="c-card__link" href={MAPS_URL} target="_blank" rel="noopener">
                Open in Google Maps →
              </a>
            </HoverLift>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ===== Form + map ===== */}
      <section className="c-main" id="message">
        <div className="wrap">
          <div className="c-form-col">
            <Reveal as="p" className="eyebrow">
              send a message
            </Reveal>
            <RevealText className="h-sub">
              Write to <span className="it-lg">us</span>
            </RevealText>
            <ContactForm />
          </div>

          <div className="c-map-col">
            {/* Interactive Google Map (replaces the reference's static map image + pin) */}
            <ImageReveal className="c-map">
              <GoogleMap />
            </ImageReveal>
            <Reveal delay={0.15}>
              <dl className="c-facts">
                <div>
                  <dt>From the airport</dt>
                  <dd>4.7 km · ~15 min · free hotel pickup</dd>
                </div>
                <div>
                  <dt>Reception</dt>
                  <dd>Open 24 hours, every day</dd>
                </div>
                <div>
                  <dt>Check-in / check-out</dt>
                  <dd>12:00 noon</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq />
    </main>
  );
}
