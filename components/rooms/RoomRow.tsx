import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ImageReveal, Reveal, RevealText, StaggerItem } from "@/components/motion";
import { StaggerGroup } from "@/components/rooms/motion-bits";

export type Room = {
  id: string;
  num: string;
  name: ReactNode;
  img: StaticImageData;
  alt: string;
  imgClassName?: string;
  desc: string;
  bed: string;
  idealFor: string;
  price: string;
  /** "View room details" target. */
  detailsHref: string;
  bookHref: string;
  /** Room has its own detail page: photo + name link to it. */
  hasDetailPage?: boolean;
};

const SIZES = "(max-width: 1100px) calc(100vw - 80px), (max-width: 1280px) 42vw, 520px";

export default function RoomRow({ room }: { room: Room }) {
  const photo = (
    <Image
      className={room.imgClassName}
      src={room.img}
      alt={room.alt}
      fill
      sizes={SIZES}
      placeholder="blur"
    />
  );

  return (
    <article className="room-row" id={room.id}>
      {room.hasDetailPage ? (
        <Link
          className="room-row__img"
          href={room.detailsHref}
          aria-label="View Aristocrat Deluxe room details"
        >
          <ImageReveal style={{ position: "absolute", inset: 0 }}>{photo}</ImageReveal>
        </Link>
      ) : (
        <ImageReveal className="room-row__img">{photo}</ImageReveal>
      )}
      <div className="room-row__details">
        <Reveal as="p" className="room-row__num" y={16}>
          {room.num}
        </Reveal>
        <RevealText as="h3" className="room-row__name" delay={0.05}>
          {room.hasDetailPage ? <Link href={room.detailsHref}>{room.name}</Link> : room.name}
        </RevealText>
        <Reveal as="p" className="room-row__desc" delay={0.1}>
          {room.desc}
        </Reveal>
        <StaggerGroup as="dl" className="specs" stagger={0.1}>
          <StaggerItem>
            <dt>Bed</dt>
            <dd>{room.bed}</dd>
          </StaggerItem>
          <StaggerItem>
            <dt>Ideal for</dt>
            <dd>{room.idealFor}</dd>
          </StaggerItem>
        </StaggerGroup>
        <Reveal className="room-row__foot" delay={0.2}>
          <div className="price">
            <p className="price__from">FROM</p>
            <p className="price__amount">{room.price}</p>
            <p className="price__note">per night · incl. buffet breakfast</p>
          </div>
          <div className="room-row__actions">
            <Link className="btn btn--outline" href={room.detailsHref}>
              View room details
            </Link>
            <Link className="btn btn--primary" href={room.bookHref}>
              Book this room
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
