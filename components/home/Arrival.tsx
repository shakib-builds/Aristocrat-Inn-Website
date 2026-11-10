import Image from "next/image";
import { Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { FadeIn } from "@/components/home/HomeMotion";
import { WHATSAPP_URL } from "@/lib/site";

const STEPS = [
  {
    step: "Step 01",
    title: "Free airport ",
    it: "pickup",
    icon: "/assets/icons/car-large.svg",
    w: 45,
    h: 37.5,
    text: "Send your flight number when you book, or by WhatsApp. Pickup from Hazrat Shahjalal Airport, 4.7 km (about 15 minutes) away, is complimentary.",
  },
  {
    step: "Step 02",
    title: "Airport protocol ",
    it: "service",
    icon: "/assets/icons/passport-large.svg",
    w: 60,
    h: 60,
    text: "Our 24-hour airport booth helps with immigration, customs, visa on arrival and luggage clearance.",
  },
  {
    step: "Step 03",
    title: "Welcome at the ",
    it: "hotel",
    icon: "/assets/icons/welcome-large.svg",
    w: 60,
    h: 60,
    text: "Our driver brings you to Gulshan-2, where a welcome drink, fruit basket and free newspaper are waiting.",
  },
];

export default function Arrival() {
  return (
    <section className="arrival">
      <div className="wrap">
        <div className="section-head">
          <div className="section-head__text">
            <Reveal as="p" className="eyebrow">
              arriving in dhaka
            </Reveal>
            <RevealText className="h-section">
              We’ll meet you <span className="it-lg">at the airport</span>
            </RevealText>
          </div>
          <FadeIn as="a" className="btn btn--primary" href={WHATSAPP_URL} target="_blank" rel="noopener" delay={0.25}>
            Send your flight details
          </FadeIn>
        </div>

        <Stagger className="arrival__cards" stagger={0.15}>
          {STEPS.map((s) => (
            <StaggerItem as="article" className="arrival-card" key={s.step}>
              <div>
                <p className="arrival-card__step">{s.step}</p>
                <h3 className="arrival-card__title">
                  {s.title}
                  <span className="it">{s.it}</span>
                </h3>
              </div>
              <Image
                className="arrival-card__icon"
                src={s.icon}
                width={s.w}
                height={s.h}
                alt=""
                unoptimized
                // 37.5px is not an integer attribute; let the ratio give the same height.
                style={s.h % 1 ? { height: "auto" } : undefined}
              />
              <p className="arrival-card__text">{s.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
