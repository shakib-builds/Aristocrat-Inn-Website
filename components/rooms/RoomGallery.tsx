"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { ImageReveal } from "@/components/motion";

export type Photo = { src: StaticImageData; alt: string };

const EASE = [0.22, 1, 0.36, 1] as const;
const MotionImage = motion.create(Image);

const TILE_SIZES = "(max-width: 760px) 50vw, (max-width: 1100px) 25vw, 268px";

/** Room photo gallery with a full-screen lightbox (← / → / Esc, focus returns to the opener). */
export default function RoomGallery({ photos, imgClassName }: { photos: Photo[]; imgClassName?: string }) {
  // Rooms without a full set of photos show one wide cover photo instead of the 1 + 4 grid.
  const single = photos.length < 5;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const opener = useRef<HTMLButtonElement | null>(null);

  const show = useCallback(
    (i: number, dir = 0) => {
      setDirection(dir);
      setCurrent((i + photos.length) % photos.length);
    },
    [photos.length],
  );

  const openAt = (e: MouseEvent<HTMLButtonElement>, i: number) => {
    opener.current = e.currentTarget;
    show(i);
    setOpen(true);
  };
  const close = () => setOpen(false);

  const tile = (i: number, className: string, label: string, extra?: ReactNode) => (
    <button
      className={className}
      type="button"
      data-index={i}
      aria-label={label}
      // "View all photos" tile opens the gallery from the first photo
      onClick={(e) => openAt(e, className.includes("--more") ? 0 : i)}
    >
      <ImageReveal style={{ position: "absolute", inset: 0 }} delay={i === 0 ? 0 : 0.08 * i}>
        <Image
          className={i === 0 ? imgClassName : undefined}
          src={photos[i].src}
          alt={photos[i].alt}
          fill
          placeholder="blur"
          sizes={i === 0 ? (single ? "100vw" : "(max-width: 1100px) 100vw, 800px") : TILE_SIZES}
          preload={i === 0}
        />
      </ImageReveal>
      {extra}
    </button>
  );

  return (
    <>
      <section className={single ? "rd-gallery rd-gallery--single" : "rd-gallery"} aria-label="Room photos">
        <div className="wrap">
          {tile(0, "rd-gallery__item rd-gallery__item--main", single ? "Open photo" : `Open photo 1 of ${photos.length}`)}
          {!single && (
          <div className="rd-gallery__grid">
            {tile(1, "rd-gallery__item", `Open photo 2 of ${photos.length}`)}
            {tile(2, "rd-gallery__item", `Open photo 3 of ${photos.length}`)}
            {tile(3, "rd-gallery__item", `Open photo 4 of ${photos.length}`)}
            {tile(
              4,
              "rd-gallery__item rd-gallery__item--more",
              `View all ${photos.length} photos`,
              <span className="rd-gallery__all">View all {photos.length} photos</span>,
            )}
          </div>
          )}
        </div>
      </section>

      <AnimatePresence onExitComplete={() => opener.current?.focus()}>
        {open && (
          <Lightbox
            photos={photos}
            current={current}
            direction={direction}
            onPrev={() => show(current - 1, -1)}
            onNext={() => show(current + 1, 1)}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Lightbox({
  photos,
  current,
  direction,
  onPrev,
  onNext,
  onClose,
}: {
  photos: Photo[];
  current: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  // Open as a modal (top layer, focus moves into the dialog, background inert).
  // On unmount (after the exit animation) the dialog leaves the DOM.
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  const photo = photos[current];

  return (
    <motion.dialog
      ref={ref}
      className="lightbox"
      aria-label="Room photos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.35, ease: EASE }}
      // Esc: animate out instead of closing instantly
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="lightbox__close" type="button" aria-label="Close" onClick={onClose}>
        ×
      </button>
      {photos.length > 1 && (
      <button
        className="lightbox__nav lightbox__nav--prev"
        type="button"
        aria-label="Previous photo"
        onClick={onPrev}
      >
        ‹
      </button>
      )}
      <motion.figure
        className="lightbox__figure"
        initial={{ scale: 0.94 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.96 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <MotionImage
            key={current}
            className="lightbox__img"
            src={photo.src}
            alt={photo.alt}
            sizes="100vw"
            style={{ width: "auto", height: "auto" }}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </AnimatePresence>
        <figcaption className="lightbox__count">
          {current + 1} / {photos.length}
        </figcaption>
      </motion.figure>
      {photos.length > 1 && (
      <button
        className="lightbox__nav lightbox__nav--next"
        type="button"
        aria-label="Next photo"
        onClick={onNext}
      >
        ›
      </button>
      )}
    </motion.dialog>
  );
}
