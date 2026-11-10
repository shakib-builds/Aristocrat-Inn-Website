import { MAPS_QUERY } from "@/lib/site";

const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&output=embed`;

/**
 * Interactive Google Map of the hotel's real listing (no API key needed).
 * Google's own card on the map shows the address, rating, "Open in Maps" and directions.
 * Fills its parent: the parent must be position: relative/absolute with a size
 * (the existing `.map` box already is).
 */
export default function GoogleMap({ title = "Hotel Aristocrat Inn on Google Maps" }: { title?: string }) {
  return (
    <iframe
      className="gmap"
      src={EMBED_SRC}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
