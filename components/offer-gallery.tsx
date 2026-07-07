"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Img = { url: string; alt?: string; primary?: boolean };

/** Indeksy globalne w tablicy images, z pominięciem zdjęcia głównego. */
function galleryIndices(images: Img[]): number[] {
  const primaryIdx = Math.max(0, images.findIndex((i) => i.primary));
  return images.map((_, i) => i).filter((i) => i !== primaryIdx);
}
function primaryIndex(images: Img[]): number {
  const idx = images.findIndex((i) => i.primary);
  return idx >= 0 ? idx : 0;
}

/** Pełnoekranowy podgląd z nawigacją (klik w zdjęcie). */
function Lightbox({
  images,
  index,
  title,
  onClose,
  onIndex,
}: {
  images: Img[];
  index: number;
  title: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const go = useCallback(
    (delta: number) => onIndex((index + delta + images.length) % images.length),
    [index, images.length, onIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [go, onClose]);

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria zdjęć: ${title}`}
    >
      <button
        onClick={onClose}
        aria-label="Zamknij"
        className="absolute top-4 right-4 z-10 grid place-items-center size-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <X className="size-6" />
      </button>

      <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
        {index + 1} / {images.length}
      </span>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-2 sm:left-5 z-10 grid place-items-center size-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <ChevronLeft className="size-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Następne zdjęcie"
            className="absolute right-2 sm:right-5 z-10 grid place-items-center size-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <ChevronRight className="size-7" />
          </button>
        </>
      )}

      <div
        className="relative w-[92vw] h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={img.url}
          alt={img.alt ?? title}
          fill
          sizes="92vw"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

/** Hero: zdjęcie główne + do 3 miniatur (desktop). Wszystkie klikalne. */
export function OfferGalleryHero({ images, title }: { images: Img[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  if (images.length === 0) return null;

  const pIdx = primaryIndex(images);
  const primary = images[pIdx];
  const thumbIdx = galleryIndices(images).slice(0, 3);
  const remaining = images.length - 1 - thumbIdx.length;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <button
          onClick={() => setOpen(pIdx)}
          className="lg:col-span-3 relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 cursor-zoom-in group"
          aria-label="Powiększ zdjęcie"
        >
          <Image
            src={primary.url}
            alt={primary.alt ?? title}
            fill
            sizes="(min-width: 1024px) 75vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority
          />
        </button>
        <div className="hidden lg:grid grid-rows-3 gap-3">
          {thumbIdx.map((gi, i) => (
            <button
              key={gi}
              onClick={() => setOpen(gi)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in group"
              aria-label="Powiększ zdjęcie"
            >
              <Image
                src={images[gi].url}
                alt={images[gi].alt ?? ""}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {i === 2 && remaining > 0 && (
                <span className="absolute inset-0 bg-black/55 grid place-items-center text-white font-semibold text-lg">
                  +{remaining}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <Lightbox
          images={images}
          index={open}
          title={title}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </>
  );
}

/** Dolna sekcja „Galeria": pozostałe zdjęcia (poza 3 miniaturami hero). Klikalne. */
export function OfferGalleryGrid({ images, title }: { images: Img[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const gridIdx = galleryIndices(images).slice(3);
  if (gridIdx.length === 0) return null;

  return (
    <div>
      <h2 className="font-bold tracking-tight text-xl text-foreground mb-4">Galeria</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {gridIdx.map((gi) => (
          <button
            key={gi}
            onClick={() => setOpen(gi)}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in group"
            aria-label="Powiększ zdjęcie"
          >
            <Image
              src={images[gi].url}
              alt={images[gi].alt ?? ""}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          images={images}
          index={open}
          title={title}
          onClose={() => setOpen(null)}
          onIndex={setOpen}
        />
      )}
    </div>
  );
}
