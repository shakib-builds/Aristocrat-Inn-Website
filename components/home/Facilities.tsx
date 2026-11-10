import Image from "next/image";
import { ImageReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import businessCentre from "@/public/assets/img/business-centre.jpg";

const FACILITIES = [
  ["Buffet breakfast at our rooftop restaurant", true, "cup"],
  ["Airport pickup and 24-hour airport booth", true, "car"],
  ["WiFi up to 50 Mbps in every room", true, "wifi"],
  ["24-hour business center and secretarial services", false, "briefcase"],
  ["24-hour doctor on call", false, "doctor"],
  ["Health club", false, "gym"],
  ["Visa on arrival and airport protocol service", false, "passport"],
] as const;

const ALSO = [
  "24-hour car service",
  "Concierge",
  "Laundry",
  "Safety lockers",
  "ISD telephone in rooms",
  "Air ticketing",
  "Sightseeing tours",
];

export default function Facilities() {
  return (
    <section className="facilities" id="facilities">
      <div className="wrap">
        <div className="facilities__title">
          <div>
            <RevealText className="h-display">
              Facilities &amp; <span className="it-lg">amenities</span>
            </RevealText>
            <Reveal as="p" delay={0.2}>
              Everything you need for a restful, productive and easy stay in Gulshan-2.
            </Reveal>
          </div>
          <ImageReveal className="facilities__img" style={{ position: "relative" }}>
            <Image
              src={businessCentre}
              alt="Business centre desk"
              sizes="(max-width: 1100px) 100vw, 460px"
              placeholder="blur"
            />
          </ImageReveal>
        </div>

        <div className="facilities__list">
          <Stagger as="ul" stagger={0.07}>
            {FACILITIES.map(([name, free, icon], i) => (
              <StaggerItem as="li" className="facility" key={name}>
                <span className="facility__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="facility__name">
                  {name}
                  {free && (
                    <>
                      {" "}
                      <span className="chip chip--soft">Complimentary</span>
                    </>
                  )}
                </span>
                <Image
                  className="facility__icon"
                  src={`/assets/icons/${icon}.svg`}
                  width={26}
                  height={26}
                  alt=""
                  unoptimized
                />
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="also" stagger={0.05}>
            <StaggerItem as="span" className="also__label">
              also at your service
            </StaggerItem>
            {ALSO.map((item) => (
              <StaggerItem as="span" className="chip chip--outline" key={item}>
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
