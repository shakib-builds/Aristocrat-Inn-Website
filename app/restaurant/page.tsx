import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageReveal, Reveal, RevealText, Stagger, StaggerItem } from "@/components/motion";
import EnquiryForm from "@/components/venue/EnquiryForm";
import VenueHero from "@/components/venue/VenueHero";
import ZoomGallery from "@/components/venue/ZoomGallery";
import { FACEBOOK_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/site";
import hero from "@/public/assets/img/restaurant-hero.jpg";
import breakfast from "@/public/assets/img/restaurant-breakfast.jpg";
import bbq from "@/public/assets/img/restaurant-bbq.jpg";
import gallery1 from "@/public/assets/img/restaurant-gallery-1.jpg";
import gallery2 from "@/public/assets/img/restaurant-gallery-2.jpg";
import gallery3 from "@/public/assets/img/restaurant-gallery-3.jpg";
import gallery4 from "@/public/assets/img/restaurant-gallery-4.jpg";
import "./page.css";

export const metadata: Metadata = {
  title: "Atmosphere Restaurant",
  description:
    "Open-air rooftop dining in Gulshan-2: buffet breakfast every morning, live BBQ and seven cuisines. Reserve a table at Atmosphere Restaurant.",
};

const FACTS = [
  ["SETTING", "Rooftop, open air"],
  ["BREAKFAST", "Buffet, every morning"],
  ["EVENINGS", "Live BBQ"],
  ["CUISINES", "7 kitchens"],
] as const;

const MENU = [
  ["Buffet Breakfast", "Complimentary for hotel guests, every morning"],
  ["Live BBQ", "Grilled to order on the open-air rooftop"],
  ["Continental", "European classics"],
  ["Chinese", "Wok dishes and favourites"],
  ["Thai", "Fragrant curries and stir-fries"],
  ["Italian", "Pasta and Italian classics"],
  ["Indian", "Rich curries and tandoor dishes"],
  ["Bangladeshi", "Home-style local flavours"],
] as const;

const FEATURE_SIZES = "(max-width: 1100px) calc(100vw - 80px), (max-width: 1280px) 50vw, 680px";

export default function RestaurantPage() {
  return (
    <main id="top" className="page-restaurant">
      {/* ===== Page hero ===== */}
      <VenueHero
        modifier="page-hero--restaurant"
        image={hero}
        crumb="Restaurant"
        title={
          <>
            Atmosphere <span className="it">Restaurant</span>
          </>
        }
        lead="Open-air rooftop dining in Gulshan-2, with buffet breakfast every morning, live BBQ and seven cuisines from our experienced chefs."
        cta={{ href: "#reserve", label: "Reserve a table" }}
      />

      {/* ===== Intro ===== */}
      <section className="intro">
        <div className="wrap">
          <div className="intro__statement">
            <Reveal as="p" className="eyebrow">
              rooftop · open air
            </Reveal>
            <RevealText className="intro__title r-intro__title">
              Dine above <span className="it">Gulshan</span>
            </RevealText>
          </div>
          <Stagger className="r-intro__right" stagger={0.08}>
            <StaggerItem as="p" className="intro__body">
              Our open-air rooftop restaurant gives you a refreshing atmosphere and a view over Gulshan-2. Start the
              day with our buffet breakfast, come back for live BBQ in the evening, or choose from Continental,
              Chinese, Thai, Italian, Indian and Bangladeshi dishes.
            </StaggerItem>
            <dl className="facts" style={{ margin: 0 }}>
              {FACTS.map(([label, value]) => (
                <StaggerItem className="fact" key={label}>
                  <dt className="fact__label">{label}</dt>
                  <dd className="fact__value" style={{ margin: 0 }}>
                    {value}
                  </dd>
                </StaggerItem>
              ))}
            </dl>
          </Stagger>
        </div>
      </section>

      {/* ===== Cuisines ===== */}
      <section className="cuisines" id="menu">
        {/* Stagger on .wrap drives the menu rows (variants pass through the plain <ol>) */}
        <Stagger className="wrap" stagger={0.07}>
          <div className="cuisines__title">
            <Reveal as="p" className="eyebrow">
              on the menu
            </Reveal>
            <RevealText className="h-sub">
              Eight ways to <span className="it">dine</span>
            </RevealText>
            <Reveal as="p" delay={0.2}>
              One rooftop, many flavours – from a slow breakfast to a late BBQ dinner.
            </Reveal>
          </div>
          <ol className="menu-list" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {MENU.map(([name, desc], i) => (
              <StaggerItem as="li" className="menu-item" key={name}>
                <span className="menu-item__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="menu-item__name">{name}</h3>
                <p className="menu-item__desc">{desc}</p>
                {i === 0 && <span className="chip chip--gold">Complimentary</span>}
              </StaggerItem>
            ))}
          </ol>
        </Stagger>
      </section>

      {/* ===== Breakfast & BBQ ===== */}
      <section className="features dark">
        <div className="wrap">
          <article className="feature">
            <ImageReveal className="feature__img" style={{ position: "relative" }}>
              <Image
                src={breakfast}
                alt="Breakfast spread with eggs, salad, bread and cheese"
                fill
                sizes={FEATURE_SIZES}
                placeholder="blur"
              />
            </ImageReveal>
            <div className="feature__text">
              <Reveal as="p" className="eyebrow">
                every morning
              </Reveal>
              <RevealText className="h-sub">
                Breakfast is <span className="it">on us</span>
              </RevealText>
              <Reveal as="p" className="dark__lead" delay={0.15}>
                Every hotel stay includes our buffet breakfast on the rooftop – a relaxed start before meetings or
                sightseeing.
              </Reveal>
              <Stagger as="ul" className="points">
                <StaggerItem as="li">Complimentary for all hotel guests</StaggerItem>
                <StaggerItem as="li">Continental and Indian selection</StaggerItem>
                <StaggerItem as="li">Served on the open-air rooftop</StaggerItem>
              </Stagger>
              <Link className="btn btn--light" href="/rooms">
                See rooms with breakfast
              </Link>
            </div>
          </article>

          <article className="feature feature--reverse">
            <div className="feature__text">
              <Reveal as="p" className="eyebrow">
                in the evening
              </Reveal>
              <RevealText className="h-sub">
                Live <span className="it">BBQ</span>
              </RevealText>
              <Reveal as="p" className="dark__lead" delay={0.15}>
                As the city lights come on, our chefs fire up the grill. Live BBQ on the rooftop is a favourite for
                guests and for dinners with friends and colleagues.
              </Reveal>
              <Stagger as="ul" className="points">
                <StaggerItem as="li">Grilled to order</StaggerItem>
                <StaggerItem as="li">Open-air rooftop setting</StaggerItem>
                <StaggerItem as="li">Great for group dinners</StaggerItem>
              </Stagger>
              <a className="btn btn--light" href="#reserve">
                Reserve a table
              </a>
            </div>
            <ImageReveal className="feature__img" style={{ position: "relative" }}>
              <Image src={bbq} alt="Grilled dish served in a dark bowl" fill sizes={FEATURE_SIZES} placeholder="blur" />
            </ImageReveal>
          </article>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section className="gallery">
        <div className="wrap">
          <div className="gallery__head">
            <RevealText className="h-gallery">
              A look <span className="it">around</span>
            </RevealText>
            <a className="text-link" href={FACEBOOK_URL} target="_blank" rel="noopener">
              More on Facebook →
            </a>
          </div>
          <ZoomGallery
            sizes="(max-width: 1100px) 50vw, 340px"
            photos={[
              { src: gallery1, alt: "Freshly baked pizza", label: "Enlarge photo: pizza" },
              { src: gallery2, alt: "Plated dessert", label: "Enlarge photo: plated dessert", modifier: "gallery__item--short" },
              { src: gallery3, alt: "Pasta dish in a ceramic bowl", label: "Enlarge photo: pasta dish" },
              { src: gallery4, alt: "Quiet dining corner", label: "Enlarge photo: dining corner", modifier: "gallery__item--short" },
            ]}
          />
        </div>
      </section>

      {/* ===== Visit & reserve ===== */}
      <section className="visit" id="reserve">
        <div className="wrap">
          <div className="visit__info">
            <Reveal as="p" className="eyebrow">
              plan your visit
            </Reveal>
            <RevealText className="h-sub">
              Book a <span className="it">table</span>
            </RevealText>
            <Stagger className="details">
              <StaggerItem className="details__row">
                <span className="details__label">Where</span>
                <span className="details__value">Rooftop, Hotel Aristocrat Inn · House 12, Road 68/A, Gulshan-2</span>
              </StaggerItem>
              <StaggerItem className="details__row">
                <span className="details__label">Opening hours</span>
                <span className="details__value">
                  Breakfast __:__ – __:__ &nbsp;·&nbsp; Lunch &amp; dinner __:__ – __:__ &nbsp;(add hours)
                </span>
              </StaggerItem>
              <StaggerItem className="details__row">
                <span className="details__label">Reservations</span>
                <span className="details__value">
                  <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> &nbsp;·&nbsp;{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                    WhatsApp available
                  </a>
                </span>
              </StaggerItem>
              <StaggerItem className="details__row">
                <span className="details__label">Groups &amp; events</span>
                <span className="details__value">
                  Planning a bigger dinner? See our <Link href="/conference">Royal Banquet &amp; Conference hall</Link>
                </span>
              </StaggerItem>
            </Stagger>
          </div>

          <EnquiryForm
            title={
              <>
                Reserve a <span className="it">table</span>
              </>
            }
            doneText={
              <>
                We’ve noted your table request and will confirm by phone or WhatsApp shortly. Need it sooner? Call{" "}
                <a className="text-link" href={PHONE_TEL}>
                  {PHONE_DISPLAY}
                </a>
                .
              </>
            }
            againLabel="Make another request"
          >
            <div className="form-card__row">
              <label className="fbox">
                <span className="fbox__label">Date</span>
                <input className="fbox__input js-date" type="text" name="date" placeholder="Select date" required />
                <span className="fbox__error" aria-live="polite"></span>
              </label>
              <label className="fbox">
                <span className="fbox__label">Time</span>
                <input className="fbox__input js-time" type="text" name="time" placeholder="Select time" required />
                <span className="fbox__error" aria-live="polite"></span>
              </label>
            </div>
            <div className="form-card__row">
              <label className="fbox">
                <span className="fbox__label">Guests</span>
                <select className="fbox__input" name="guests" required defaultValue="2 people">
                  <option>1 person</option>
                  <option>2 people</option>
                  <option>3 people</option>
                  <option>4 people</option>
                  <option>5 people</option>
                  <option>6 people</option>
                  <option>7–10 people</option>
                  <option>More than 10</option>
                </select>
                <span className="fbox__error" aria-live="polite"></span>
              </label>
              <label className="fbox">
                <span className="fbox__label">Meal</span>
                <select className="fbox__input" name="meal" required defaultValue="Dinner · Live BBQ">
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Dinner · Live BBQ</option>
                </select>
                <span className="fbox__error" aria-live="polite"></span>
              </label>
            </div>
            <label className="fbox">
              <span className="fbox__label">Name &amp; phone</span>
              <input
                className="fbox__input"
                type="text"
                name="name"
                placeholder="Your name, +880…"
                autoComplete="name"
                required
                pattern="(?:\D*\d){7,}\D*"
                title="Your name and a phone number"
              />
              <span className="fbox__error" aria-live="polite"></span>
            </label>
            <button className="btn btn--primary" type="submit">
              Request a table
            </button>
            <p className="form-card__note">We’ll confirm by phone or WhatsApp.</p>
          </EnquiryForm>
        </div>
      </section>
    </main>
  );
}
