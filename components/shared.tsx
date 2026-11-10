import Image from "next/image";
import Link from "next/link";
import { CountUp, Parallax, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";
import ctaBedroom from "@/public/assets/img/cta-bedroom.jpg";

/* ---------------- Stats band (Figma: Site / Stats band) ---------------- */
const STATS = [
  ["5", "Room types"],
  ["150", "Banquet guests"],
  ["24/7", "Airport pickup"],
  ["4.7 km", "To the airport"],
] as const;

export function StatsBand({
  items = STATS,
  className = "stats",
}: {
  items?: readonly (readonly [string, string])[];
  className?: string;
}) {
  return (
    <section className={className} aria-label="Hotel at a glance">
      <Stagger className="wrap" stagger={0.1}>
        {items.map(([num, label]) => (
          <StaggerItem className="stat" key={label}>
            <CountUp className="stat__num" value={num} />
            <p className="stat__label">{label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

/* ---------------- FAQ (Figma: Site / FAQ) ---------------- */
const FAQS = [
  [
    "Is airport pickup free?",
    "Yes. Pickup from Hazrat Shahjalal Airport, 4.7 km (about 15 minutes) away, is complimentary, and our airport booth is open 24 hours. Send your flight number when you book.",
  ],
  [
    "Can you help with a visa on arrival?",
    "Yes. Our airport protocol service helps with immigration, customs, visa on arrival and luggage clearance.",
  ],
  [
    "What are check-in and check-out times?",
    "Please contact us for current check-in and check-out times. We’re happy to arrange early arrival or late departure when rooms allow.",
  ],
  ["Is there WiFi in the rooms?", "Yes. Every room has free WiFi up to 50 Mbps."],
  [
    "Is breakfast included?",
    "Yes. A buffet breakfast at our rooftop restaurant is included with every stay.",
  ],
  [
    "Can you arrange transport and tours?",
    "Yes. We offer a 24-hour car service, air ticketing and sightseeing tours. Ask at the front desk or message us on WhatsApp.",
  ],
] as const;

export function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="faq__head">
          <Reveal as="p" className="eyebrow">
            good to know
          </Reveal>
          <RevealText className="h-section">
            Questions <span className="it-lg">before you book</span>
          </RevealText>
        </div>
        <Stagger className="faq__list" stagger={0.06}>
          {FAQS.map(([q, a], i) => (
            <StaggerItem key={q}>
              <details className="faq__item" open={i === 0}>
                <summary>{q}</summary>
                <p className="faq__answer">{a}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal as="p" className="faq__more">
          Still have a question? Message us on{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener">
            WhatsApp
          </a>{" "}
          or call <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA banner (Figma: Site / CTA banner) ---------------- */
export function CtaBanner() {
  return (
    <section className="cta">
      <Parallax className="cta__bg" distance={120}>
        <Image src={ctaBedroom} alt="" fill sizes="100vw" placeholder="blur" style={{ objectFit: "cover" }} />
      </Parallax>
      <div className="cta__content">
        <div>
          <RevealText className="cta__title">
            Your room in Gulshan-2, <span className="it">ready when you land</span>
          </RevealText>
          <Reveal as="p" className="cta__sub" delay={0.25} style={{ marginInline: "auto" }}>
            Send us your dates and flight number. We’ll confirm your room and have a driver waiting
            for you at Hazrat Shahjalal Airport.
          </Reveal>
        </div>
        <Reveal className="cta__actions" delay={0.4}>
          <Link className="btn btn--light btn--lg" href="/booking">
            Book your stay
          </Link>
          <a className="btn btn--ghost-light btn--lg" href={WHATSAPP_URL} target="_blank" rel="noopener">
            WhatsApp us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
