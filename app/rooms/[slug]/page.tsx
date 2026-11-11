import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { Fade, StaggerGroup } from "@/components/rooms/motion-bits";
import RoomGallery from "@/components/rooms/RoomGallery";
import BookingCard from "@/components/rooms/BookingCard";
import { ROOMS, getRoom, roomHref } from "@/lib/rooms";
import "./page.css";

/* One static page per room type: /rooms/deluxe, /rooms/super-deluxe, … */
export const dynamicParams = false;

export function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rooms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return {
    title: `${room.name} room`,
    description: `${room.lead} From ${room.price} per night with buffet breakfast, in Gulshan-2, Dhaka.`,
  };
}

const IN_ROOM_SHARED = [
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

export default async function RoomDetailPage({ params }: PageProps<"/rooms/[slug]">) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const inRoom = [["bed", room.bedFeature] as const, ...IN_ROOM_SHARED];
  const others = ROOMS.filter((r) => r.slug !== room.slug);

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
              <span aria-current="page">{room.name}</span>
            </Fade>
            <RevealText as="h1" className="rd-title__name" onLoad>
              {room.namePlain}
              <span className="it-lg">{room.nameItalic}</span>
            </RevealText>
            <Reveal as="p" className="rd-title__lead" delay={0.2}>
              {room.lead}
            </Reveal>
          </div>
          <Stagger as="ul" className="rd-chips" stagger={0.07}>
            {room.chips.map((chip) => (
              <StaggerItem as="li" key={chip}>
                {chip}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== Photo gallery + lightbox ===== */}
      <RoomGallery photos={room.photos} imgClassName={room.imgClassName} />

      {/* ===== Content + booking card ===== */}
      <section className="rd-body">
        <div className="wrap">
          <div className="rd-content">
            <div className="rd-block">
              <RevealText className="rd-h">
                About this <span className="it">room</span>
              </RevealText>
              <Reveal as="p" className="rd-about" delay={0.1}>
                {room.about}
              </Reveal>
              <StaggerGroup as="dl" className="rd-facts">
                {room.facts.map(([label, value]) => (
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
                {inRoom.map(([icon, label]) => (
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

          <BookingCard room={room.name} price={room.price} />
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
            {others.map((r, i) => (
              <StaggerItem as="article" className="mini-room" key={r.slug}>
                <Link className="mini-room__img" href={roomHref(r.slug)} tabIndex={-1} aria-hidden="true">
                  <ImageReveal style={{ position: "absolute", inset: 0 }} delay={0.08 * i}>
                    <Image
                      className={r.imgClassName}
                      src={r.photos[0].src}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(max-width: 760px) 100vw, (max-width: 1280px) 50vw, 330px"
                    />
                  </ImageReveal>
                </Link>
                <h3 className="mini-room__name">
                  {r.namePlain}
                  <span className="it">{r.nameItalic}</span>
                </h3>
                <div className="mini-room__meta">
                  <span>{r.bed}</span>
                  <span>From {r.price}</span>
                </div>
                <Link className="mini-room__link" href={roomHref(r.slug)}>
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
