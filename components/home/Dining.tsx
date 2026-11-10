import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ImageReveal, Reveal, RevealText } from "@/components/motion";
import diningRooftop from "@/public/assets/img/dining-rooftop.jpg";
import diningRoom from "@/public/assets/img/dining-room.jpg";
import banquetHall from "@/public/assets/img/banquet-hall.jpg";
import banquetTable from "@/public/assets/img/banquet-table.jpg";
import lobby from "@/public/assets/img/lobby.jpg";
import balcony from "@/public/assets/img/balcony.jpg";

type Photo = { src: StaticImageData; alt: string; figClass?: string; imgClass?: string };
type Row = {
  title: ReactNode;
  text: string;
  href: string;
  cta: string;
  reverse?: boolean;
  photos: [Photo, Photo];
};

const ROWS: Row[] = [
  {
    title: (
      <>
        Atmosphere <span className="it-lg">Restaurant</span>
      </>
    ),
    text: "Open-air rooftop dining with city views. Buffet breakfast every morning, plus Continental, Live BBQ, Chinese, Thai, Italian, Indian and Bangladeshi menus.",
    href: "/restaurant",
    cta: "See menu & hours",
    photos: [
      { src: diningRooftop, alt: "Rooftop restaurant at sunset" },
      { src: diningRoom, alt: "Bright dining room" },
    ],
  },
  {
    title: (
      <>
        Royal Banquet &amp; <span className="it-lg">Conference</span>
      </>
    ),
    text: "Weddings, birthdays, private parties and corporate events for up to 150 guests. Digital and audio equipment is included, and our team helps you plan the day.",
    href: "/conference",
    cta: "Get an event quote",
    reverse: true,
    photos: [
      { src: banquetHall, alt: "Banquet hall with chandeliers", figClass: "shade", imgClass: "pos-banquet-hall" },
      {
        src: banquetTable,
        alt: "Banquet table setting",
        figClass: "shade shade-13",
        imgClass: "pos-banquet-table",
      },
    ],
  },
  {
    title: (
      <>
        Lobby &amp; <span className="it-lg">Balcony</span>
      </>
    ),
    text: "A spacious lobby and a balcony lounge on every floor: quiet spots for a small meeting or a relaxed evening.",
    href: "/contact",
    cta: "Ask about meeting space",
    photos: [
      { src: lobby, alt: "Spacious lobby", imgClass: "pos-lobby" },
      { src: balcony, alt: "Balcony lounge", figClass: "shade", imgClass: "pos-balcony" },
    ],
  },
];

export default function Dining() {
  return (
    <section className="dining" id="dining">
      <div className="wrap">
        <div className="dining__head">
          <Reveal as="p" className="eyebrow">
            dining &amp; events
          </Reveal>
          <RevealText className="h-section">
            Celebrate, meet <span className="it-lg">and feel at home</span>
          </RevealText>
        </div>

        <div className="dining__rows">
          {ROWS.map((row) => (
            <div className={row.reverse ? "dining-row dining-row--reverse" : "dining-row"} key={row.href}>
              <div className="dining-row__text">
                <RevealText as="h3" className="h-display">
                  {row.title}
                </RevealText>
                <Reveal className="dining-row__desc" delay={0.2}>
                  <p>{row.text}</p>
                  <Link className="btn btn--light" href={row.href}>
                    {row.cta}
                  </Link>
                </Reveal>
              </div>
              <div className="dining-row__imgs">
                {row.photos.map((p, i) => (
                  <figure className={p.figClass} key={p.alt}>
                    <ImageReveal style={{ position: "absolute", inset: 0 }} delay={i * 0.18}>
                      <Image
                        className={p.imgClass}
                        src={p.src}
                        alt={p.alt}
                        sizes="(max-width: 1100px) 50vw, 400px"
                        placeholder="blur"
                      />
                    </ImageReveal>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
