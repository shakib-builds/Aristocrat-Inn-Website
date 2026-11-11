import type { StaticImageData } from "next/image";
import roomDeluxe from "@/public/assets/img/room-deluxe.jpg";
import roomSuperDeluxe from "@/public/assets/img/room-super-deluxe.jpg";
import adPhoto1 from "@/public/assets/img/room-aristocrat-deluxe.jpg";
import adPhoto2 from "@/public/assets/img/room-aristocrat-deluxe-2.jpg";
import adPhoto3 from "@/public/assets/img/room-aristocrat-deluxe-3.jpg";
import adPhoto4 from "@/public/assets/img/room-aristocrat-deluxe-4.jpg";
import adPhoto5 from "@/public/assets/img/room-aristocrat-deluxe-5.jpg";
import roomTwin from "@/public/assets/img/room-aristocrat-twin.jpg";
import roomSuite from "@/public/assets/img/room-aristocrat-suite.jpg";

/**
 * The five room types. One source of truth for the Home rooms grid, the
 * Rooms page and the /rooms/[slug] detail pages.
 *
 * Only Aristocrat Deluxe has a Figma detail design and a 5-photo gallery;
 * the other rooms reuse that layout with the facts from the Rooms page.
 */
export type RoomPhoto = { src: StaticImageData; alt: string };

export type RoomInfo = {
  slug: string;
  /** Name as used in forms and the booking page ("Aristocrat Deluxe (Twin)"). */
  name: string;
  /** Display name split into the upright part and the italic serif part. */
  namePlain: string;
  nameItalic: string;
  photos: RoomPhoto[];
  /** Extra class for the cover photo crop. */
  imgClassName?: string;
  /** One-line intro under the page title. */
  lead: string;
  /** Short description used on the Rooms page. */
  desc: string;
  about: string;
  bed: string;
  idealFor: string;
  /** "BDT 8,500" */
  price: string;
  chips: string[];
  facts: [string, string][];
  /** First "In the room" line (the bed); the rest is shared. */
  bedFeature: string;
};

export const ROOMS: RoomInfo[] = [
  {
    slug: "deluxe",
    name: "Deluxe",
    namePlain: "",
    nameItalic: "Deluxe",
    photos: [{ src: roomDeluxe, alt: "Deluxe room with a large bed" }],
    lead: "A calm, well-priced base in Gulshan-2 – a large bed, a work desk and everything you need for a short stay.",
    desc: "A calm, well-priced base in Gulshan-2 with a large bed, a work desk and everything you need for a short stay.",
    about:
      "The Deluxe is our simplest way to stay in Gulshan-2’s diplomatic zone. A large bed, a work desk and fast Wi-Fi cover everything a short trip needs, and buffet breakfast on the rooftop and free airport pickup are included.",
    bed: "Large bed",
    idealFor: "Short stays · solo travellers",
    price: "BDT 6,500",
    chips: ["Large bed", "Work desk", "Breakfast included", "Wi-Fi 50 Mbps"],
    facts: [
      ["BED", "Large bed"],
      ["ROOM TYPE", "Deluxe"],
      ["IDEAL FOR", "Short stays · solo travellers"],
      ["CHECK-IN / OUT", "12:00 noon"],
    ],
    bedFeature: "Large bed",
  },
  {
    slug: "super-deluxe",
    name: "Super Deluxe",
    namePlain: "Super ",
    nameItalic: "Deluxe",
    photos: [{ src: roomSuperDeluxe, alt: "Super Deluxe room with a king-size bed" }],
    lead: "More room to settle in – a king-size bed and warm, quiet interiors for longer trips.",
    desc: "More room to settle in, with a king-size bed and warm, quiet interiors – a comfortable choice for longer trips.",
    about:
      "The Super Deluxe gives you more space to settle in. A king-size bed, warm and quiet interiors and a proper work desk make it a comfortable choice for longer stays, with buffet breakfast and free airport pickup included.",
    bed: "King-size bed",
    idealFor: "Longer stays · couples",
    price: "BDT 7,500",
    chips: ["King-size bed", "Work desk", "Breakfast included", "Wi-Fi 50 Mbps"],
    facts: [
      ["BED", "King-size"],
      ["ROOM TYPE", "Super Deluxe"],
      ["IDEAL FOR", "Longer stays · couples"],
      ["CHECK-IN / OUT", "12:00 noon"],
    ],
    bedFeature: "King-size bed",
  },
  {
    slug: "aristocrat-deluxe",
    name: "Aristocrat Deluxe",
    namePlain: "Aristocrat ",
    nameItalic: "Deluxe",
    photos: [
      { src: adPhoto1, alt: "Aristocrat Deluxe room with king-size bed, sitting bench and TV wall" },
      { src: adPhoto2, alt: "Bed with bench and bedside lamps" },
      { src: adPhoto3, alt: "King-size bed with upholstered headboard" },
      { src: adPhoto4, alt: "Bed and wardrobe under a modern pendant light" },
      { src: adPhoto5, alt: "Bed with wood-panelled wall" },
    ],
    lead: "Our signature room – a large king-size bed, a proper work desk and quiet, elegant interiors.",
    desc: "Our signature room, with a large king-size bed, a proper work desk and elegant interiors. Some rooms overlook the city greenery.",
    about:
      "The Aristocrat Deluxe is our most balanced room for business and leisure. A large king-size bed, a proper work desk with international dialling and fast Wi-Fi make it easy to work and rest. A few rooms have a bird’s-eye view of the city greenery.",
    bed: "Large king-size bed",
    idealFor: "Business stays · couples",
    price: "BDT 8,500",
    chips: ["Large king-size bed", "Work desk", "Breakfast included", "Wi-Fi 50 Mbps"],
    facts: [
      ["BED", "Large king-size"],
      ["ROOM TYPE", "Deluxe"],
      ["VIEW", "City greenery (selected rooms)"],
      ["CHECK-IN / OUT", "12:00 noon"],
    ],
    bedFeature: "Large king-size bed",
  },
  {
    slug: "aristocrat-deluxe-twin",
    name: "Aristocrat Deluxe (Twin)",
    namePlain: "Aristocrat Deluxe ",
    nameItalic: "(Twin)",
    photos: [{ src: roomTwin, alt: "Aristocrat Deluxe Twin room with two beds" }],
    lead: "Two beds in one spacious room – ideal for colleagues or friends travelling together.",
    desc: "Two beds in one spacious room – ideal for colleagues or friends travelling together.",
    about:
      "The Aristocrat Deluxe (Twin) puts two beds in one spacious room, so colleagues or friends can travel together comfortably. There is a work desk and fast Wi-Fi, and buffet breakfast and free airport pickup are included.",
    bed: "Two beds",
    idealFor: "Colleagues · friends",
    price: "BDT 9,000",
    chips: ["Two beds", "Work desk", "Breakfast included", "Wi-Fi 50 Mbps"],
    facts: [
      ["BEDS", "Two beds"],
      ["ROOM TYPE", "Deluxe Twin"],
      ["IDEAL FOR", "Colleagues · friends"],
      ["CHECK-IN / OUT", "12:00 noon"],
    ],
    bedFeature: "Two beds",
  },
  {
    slug: "aristocrat-suite",
    name: "Aristocrat Suite",
    namePlain: "Aristocrat ",
    nameItalic: "Suite",
    photos: [{ src: roomSuite, alt: "Aristocrat Suite with a king-size bed" }],
    imgClassName: "pos-suite",
    lead: "Our largest room – a king-size bed and a separate sitting area for a small meeting or a family evening.",
    desc: "Our largest room, with a separate sitting area for a small meeting, a family evening or simply more space.",
    about:
      "The Aristocrat Suite is our largest room. Next to the king-size bed there is a separate sitting area – room for a small meeting, a family evening or simply more space to relax. Buffet breakfast and free airport pickup are included.",
    bed: "King-size bed · sitting area",
    idealFor: "Families · small meetings",
    price: "BDT 12,000",
    chips: ["King-size bed", "Separate sitting area", "Breakfast included", "Wi-Fi 50 Mbps"],
    facts: [
      ["BED", "King-size"],
      ["ROOM TYPE", "Suite with sitting area"],
      ["IDEAL FOR", "Families · small meetings"],
      ["CHECK-IN / OUT", "12:00 noon"],
    ],
    bedFeature: "King-size bed",
  },
];

export const roomHref = (slug: string) => `/rooms/${slug}`;

export const getRoom = (slug: string) => ROOMS.find((r) => r.slug === slug);
