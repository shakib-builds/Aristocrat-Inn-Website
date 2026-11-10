import Image from "next/image";
import { Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { GOOGLE_REVIEWS_URL } from "@/lib/site";
import avatarOlivia from "@/public/assets/img/avatar-olivia.jpg";
import avatarSamir from "@/public/assets/img/avatar-samir.jpg";
import avatarHannah from "@/public/assets/img/avatar-hannah.jpg";

const PLATFORMS = [
  ["Google", "— / 5  ·  add score"],
  ["Booking.com", "— / 10  ·  add score"],
  ["Tripadvisor", "— / 5  ·  add score"],
] as const;

const QUOTES = [
  {
    text: "“Landed at 2 a.m. and the driver was already waiting at the airport booth with my name. The area feels very safe, and the staff helped me with my visa on arrival too. Will stay here again on my next trip to Dhaka.”",
    avatar: avatarOlivia,
    name: "Olivia R.",
    src: "Google · October 2026",
  },
  {
    text: "“Clean, quiet Super Deluxe room and a really good breakfast buffet on the rooftop. The live BBQ in the evening was a nice surprise. Walking distance to Gulshan 2 and the park.”",
    avatar: avatarSamir,
    name: "Samir K.",
    src: "Booking.com · September 2026",
  },
  {
    text: "“Stayed four nights for work. Fast Wi-Fi, a proper desk in the room and the business centre was open late. We also held a small team dinner in the banquet hall – everything was well organised.”",
    avatar: avatarHannah,
    name: "Hannah J.",
    src: "Tripadvisor · August 2026",
  },
];

export default function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="wrap">
        <div className="reviews__summary">
          <div>
            <Reveal as="p" className="eyebrow">
              guest reviews
            </Reveal>
            <RevealText className="reviews__title" style={{ marginTop: 12 }}>
              What our <span className="it">guests say</span>
            </RevealText>
          </div>
          <Reveal delay={0.2}>
            <div className="score">
              <span className="score__big">8.2</span>
              <span className="score__of">/ 10</span>
            </div>
            <p className="score__note">“Very good” · based on 56 verified guest reviews</p>
            <div className="platforms">
              {PLATFORMS.map(([name, score]) => (
                <div className="platform" key={name}>
                  <span>{name}</span>
                  <span>{score}</span>
                </div>
              ))}
            </div>
            <a className="btn btn--outline" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">
              Read all reviews on Google
            </a>
          </Reveal>
        </div>

        <Stagger className="quotes" stagger={0.15}>
          {QUOTES.map((q) => (
            <StaggerItem as="figure" className="quote" style={{ margin: 0 }} key={q.name}>
              <div className="stars" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Image key={n} src="/assets/icons/star.svg" width={16} height={16} alt="" unoptimized />
                ))}
              </div>
              <blockquote className="quote__text" style={{ margin: 0 }}>
                {q.text}
              </blockquote>
              <figcaption className="guest">
                <Image src={q.avatar} alt="" sizes="44px" placeholder="blur" />
                <div>
                  <p className="guest__name">{q.name}</p>
                  <p className="guest__src">{q.src}</p>
                </div>
              </figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
