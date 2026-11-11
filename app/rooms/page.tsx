import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingBar from "@/components/BookingBar";
import { CtaBanner } from "@/components/shared";
import { Parallax, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { Fade, StaggerGroup, StaggerRow } from "@/components/rooms/motion-bits";
import RoomRow, { type Room } from "@/components/rooms/RoomRow";
import { bookRoomHref } from "@/lib/site";
import { roomHref } from "@/lib/rooms";
import heroImg from "@/public/assets/img/cta-bedroom.jpg";
import roomDeluxe from "@/public/assets/img/room-deluxe.jpg";
import roomSuperDeluxe from "@/public/assets/img/room-super-deluxe.jpg";
import roomAristocratDeluxe from "@/public/assets/img/room-aristocrat-deluxe.jpg";
import roomAristocratTwin from "@/public/assets/img/room-aristocrat-twin.jpg";
import roomAristocratSuite from "@/public/assets/img/room-aristocrat-suite.jpg";
import "./page.css";

export const metadata: Metadata = {
  title: "Rooms & suites",
  description:
    "Five room types in Gulshan-2’s diplomatic zone. Every stay includes buffet breakfast, airport pickup and 50 Mbps Wi-Fi.",
};

const DETAIL_HREF = roomHref("aristocrat-deluxe");

const INCLUDED = [
  "Buffet breakfast at the rooftop restaurant",
  "Welcome drink, flower & fruit basket",
  "Free airport pickup",
  "Free newspaper",
  "Wi-Fi up to 50 Mbps",
  "24-hour doctor on call",
];

const ROOMS: Room[] = [
  {
    id: "deluxe",
    num: "01 / 05",
    name: <span className="it">Deluxe</span>,
    img: roomDeluxe,
    alt: "Deluxe room with a large bed",
    desc: "A calm, well-priced base in Gulshan-2 with a large bed, a work desk and everything you need for a short stay.",
    bed: "Large bed",
    idealFor: "Short stays · solo travellers",
    price: "BDT 6,500",
    detailsHref: roomHref("deluxe"),
    bookHref: bookRoomHref("Deluxe"),
  },
  {
    id: "super-deluxe",
    num: "02 / 05",
    name: ["Super ", <span key="it" className="it">Deluxe</span>],
    img: roomSuperDeluxe,
    alt: "Super Deluxe room with a king-size bed",
    desc: "More room to settle in, with a king-size bed and warm, quiet interiors – a comfortable choice for longer trips.",
    bed: "King-size bed",
    idealFor: "Longer stays · couples",
    price: "BDT 7,500",
    detailsHref: roomHref("super-deluxe"),
    bookHref: bookRoomHref("Super Deluxe"),
  },
  {
    id: "aristocrat-deluxe",
    num: "03 / 05",
    name: ["Aristocrat ", <span key="it" className="it">Deluxe</span>],
    img: roomAristocratDeluxe,
    alt: "Aristocrat Deluxe room with a large king-size bed",
    desc: "Our signature room, with a large king-size bed, a proper work desk and elegant interiors. Some rooms overlook the city greenery.",
    bed: "Large king-size bed",
    idealFor: "Business stays · couples",
    price: "BDT 8,500",
    detailsHref: DETAIL_HREF,
    bookHref: bookRoomHref("Aristocrat Deluxe"),
  },
  {
    id: "aristocrat-deluxe-twin",
    num: "04 / 05",
    name: ["Aristocrat Deluxe ", <span key="it" className="it">(Twin)</span>],
    img: roomAristocratTwin,
    alt: "Aristocrat Deluxe Twin room with two beds",
    desc: "Two beds in one spacious room – ideal for colleagues or friends travelling together.",
    bed: "Two beds",
    idealFor: "Colleagues · friends",
    price: "BDT 9,000",
    detailsHref: roomHref("aristocrat-deluxe-twin"),
    bookHref: bookRoomHref("Aristocrat Deluxe (Twin)"),
  },
  {
    id: "aristocrat-suite",
    num: "05 / 05",
    name: ["Aristocrat ", <span key="it" className="it">Suite</span>],
    img: roomAristocratSuite,
    imgClassName: "pos-suite",
    alt: "Aristocrat Suite sitting area",
    desc: "Our largest room, with a separate sitting area for a small meeting, a family evening or simply more space.",
    bed: "King-size bed · sitting area",
    idealFor: "Families · small meetings",
    price: "BDT 12,000",
    detailsHref: roomHref("aristocrat-suite"),
    bookHref: bookRoomHref("Aristocrat Suite"),
  },
];

const COMPARE_ROWS = [
  ["Bed", "Large bed", "King-size", "Large king-size", "Two beds", "King-size"],
  ["Sitting area", "—", "—", "—", "—", "Separate sitting area"],
  ["Ideal for", "Short stays", "Longer stays", "Business & couples", "Colleagues & friends", "Families & meetings"],
];
const COMPARE_PRICES = ["BDT 6,500", "BDT 7,500", "BDT 8,500", "BDT 9,000", "BDT 12,000"];

const AMENITIES = [
  ["rooms-ac", "Split air conditioning"],
  ["rooms-tv", '32" LED / LCD TV'],
  ["rooms-globe", "International channels"],
  ["rooms-minibar", "Mini bar"],
  ["rooms-wifi", "Wi-Fi up to 50 Mbps"],
  ["rooms-phone", "Intercom with local & international dialling"],
  ["rooms-desk", "Work desk"],
] as const;

const POLICIES = [
  [
    "CHECK-IN & CHECK-OUT",
    "12:00 noon",
    "Early arrival is guaranteed only when the room is reserved from the previous night.",
  ],
  ["LATE CHECK-OUT", "On request", "Check-out after 12:00 noon is chargeable and subject to availability."],
  [
    "CANCELLATION",
    "Free up to 24 hours",
    "Cancel at least 24 hours before arrival. Otherwise, one night’s room charge applies for a no-show.",
  ],
] as const;

export default function RoomsPage() {
  return (
    <main id="top" className="page-rooms">
      {/* ===== Page hero ===== */}
      <section className="page-hero">
        <div className="page-hero__inner">
          <div className="page-hero__bg">
            <Parallax className="page-hero__parallax" distance={80}>
              <Image src={heroImg} alt="" fill sizes="100vw" placeholder="blur" preload />
            </Parallax>
          </div>
          <div className="page-hero__heading">
            <Fade as="nav" className="crumbs crumbs--light" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Rooms</span>
            </Fade>
            <RevealText as="h1" className="page-hero__title" onLoad>
              Rooms &amp; <span className="it-lg">suites</span>
            </RevealText>
            <Reveal as="p" className="page-hero__lead" delay={0.25}>
              Five room types in Gulshan-2’s diplomatic zone. Every stay includes buffet breakfast,
              airport pickup and 50 Mbps Wi-Fi.
            </Reveal>
          </div>

          <Reveal delay={0.4} style={{ position: "relative" }}>
            <BookingBar />
          </Reveal>
        </div>
      </section>

      {/* ===== Included with every stay ===== */}
      <section className="included">
        <div className="wrap">
          <div className="included__intro">
            <Reveal as="p" className="eyebrow">
              included with every stay
            </Reveal>
            <RevealText className="h-sub">
              More than <span className="it">a room</span>
            </RevealText>
          </div>
          <Stagger as="ul" className="checklist" stagger={0.07}>
            {INCLUDED.map((item) => (
              <StaggerItem as="li" key={item}>
                <Image src="/assets/icons/rooms-check.svg" width={20} height={20} alt="" unoptimized />
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== Room list ===== */}
      <section className="room-list" id="room-list">
        <div className="wrap">
          <div className="room-list__head">
            <RevealText className="h-sub">
              Choose your <span className="it">room</span>
            </RevealText>
            <Reveal as="p" delay={0.15}>
              5 room types &nbsp;·&nbsp; prices per room per night, breakfast included
            </Reveal>
          </div>

          {ROOMS.map((room) => (
            <RoomRow key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* ===== Compare rooms ===== */}
      <section className="compare tint">
        <div className="wrap">
          <div className="block-head">
            <Reveal as="p" className="eyebrow">
              compare at a glance
            </Reveal>
            <RevealText className="h-sub">
              Find the right <span className="it">room</span>
            </RevealText>
            <Reveal as="p" className="block-head__lead" delay={0.2}>
              All rooms include buffet breakfast, Wi-Fi, a welcome drink and fruit basket, and free
              airport pickup.
            </Reveal>
          </div>
          <div
              className="compare__scroll"
              tabIndex={0}
              role="region"
              aria-label="Room comparison table"
            >
              <StaggerGroup as="table" className="compare__table" stagger={0.08}>
                <thead>
                  <StaggerRow>
                    <td></td>
                    <th scope="col">
                      <Link href={roomHref("deluxe")}>Deluxe</Link>
                    </th>
                    <th scope="col">
                      <Link href={roomHref("super-deluxe")}>Super Deluxe</Link>
                    </th>
                    <th scope="col">
                      <Link href={DETAIL_HREF}>Aristocrat Deluxe</Link>
                    </th>
                    <th scope="col">
                      <Link href={roomHref("aristocrat-deluxe-twin")}>Aristocrat Deluxe (Twin)</Link>
                    </th>
                    <th scope="col">
                      <Link href={roomHref("aristocrat-suite")}>Aristocrat Suite</Link>
                    </th>
                  </StaggerRow>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(([label, ...cells]) => (
                    <StaggerRow key={label}>
                      <th scope="row">{label}</th>
                      {cells.map((c, i) => (
                        <td key={i}>{c}</td>
                      ))}
                    </StaggerRow>
                  ))}
                  <StaggerRow className="compare__price">
                    <th scope="row">From / night</th>
                    {COMPARE_PRICES.map((p) => (
                      <td key={p}>{p}</td>
                    ))}
                  </StaggerRow>
                </tbody>
              </StaggerGroup>
            </div>
        </div>
      </section>

      {/* ===== In every room ===== */}
      <section className="every-room">
        <div className="wrap">
          <div className="block-head">
            <Reveal as="p" className="eyebrow">
              in-room amenities
            </Reveal>
            <RevealText className="h-sub">
              In every <span className="it">room</span>
            </RevealText>
          </div>
          <Stagger as="ul" className="amenity-grid" stagger={0.07}>
            {AMENITIES.map(([icon, label]) => (
              <StaggerItem as="li" key={icon}>
                <Image src={`/assets/icons/${icon}.svg`} width={28} height={28} alt="" unoptimized />
                {label}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== Good to know ===== */}
      <section className="policies tint">
        <div className="wrap">
          <div className="block-head">
            <Reveal as="p" className="eyebrow">
              before you book
            </Reveal>
            <RevealText className="h-sub">
              Good to <span className="it">know</span>
            </RevealText>
          </div>
          <Stagger className="policy-cards" stagger={0.12}>
            {POLICIES.map(([label, value, text]) => (
              <StaggerItem as="article" className="policy-card" key={label}>
                <p className="policy-card__label">{label}</p>
                <p className="policy-card__value">{value}</p>
                <p className="policy-card__text">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
