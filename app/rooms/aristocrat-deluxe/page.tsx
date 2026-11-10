import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ImageReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { Fade, StaggerGroup } from "@/components/rooms/motion-bits";
import RoomGallery, { type Photo } from "@/components/rooms/RoomGallery";
import BookingCard from "@/components/rooms/BookingCard";
import { bookRoomHref } from "@/lib/site";
import photo1 from "@/public/assets/img/room-aristocrat-deluxe.jpg";
import photo2 from "@/public/assets/img/room-aristocrat-deluxe-2.jpg";
import photo3 from "@/public/assets/img/room-aristocrat-deluxe-3.jpg";
import photo4 from "@/public/assets/img/room-aristocrat-deluxe-4.jpg";
import photo5 from "@/public/assets/img/room-aristocrat-deluxe-5.jpg";
import roomDeluxe from "@/public/assets/img/room-deluxe.jpg";
import roomSuperDeluxe from "@/public/assets/img/room-super-deluxe.jpg";
import roomAristocratTwin from "@/public/assets/img/room-aristocrat-twin.jpg";
import roomAristocratSuite from "@/public/assets/img/room-aristocrat-suite.jpg";
import "./page.css";

export const metadata: Metadata = {
  title: "Aristocrat Deluxe room",
  description:
    "Our signature room in Gulshan-2, Dhaka: a large king-size bed, a proper work desk and quiet, elegant interiors. From BDT 8,500 per night with buffet breakfast.",
};

const PHOTOS: Photo[] = [
  { src: photo1, alt: "Aristocrat Deluxe room with king-size bed, sitting bench and TV wall" },
  { src: photo2, alt: "Bed with bench and bedside lamps" },
  { src: photo3, alt: "King-size bed with upholstered headboard" },
  { src: photo4, alt: "Bed and wardrobe under a modern pendant light" },
  { src: photo5, alt: "Bed with wood-panelled wall" },
];

const CHIPS = ["Large king-size bed", "Work desk", "Breakfast included", "Wi-Fi 50 Mbps"];

const FACTS = [
  ["BED", "Large king-size"],
  ["ROOM TYPE", "Deluxe"],
  ["VIEW", "City greenery (selected rooms)"],
  ["CHECK-IN / OUT", "12:00 noon"],
] as const;

const IN_ROOM = [
  ["bed", "Large king-size bed"],
  ["ac", "Split air conditioning"],
  ["tv", '32" LCD TV'],
  ["globe", "International channels"],
  ["minibar", "Mini bar"],
  ["wifi", "Wi-Fi up to 50 Mbps"],
  ["phone", "Intercom with international dialling"],
  ["desk", "Work desk"],
] as const;

const INCLUDED = [
  "Buffet breakfast (Continental / Indian)",
  "Free airport pickup",
  "Welcome drink on arrival",
  "Flower & fruit basket",
  "Free newspaper",
  "24-hour doctor on call",
];

const POLICIES = [
  [
    "Check-in & check-out",
    "12:00 noon. Early arrival is guaranteed only when the room is reserved from the previous night.",
  ],
  ["Late check-out", "After 12:00 noon is chargeable and subject to availability."],
  [
    "Cancellation",
    "Free up to 24 hours before arrival. Otherwise, one night’s room charge applies for a no-show.",
  ],
] as const;

const OTHER_ROOMS: {
  room: string;
  name: ReactNode;
  img: StaticImageData;
  imgClassName?: string;
  bed: string;
  price: string;
}[] = [
  { room: "Deluxe", name: <span className="it">Deluxe</span>, img: roomDeluxe, bed: "Large bed", price: "From BDT 6,500" },
  {
    room: "Super Deluxe",
    name: (
      <>
        Super <span className="it">Deluxe</span>
      </>
    ),
    img: roomSuperDeluxe,
    bed: "King-size bed",
    price: "From BDT 7,500",
  },
  {
    room: "Aristocrat Deluxe (Twin)",
    name: (
      <>
        Aristocrat Deluxe <span className="it">(Twin)</span>
      </>
    ),
    img: roomAristocratTwin,
    bed: "Two beds",
    price: "From BDT 9,000",
  },
  {
    room: "Aristocrat Suite",
    name: (
      <>
        Aristocrat <span className="it">Suite</span>
      </>
    ),
    img: roomAristocratSuite,
    imgClassName: "pos-suite",
    bed: "King-size bed",
    price: "From BDT 12,000",
  },
];

export default function AristocratDeluxePage() {
  return (
    <main id="top" className="page-room-detail">
      {/* ===== Title area ===== */}
      <section className="rd-title">
        <div className="wrap">
          <div className="rd-title__heading">
            <Fade as="nav" className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/rooms">Rooms</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Aristocrat Deluxe</span>
            </Fade>
            <RevealText as="h1" className="rd-title__name" onLoad>
              Aristocrat <span className="it-lg">Deluxe</span>
            </RevealText>
            <Reveal as="p" className="rd-title__lead" delay={0.2}>
              Our signature room – a large king-size bed, a proper work desk and quiet, elegant
              interiors.
            </Reveal>
          </div>
          <Stagger as="ul" className="rd-chips" stagger={0.07}>
            {CHIPS.map((chip) => (
              <StaggerItem as="li" key={chip}>
                {chip}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== Photo gallery + lightbox ===== */}
      <RoomGallery photos={PHOTOS} />

      {/* ===== Content + booking card ===== */}
      <section className="rd-body">
        <div className="wrap">
          <div className="rd-content">
            <div className="rd-block">
              <RevealText className="rd-h">
                About this <span className="it">room</span>
              </RevealText>
              <Reveal as="p" className="rd-about" delay={0.1}>
                The Aristocrat Deluxe is our most balanced room for business and leisure. A large
                king-size bed, a proper work desk with international dialling and fast Wi-Fi make it
                easy to work and rest. A few rooms have a bird’s-eye view of the city greenery.
              </Reveal>
              <StaggerGroup as="dl" className="rd-facts">
                {FACTS.map(([label, value]) => (
                  <StaggerItem key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <div className="rd-block">
              <RevealText className="rd-h">
                In the <span className="it">room</span>
              </RevealText>
              <Stagger as="ul" className="rd-list rd-list--icons" stagger={0.06}>
                {IN_ROOM.map(([icon, label]) => (
                  <StaggerItem as="li" key={icon}>
                    <Image
                      src={`/assets/icons/room-detail-${icon}.svg`}
                      width={22}
                      height={22}
                      alt=""
                      unoptimized
                    />
                    {label}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="rd-block">
              <RevealText className="rd-h">
                Included with your <span className="it">stay</span>
              </RevealText>
              <Stagger as="ul" className="rd-list checklist" stagger={0.06}>
                {INCLUDED.map((item) => (
                  <StaggerItem as="li" key={item}>
                    <Image src="/assets/icons/rooms-check.svg" width={20} height={20} alt="" unoptimized />
                    {item}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <div className="rd-block">
              <RevealText className="rd-h">
                Good to <span className="it">know</span>
              </RevealText>
              <StaggerGroup as="dl" className="rd-policies" stagger={0.1}>
                {POLICIES.map(([label, text]) => (
                  <StaggerItem key={label}>
                    <dt>{label}</dt>
                    <dd>{text}</dd>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>

          <BookingCard />
        </div>
      </section>

      {/* ===== Other rooms ===== */}
      <section className="rd-other tint">
        <div className="wrap">
          <div className="rd-other__head">
            <RevealText className="h-sub">
              Other <span className="it">rooms</span>
            </RevealText>
            <Link className="text-link" href="/rooms">
              View all rooms →
            </Link>
          </div>
          <Stagger className="rd-other__cards" stagger={0.1}>
            {OTHER_ROOMS.map((r, i) => (
              <StaggerItem as="article" className="mini-room" key={r.room}>
                <Link className="mini-room__img" href={bookRoomHref(r.room)} tabIndex={-1} aria-hidden="true">
                  <ImageReveal style={{ position: "absolute", inset: 0 }} delay={0.08 * i}>
                    <Image
                      className={r.imgClassName}
                      src={r.img}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(max-width: 760px) 100vw, (max-width: 1280px) 50vw, 330px"
                    />
                  </ImageReveal>
                </Link>
                <h3 className="mini-room__name">{r.name}</h3>
                <div className="mini-room__meta">
                  <span>{r.bed}</span>
                  <span>{r.price}</span>
                </div>
                <Link className="mini-room__link" href={bookRoomHref(r.room)}>
                  View room →
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </main>
  );
}
