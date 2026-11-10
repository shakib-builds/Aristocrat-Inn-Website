// Contact details and links used across the site.
export const PHONE_DISPLAY = "+880 1817 019200";
export const PHONE_TEL = "tel:+8801817019200";
export const WHATSAPP_URL = "https://wa.me/8801817019200";
export const EMAIL = "a_inn@hotmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;
/** Google Maps search that resolves to the hotel's real listing ("Hotel Aristocrat Inn Ltd"). */
export const MAPS_QUERY = "Hotel Aristocrat Inn, House 12, Road 68A, Gulshan 2, Dhaka 1212";
export const MAPS_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
export const FACEBOOK_URL = "https://www.facebook.com/";
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Hotel+Aristocrat+Inn+Gulshan+reviews";

export const ROOM_NAMES = [
  "Deluxe",
  "Super Deluxe",
  "Aristocrat Deluxe",
  "Aristocrat Deluxe (Twin)",
  "Aristocrat Suite",
] as const;

/** Link to the booking page with a room preselected. */
export const bookRoomHref = (room: string) =>
  `/booking?room=${encodeURIComponent(room).replace(/%20/g, "+")}`;

export const NAV_LINKS = [
  { href: "/rooms", label: "Rooms" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/conference", label: "Conference" },
  { href: "/booking", label: "Booking" },
  { href: "/#facilities", label: "Facilities" },
  { href: "/contact", label: "Contact" },
] as const;
