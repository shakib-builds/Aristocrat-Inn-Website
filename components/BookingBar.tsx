"use client";

import type { FocusEvent } from "react";
import { ROOM_NAMES } from "@/lib/site";

/** Shows "Add date" until focused, then the native date picker. */
function onDateFocus(e: FocusEvent<HTMLInputElement>) {
  const input = e.currentTarget;
  input.type = "date";
  try {
    input.showPicker?.();
  } catch {
    /* not supported */
  }
}
function onDateBlur(e: FocusEvent<HTMLInputElement>) {
  if (!e.currentTarget.value) e.currentTarget.type = "text";
}

/** Hero booking bar (Home + Rooms). Submits to /booking with GET params. */
export default function BookingBar({ submitLabel = "Check availability" }: { submitLabel?: string }) {
  return (
    <form className="booking-bar" action="/booking" method="get">
      <div className="booking-bar__fields">
        <label className="field">
          <span className="field__label">Check-in</span>
          <input
            className="field__input"
            type="text"
            name="checkin"
            placeholder="Add date"
            onFocus={onDateFocus}
            onBlur={onDateBlur}
          />
        </label>
        <label className="field">
          <span className="field__label">Check-out</span>
          <input
            className="field__input"
            type="text"
            name="checkout"
            placeholder="Add date"
            onFocus={onDateFocus}
            onBlur={onDateBlur}
          />
        </label>
        <label className="field">
          <span className="field__label">Guests</span>
          <select className="field__input" name="guests" defaultValue="">
            <option value="">Add persons</option>
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4 guests</option>
          </select>
        </label>
        <label className="field">
          <span className="field__label">Room type</span>
          <select className="field__input" name="room" defaultValue="">
            <option value="">Any room</option>
            {ROOM_NAMES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>
      <button className="btn btn--primary" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}

export { onDateFocus, onDateBlur };
