import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Parallax, Reveal, RevealText } from "@/components/motion";
import { WHATSAPP_URL } from "@/lib/site";

/** Full-bleed page hero shared by the Restaurant and Conference pages. */
export default function VenueHero({
  modifier,
  image,
  crumb,
  title,
  lead,
  cta,
}: {
  modifier: string;
  image: StaticImageData;
  crumb: string;
  title: ReactNode;
  lead: string;
  cta: { href: string; label: string };
}) {
  return (
    <section className={`page-hero ${modifier}`}>
      <div className="page-hero__inner">
        <div className="page-hero__bg">
          {/* Parallax layer is 60px taller than the hero so it never shows an edge while drifting */}
          <Parallax distance={60} style={{ position: "absolute", inset: "-30px 0" }}>
            <Image
              src={image}
              alt=""
              fill
              preload
              sizes="(max-width: 1440px) 100vw, 1408px"
              placeholder="blur"
              /* object-fit / object-position come from page.css (.page-hero__bg img) */
            />
          </Parallax>
        </div>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <RevealText as="h1" className="page-hero__title" onLoad delay={0.1}>
          {title}
        </RevealText>
        <Reveal as="p" className="page-hero__lead" delay={0.35}>
          {lead}
        </Reveal>
        <Reveal className="page-hero__actions" delay={0.5}>
          <a className="btn btn--light" href={cta.href}>
            {cta.label}
          </a>
          <a className="btn btn--ghost-light" href={WHATSAPP_URL} target="_blank" rel="noopener">
            WhatsApp us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
