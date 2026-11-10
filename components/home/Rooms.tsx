import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ImageReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { bookRoomHref } from "@/lib/site";
import roomDeluxe from "@/public/assets/img/room-deluxe.jpg";
import roomSuperDeluxe from "@/public/assets/img/room-super-deluxe.jpg";
import roomAristocratDeluxe from "@/public/assets/img/room-aristocrat-deluxe.jpg";
import roomTwin from "@/public/assets/img/room-aristocrat-twin.jpg";
import roomSuite from "@/public/assets/img/room-aristocrat-suite.jpg";

type Room = {
  num: string;
  room: string;
  heading: ReactNode;
  img: StaticImageData;
  imgClass: string;
  alt: string;
  bed: string;
  price: string;
  offset?: string;
};

const ROW_3: Room[] = [
  {
    num: "01",
    room: "Deluxe",
    heading: <span className="it">Deluxe</span>,
    img: roomDeluxe,
    imgClass: "room__img--tall",
    alt: "Deluxe room with a large bed",
    bed: "Large bed",
    price: "From BDT 6,500 / night",
  },
  {
    num: "02",
    room: "Super Deluxe",
    heading: (
      <>
        Super <span className="it">Deluxe</span>
      </>
    ),
    img: roomSuperDeluxe,
    imgClass: "room__img--mid",
    alt: "Super Deluxe room with a king-size bed",
    bed: "King-size bed",
    price: "From BDT 7,500 / night",
    offset: "room--offset-120",
  },
  {
    num: "03",
    room: "Aristocrat Deluxe",
    heading: (
      <>
        Aristocrat <span className="it">Deluxe</span>
      </>
    ),
    img: roomAristocratDeluxe,
    imgClass: "room__img--tall",
    alt: "Aristocrat Deluxe room with a large king-size bed",
    bed: "Large king-size bed",
    price: "From BDT 8,500 / night",
    offset: "room--offset-40",
  },
];

const ROW_2: Room[] = [
  {
    num: "04",
    room: "Aristocrat Deluxe (Twin)",
    heading: (
      <>
        Aristocrat Deluxe <span className="it">(Twin)</span>
      </>
    ),
    img: roomTwin,
    imgClass: "room__img--wide",
    alt: "Aristocrat Deluxe Twin room with two beds",
    bed: "Two beds",
    price: "From BDT 9,000 / night",
  },
  {
    num: "05",
    room: "Aristocrat Suite",
    heading: (
      <>
        Aristocrat <span className="it">Suite</span>
      </>
    ),
    img: roomSuite,
    imgClass: "room__img--wide room__img--suite",
    alt: "Aristocrat Suite sitting area",
    bed: "King-size bed · sitting area",
    price: "From BDT 12,000 / night",
    offset: "room--offset-80",
  },
];

function RoomCard({ r, sizes }: { r: Room; sizes: string }) {
  return (
    <StaggerItem as="article" className={r.offset ? `room ${r.offset}` : "room"}>
      <ImageReveal className={`room__img ${r.imgClass}`} style={{ position: "relative" }}>
        <Image src={r.img} alt={r.alt} sizes={sizes} placeholder="blur" />
      </ImageReveal>
      <div className="room__title">
        <div className="room__name">
          <span className="room__num">{r.num}</span>
          <h3 className="room__heading">{r.heading}</h3>
        </div>
        <Link className="room__book" href={bookRoomHref(r.room)}>
          Book →
        </Link>
      </div>
      <div className="room__meta">
        <p className="room__bed">{r.bed}</p>
        <p className="room__price">{r.price}</p>
      </div>
    </StaggerItem>
  );
}

export default function Rooms() {
  return (
    <section className="rooms" id="rooms">
      <div className="wrap">
        <div className="rooms__head">
          <RevealText className="h-display">
            Rooms &amp; <span className="it-lg">suites</span>
          </RevealText>
          <Reveal className="rooms__intro" delay={0.2}>
            <p>
              Five room types, from a calm Deluxe to the Aristocrat Suite. Every stay includes buffet
              breakfast on the rooftop, 50 Mbps Wi-Fi, and a welcome drink and fruit basket.
            </p>
            <Link className="text-link" href="/rooms">
              Compare all rooms →
            </Link>
          </Reveal>
        </div>

        <div className="rooms__grid">
          <Stagger className="rooms__row rooms__row--3" stagger={0.14}>
            {ROW_3.map((r) => (
              <RoomCard key={r.num} r={r} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 440px" />
            ))}
          </Stagger>
          <Stagger className="rooms__row rooms__row--2" stagger={0.14}>
            {ROW_2.map((r) => (
              <RoomCard key={r.num} r={r} sizes="(max-width: 760px) 100vw, 680px" />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
