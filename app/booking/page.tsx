import type { Metadata } from "next";
import Booking from "@/components/booking/Booking";
import "./page.css";

export const metadata: Metadata = {
  title: "Book your stay",
  description:
    "Send a booking request to Hotel Aristocrat Inn in Gulshan-2, Dhaka. We confirm by phone or email, usually within the hour. Breakfast and airport pickup included.",
};

export default function BookingPage() {
  return (
    <main id="top" className="page-booking">
      <Booking />
    </main>
  );
}
