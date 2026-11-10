import type { Metadata } from "next";
import { CtaBanner, Faq, StatsBand } from "@/components/shared";
import Hero from "@/components/home/Hero";
import Rooms from "@/components/home/Rooms";
import Arrival from "@/components/home/Arrival";
import Location from "@/components/home/Location";
import Dining from "@/components/home/Dining";
import Facilities from "@/components/home/Facilities";
import Reviews from "@/components/home/Reviews";
import "./page.css";

export const metadata: Metadata = {
  title: { absolute: "Hotel Aristocrat Inn · Gulshan-2, Dhaka" },
};

export default function Home() {
  return (
    <main id="top" className="page-home">
      <Hero />
      <StatsBand />
      <Rooms />
      <Arrival />
      <Location />
      <Dining />
      <Facilities />
      <Reviews />
      <Faq />
      <CtaBanner />
    </main>
  );
}
