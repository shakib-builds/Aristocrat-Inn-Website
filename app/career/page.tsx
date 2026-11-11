import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ApplyLink from "@/components/career/ApplyLink";
import CareerForm from "@/components/career/CareerForm";
import { ImageReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import { EMAIL, EMAIL_HREF } from "@/lib/site";
import careerHero from "@/public/assets/img/career-hero.jpg";
import "@/components/forms/forms.css";
import "./page.css";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Build your career in hospitality at Hotel Aristocrat Inn in Gulshan-2, Dhaka. See open positions or send us your CV.",
};

const REASONS = [
  [
    "01",
    "International guests",
    "Work with embassy visitors, business travellers and families from around the world.",
  ],
  [
    "02",
    "Many departments",
    "Front office, restaurant, banquet, housekeeping, business centre and airport services.",
  ],
  ["03", "Learn on the job", "Grow your skills with hands-on training from an experienced team."],
  ["04", "Prime location", "Work in Gulshan-2, one of Dhaka’s most secure neighbourhoods."],
] as const;

// Sample roles from the design – replace with current openings
const JOBS = [
  ["Front Office Executive", "Front office"],
  ["Restaurant Server", "Atmosphere Restaurant"],
  ["Commis Chef", "Kitchen"],
  ["Housekeeping Attendant", "Housekeeping"],
  ["Banquet & Events Coordinator", "Royal Banquet & Conference"],
] as const;

export default function CareerPage() {
  return (
    <main id="top" className="page-career">
      {/* ===== Page hero ===== */}
      <section className="k-hero">
        <div className="wrap">
          <div className="k-hero__text">
            <div className="k-hero__copy">
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Career</span>
              </nav>
              <div className="k-hero__heading">
                <RevealText as="h1" className="k-hero__title" onLoad>
                  Build your career in <span className="it-lg">hospitality</span>
                </RevealText>
                <Reveal as="p" className="k-hero__lead" delay={0.3}>
                  Join the team behind Hotel Aristocrat Inn in Gulshan-2. We welcome guests from
                  around the world, 24 hours a day – and we’re always looking for warm, reliable
                  people to join us.
                </Reveal>
              </div>
            </div>
            <Reveal className="k-hero__actions" delay={0.45}>
              <a className="btn btn--primary" href="#positions">
                See open positions
              </a>
              <a className="btn btn--outline" href="#apply">
                Send your CV
              </a>
            </Reveal>
          </div>
          <ImageReveal className="k-hero__img" style={{ position: "relative" }} delay={0.15}>
            <Image
              src={careerHero}
              alt="Sunlit hotel reception desk surrounded by plants"
              fill
              priority
              sizes="(max-width: 1100px) 100vw, (max-width: 1280px) 46vw, 620px"
              placeholder="blur"
              style={{ objectFit: "cover" }}
            />
          </ImageReveal>
        </div>
      </section>

      {/* ===== Why join us ===== */}
      <section className="k-why">
        <div className="wrap">
          <div className="k-head">
            <Reveal as="p" className="eyebrow">
              why work with us
            </Reveal>
            <RevealText className="h-sub">
              A place to <span className="it-lg">grow</span>
            </RevealText>
          </div>
          <Stagger as="ul" className="k-reasons" stagger={0.1}>
            {REASONS.map(([num, title, text]) => (
              <StaggerItem as="li" className="k-reason" key={num}>
                <span className="k-reason__num">{num}</span>
                <h3 className="k-reason__title">{title}</h3>
                <p className="k-reason__text">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== Open positions ===== */}
      <section className="k-positions" id="positions">
        <div className="wrap">
          <div className="k-positions__head">
            <div className="k-head">
              <Reveal as="p" className="eyebrow">
                join the team
              </Reveal>
              <RevealText className="h-sub">
                Open <span className="it-lg">positions</span>
              </RevealText>
            </div>
          </div>
          <Stagger as="ul" className="k-jobs" stagger={0.08}>
            {JOBS.map(([title, dept]) => (
              <StaggerItem as="li" className="k-job" key={title}>
                <h3 className="k-job__title">{title}</h3>
                <p className="k-job__dept">{dept}</p>
                <p className="k-job__type">Full-time  ·  Gulshan-2</p>
                <ApplyLink position={title} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== Apply ===== */}
      <section className="k-apply" id="apply">
        <div className="wrap">
          <div className="k-apply__info">
            <Reveal as="p" className="eyebrow">
              apply
            </Reveal>
            <RevealText className="h-sub">
              Don’t see your <span className="it-lg">role?</span>
            </RevealText>
            <Reveal as="p" className="k-apply__lead" delay={0.15}>
              Send us your CV anyway. We keep every application on file and contact you when a
              suitable position opens.
            </Reveal>
            <Reveal as="p" className="k-apply__mail" delay={0.25}>
              Or email your CV to <a href={EMAIL_HREF}>{EMAIL}</a>
            </Reveal>
          </div>

          <div className="k-apply__card">
            <CareerForm />
          </div>
        </div>
      </section>
    </main>
  );
}
