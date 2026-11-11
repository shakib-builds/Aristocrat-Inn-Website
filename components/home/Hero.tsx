import Image from "next/image";
import BookingBar from "@/components/BookingBar";
import { Parallax, RevealText } from "@/components/motion";
import { FadeIn } from "@/components/home/HomeMotion";
import hero from "@/public/assets/img/hero.jpg";

const INCLUSIONS = [
  "Complimentary buffet breakfast",
  "Free WiFi up to 50 Mbps",
  "Free airport pickup",
  "Welcome drink and fruit basket",
  "24-hour doctor on call",
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <Parallax className="hero__bg" distance={70}>
          <Image src={hero} alt="" sizes="100vw" placeholder="blur" preload fetchPriority="high" />
        </Parallax>
        <div className="hero__content">
          <div className="hero__text">
            <FadeIn className="hero__rating" onLoad delay={0.05}>
              ★ 8.2 / 10 · 56 verified guests
            </FadeIn>
            <RevealText as="h1" className="hero__title" onLoad delay={0.15}>
              A <span className="it">secure, friendly</span> stay in Gulshan’s diplomatic zone
            </RevealText>
            <FadeIn className="hero__value" onLoad delay={0.75}>
              <p>
                Buffet breakfast, airport pickup and WiFi up to 50 Mbps, <em>all included</em>
              </p>
            </FadeIn>
          </div>

          <FadeIn onLoad delay={0.95} y={24}>
            <BookingBar submitLabel="Book" />
            <FadeIn as="ul" className="inclusions" onLoad delay={1.2} y={12}>
              {INCLUSIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </FadeIn>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
