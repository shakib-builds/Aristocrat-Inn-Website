import GoogleMap from "@/components/GoogleMap";
import { Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { FadeIn } from "@/components/home/HomeMotion";
import { MAPS_URL } from "@/lib/site";

const LANDMARKS = [
  ["Hazrat Shahjalal International Airport", "4.7 km · ~15 min drive"],
  ["Gulshan Ladies Park", "2 min walk"],
  ["The American Club", "6 min walk"],
  ["United Hospital", "12 min walk"],
] as const;

export default function Location() {
  return (
    <section className="location" id="location">
      <div className="wrap">
        <div className="location__text">
          <div className="location__intro">
            <Reveal as="p" className="eyebrow">
              location
            </Reveal>
            <RevealText className="h-section">
              In the heart of the <span className="it-lg">diplomatic zone</span>
            </RevealText>
            <Reveal as="p" delay={0.2}>
              Gulshan-2 is one of Dhaka’s most secure areas, surrounded by embassies and international
              clubs. Everything you need is a short walk or drive away.
            </Reveal>
          </div>
          <Stagger as="ul" className="landmarks" stagger={0.08}>
            {LANDMARKS.map(([name, dist]) => (
              <StaggerItem as="li" className="landmark" key={name}>
                <span className="landmark__name">{name}</span>
                <span className="landmark__dist">{dist}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn as="a" className="btn btn--outline" href={MAPS_URL} target="_blank" rel="noopener" delay={0.2}>
            Open in Google Maps
          </FadeIn>
        </div>

        <Reveal className="map" delay={0.15} y={0}>
          <GoogleMap />
        </Reveal>
      </div>
    </section>
  );
}
