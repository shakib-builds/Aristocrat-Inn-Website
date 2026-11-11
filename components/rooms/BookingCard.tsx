"use client";

import { onDateBlur, onDateFocus } from "@/components/BookingBar";
import { Fade } from "@/components/rooms/motion-bits";
import { WHATSAPP_URL } from "@/lib/site";

/**
 * Sticky "Book this room" card. Only fades (opacity) so no transform ever
 * lands on the sticky element or its ancestors.
 */
export default function BookingCard({ room, price }: { room: string; price: string }) {
  // Encode the apostrophe too, so the server HTML and the browser agree on the URL.
  const message = encodeURIComponent(`Hi, I'd like to ask about the ${room} room.`).replace(/'/g, "%27");
  const whatsappAsk = `${WHATSAPP_URL}?text=${message}`;
  return (
    <Fade as="aside" className="rd-card" aria-label="Book this room" delay={0.15}>
      <form action="/booking" method="get">
        <input type="hidden" name="room" value={room} />
        <div className="price">
          <p className="price__from">FROM</p>
          <p className="rd-card__amount">
            <span>{price}</span> <span className="rd-card__per">/ night</span>
          </p>
          <p className="rd-card__note">Per room · buffet breakfast included</p>
        </div>
        <div className="rd-card__dates">
          <label className="rd-field">
            <span className="rd-field__label">Check-in</span>
            <input
              className="rd-field__input"
              type="text"
              name="checkin"
              placeholder="Add date"
              onFocus={onDateFocus}
              onBlur={onDateBlur}
            />
          </label>
          <label className="rd-field">
            <span className="rd-field__label">Check-out</span>
            <input
              className="rd-field__input"
              type="text"
              name="checkout"
              placeholder="Add date"
              onFocus={onDateFocus}
              onBlur={onDateBlur}
            />
          </label>
        </div>
        <label className="rd-field">
          <span className="rd-field__label">Guests</span>
          <select className="rd-field__input" name="guests" defaultValue="2 adults · 1 room">
            <option>1 adult · 1 room</option>
            <option>2 adults · 1 room</option>
            <option>2 adults · 2 rooms</option>
            <option>3 adults · 2 rooms</option>
            <option>4 adults · 2 rooms</option>
          </select>
        </label>
        <button className="btn btn--primary" type="submit">
          Check availability
        </button>
        <a className="btn btn--outline" href={whatsappAsk} target="_blank" rel="noopener">
          Ask on WhatsApp
        </a>
        <ul className="rd-card__assure">
          <li>
            <span aria-hidden="true">✓</span>Free cancellation up to 24 hours before arrival
          </li>
          <li>
            <span aria-hidden="true">✓</span>Free airport pickup – send your flight number
          </li>
          <li>
            <span aria-hidden="true">✓</span>We confirm your booking by phone or email
          </li>
        </ul>
      </form>
    </Fade>
  );
}
