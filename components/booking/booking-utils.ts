import type { StaticImageData } from "next/image";
import roomDeluxe from "@/public/assets/img/room-deluxe.jpg";
import roomSuperDeluxe from "@/public/assets/img/room-super-deluxe.jpg";
import bookingRoom from "@/public/assets/img/booking-room.jpg";
import roomTwin from "@/public/assets/img/room-aristocrat-twin.jpg";
import roomSuite from "@/public/assets/img/room-aristocrat-suite.jpg";

/** Nightly rates (as on the Home room cards) and the summary photo per room type. */
export const ROOMS: Record<string, { price: number; img: StaticImageData }> = {
  Deluxe: { price: 6500, img: roomDeluxe },
  "Super Deluxe": { price: 7500, img: roomSuperDeluxe },
  "Aristocrat Deluxe": { price: 8500, img: bookingRoom },
  "Aristocrat Deluxe (Twin)": { price: 9000, img: roomTwin },
  "Aristocrat Suite": { price: 12000, img: roomSuite },
};
export const ROOM_OPTIONS = Object.keys(ROOMS);

export const COUNTRIES: [code: string, label: string][] = [
  ["+880", "+880 Bangladesh"],
  ["+91", "+91 India"],
  ["+977", "+977 Nepal"],
  ["+94", "+94 Sri Lanka"],
  ["+92", "+92 Pakistan"],
  ["+86", "+86 China"],
  ["+81", "+81 Japan"],
  ["+82", "+82 South Korea"],
  ["+65", "+65 Singapore"],
  ["+60", "+60 Malaysia"],
  ["+66", "+66 Thailand"],
  ["+971", "+971 UAE"],
  ["+966", "+966 Saudi Arabia"],
  ["+974", "+974 Qatar"],
  ["+44", "+44 United Kingdom"],
  ["+49", "+49 Germany"],
  ["+33", "+33 France"],
  ["+31", "+31 Netherlands"],
  ["+1", "+1 USA / Canada"],
  ["+61", "+61 Australia"],
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const pad = (n: number) => String(n).padStart(2, "0");
export const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export function parseDate(v: string | null | undefined): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || "");
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return d.getMonth() === +m[2] - 1 ? d : null;
}
export function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
export const money = (n: number) => "BDT " + n.toLocaleString("en-US");
export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function nightsBetween(a: Date | null, b: Date | null) {
  if (!a || !b) return 0;
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export function formatRange(a: Date | null, b: Date | null) {
  if (!a || !b) return "";
  const day = (d: Date) => d.getDate();
  if (a.getFullYear() === b.getFullYear()) {
    if (a.getMonth() === b.getMonth())
      return `${day(a)} – ${day(b)} ${MONTHS[b.getMonth()]} ${b.getFullYear()}`;
    return `${day(a)} ${MONTHS[a.getMonth()]} – ${day(b)} ${MONTHS[b.getMonth()]} ${b.getFullYear()}`;
  }
  return `${day(a)} ${MONTHS[a.getMonth()]} ${a.getFullYear()} – ${day(b)} ${MONTHS[b.getMonth()]} ${b.getFullYear()}`;
}

/** "Aristocrat Deluxe" → ["Aristocrat", "Deluxe"]; the last part gets the serif italic accent. */
export function splitRoomTitle(name: string): [string, string] {
  const twin = name.match(/^(.*) (\(Twin\))$/);
  if (twin) return [twin[1], twin[2]];
  const i = name.lastIndexOf(" ");
  return i < 0 ? ["", name] : [name.slice(0, i), name.slice(i + 1)];
}

/* ---------- form values + validation (same rules as the reference booking.js) ---------- */
export type Values = {
  checkin: string;
  checkout: string;
  room: string;
  rooms: string;
  guests: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  flight: string;
  arrival: string;
  requests: string;
};
export const ORDER = ["checkin", "checkout", "room", "name", "email", "phone"] as const;
export type CheckedKey = (typeof ORDER)[number];
export type Errors = Partial<Record<CheckedKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const RULES: Record<CheckedKey, (v: Values) => string> = {
  checkin(v) {
    const d = parseDate(v.checkin);
    if (!d) return "Please choose a check-in date";
    if (d < today()) return "Check-in can’t be in the past";
    return "";
  },
  checkout(v) {
    const b = parseDate(v.checkout);
    if (!b) return "Please choose a check-out date";
    const a = parseDate(v.checkin);
    if (a && b <= a) return "Check-out must be after check-in";
    return "";
  },
  room: (v) => (v.room ? "" : "Please choose a room type"),
  name: (v) => (v.name.trim().length >= 2 ? "" : "Please enter your full name"),
  email(v) {
    const e = v.email.trim();
    if (!e) return "Please enter your email";
    return EMAIL_RE.test(e) ? "" : "Enter a valid email, e.g. name@email.com";
  },
  phone(v) {
    const p = v.phone.trim();
    if (!p) return "Please enter a phone or WhatsApp number";
    if (/[^\d\s()+-]/.test(p)) return "Use digits only, e.g. 1712 345678";
    const digits = p.replace(/\D/g, "").length;
    if (digits < 7) return "Phone number looks too short";
    if (digits > 15) return "Phone number looks too long";
    return "";
  },
};

export function validate(values: Values, keys: readonly CheckedKey[], prev: Errors = {}): Errors {
  const next: Errors = { ...prev };
  keys.forEach((k) => {
    const msg = RULES[k](values);
    if (msg) next[k] = msg;
    else delete next[k];
  });
  return next;
}

export const DEFAULT_VALUES: Values = {
  checkin: "",
  checkout: "",
  room: "Aristocrat Deluxe",
  rooms: "1",
  guests: "2",
  name: "",
  email: "",
  country: "+880",
  phone: "",
  flight: "",
  arrival: "",
  requests: "",
};

/** Values prefilled from the URL (Home booking bar / room cards). */
export function prefillFromQuery(query: string): Partial<Values> {
  const v: Partial<Values> = {};
  const params = new URLSearchParams(query);
  const qRoom = (params.get("room") || "").trim().toLowerCase();
  if (qRoom) {
    const match = ROOM_OPTIONS.find((r) => r.toLowerCase() === qRoom);
    if (match) v.room = match;
  }
  const qGuests = parseInt(params.get("guests") || "", 10); // "2 guests" → 2
  if (qGuests >= 1 && qGuests <= 6) v.guests = String(qGuests);
  (["checkin", "checkout"] as const).forEach((k) => {
    const d = parseDate(params.get(k));
    if (d) v[k] = iso(d);
  });
  return v;
}
