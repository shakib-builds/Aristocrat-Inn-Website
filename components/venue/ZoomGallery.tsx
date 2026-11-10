"use client";

/**
 * Gallery grid with a photo lightbox (port of reference/js/venue.js, lightbox part).
 * Uses a native modal <dialog> (focus trap, Esc to close), animated with
 * AnimatePresence (fade + scale). Clicking the backdrop or × closes it.
 */

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ImageReveal } from "@/components/motion";

export type GalleryPhoto = {
  src: StaticImageData;
  alt: string;
  /** aria-label of the zoom button */
  label: string;
  /** extra class on the figure, e.g. "gallery__item--short" */
  modifier?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function Lightbox({ photo, onClose }: { photo: GalleryPhoto; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <motion.dialog
      ref={ref}
      className="lightbox"
      aria-label={photo.alt}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: EASE }}
      onCancel={(e) => {
        // Esc: keep the dialog open until the exit animation has run
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="lightbox__close" type="button" aria-label="Close photo" onClick={onClose}>
        ×
      </button>
      {/* Full original file, shown at its natural size (as the reference does). unoptimized: a srcset
          would shrink the intrinsic size; eager: a lazy image has no size in the auto-sized dialog. */}
      <Image src={photo.src} alt={photo.alt} unoptimized loading="eager" />
    </motion.dialog>
  );
}

export default function ZoomGallery({ photos, sizes }: { photos: GalleryPhoto[]; sizes: string }) {
  const [open, setOpen] = useState<GalleryPhoto | null>(null);
  const lastButton = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div className="gallery__grid">
        {photos.map((p, i) => (
          <figure key={p.label} className={p.modifier ? `gallery__item ${p.modifier}` : "gallery__item"}>
            <button
              className="zoomable"
              type="button"
              aria-label={p.label}
              style={{ position: "relative" }}
              onClick={(e) => {
                lastButton.current = e.currentTarget;
                setOpen(p);
              }}
            >
              <ImageReveal style={{ position: "absolute", inset: 0 }} delay={i * 0.1}>
                <Image src={p.src} alt={p.alt} fill sizes={sizes} placeholder="blur" style={{ objectFit: "cover" }} />
              </ImageReveal>
            </button>
          </figure>
        ))}
      </div>
      <AnimatePresence onExitComplete={() => lastButton.current?.focus()}>
        {open && <Lightbox key={open.label} photo={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </>
  );
}
