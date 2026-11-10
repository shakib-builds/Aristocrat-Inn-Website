import Link from "next/link";
import NavLink from "@/components/NavLink";
import {
  EMAIL,
  EMAIL_HREF,
  FACEBOOK_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_URL,
} from "@/lib/site";

const PLACES = [
  ["Hazrat Shahjalal Airport", "4.7 km · ~15 min drive"],
  ["Gulshan Ladies Park", "2 min walk"],
  ["The American Club", "6 min walk"],
  ["United Hospital", "12 min walk"],
] as const;

export default function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer__top">
          <div className="panel">
            <h2>
              Plan your stay <span className="it-lg">with us</span>
            </h2>
            <div className="contact-list">
              <a href={PHONE_TEL}>
                <span>Call</span>
                <span>{`${PHONE_DISPLAY}  →`}</span>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                <span>WhatsApp</span>
                <span>{`${PHONE_DISPLAY}  →`}</span>
              </a>
              <a href={EMAIL_HREF}>
                <span>Email</span>
                <span>{`${EMAIL}  →`}</span>
              </a>
            </div>
          </div>

          <div className="panel footer__cols">
            <div className="footer__col footer__col--explore">
              <h3>Explore</h3>
              <Link href="/rooms">Rooms</Link>
              <Link href="/restaurant">Dining</Link>
              <Link href="/conference">Events</Link>
              <Link href="/#facilities">Facilities</Link>
              <Link href="/#location">Location</Link>
              <Link href="/contact">Contact</Link>
              <NavLink href="/career">Career</NavLink>
            </div>
            <div className="footer__col">
              <h3>Getting here</h3>
              {PLACES.map(([name, dist]) => (
                <p className="place" key={name}>
                  <strong>{name}</strong>
                  <span>{dist}</span>
                </p>
              ))}
            </div>
            <div className="footer__col footer__col--visit">
              <h3>Visit</h3>
              <p>House 12, Road 68/A</p>
              <p>Gulshan-2, Dhaka 1212</p>
              <p>Bangladesh</p>
              <a className="gold" href={MAPS_URL} target="_blank" rel="noopener">
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="footer__meta">
          <p>{"Gulshan-2, Dhaka’s diplomatic zone  ·  Rated 8.2 / 10 by 56 verified guests"}</p>
          <p>
            {"© 2026 Hotel Aristocrat Inn  ·  "}
            <a href={FACEBOOK_URL} target="_blank" rel="noopener">
              Facebook
            </a>
          </p>
        </div>

        <p className="footer__word" aria-hidden="true">
          Aristocrat Inn
        </p>
      </div>
    </footer>
  );
}
