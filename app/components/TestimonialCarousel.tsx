"use client";

import { useEffect, useRef, useState } from "react";

export type TestimonialItem = {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
};

type TestimonialCarouselProps = {
  testimonials: TestimonialItem[];
};

function getInitials(name: string) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return initials || "LC";
}

function getSafeImage(src: string | null | undefined) {
  const value = src?.trim();

  if (!value) {
    return "";
  }

  if (value.startsWith("/")) {
    return value;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com"
      ? value
      : "";
  } catch {
    return "";
  }
}

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  if (testimonials.length === 0) {
    return (
      <div className="space-y-6">
        <div className="testimonial-stage relative h-[360px] overflow-hidden rounded-lg bg-[#F8F2F0] sm:h-[320px] lg:h-[280px]">
          <p className="testimonial-mark absolute left-6 top-5 text-6xl font-semibold">
            &ldquo;
          </p>
          <article className="testimonial-card testimonial-card-current flex h-full flex-col justify-between gap-5 p-8 pt-12 sm:gap-6">
            <p className="testimonial-quote text-xl leading-8 text-[#231f19]">
              Belum ada testimoni yang ditampilkan.
            </p>
            <div className="flex items-center space-x-4">
              <div className="grid h-[52px] w-[52px] place-items-center rounded-lg bg-[#eef3da] font-[var(--font-noto-serif)] text-lg font-semibold text-[#526b2d]">
                LC
              </div>
              <div className="min-w-0">
                <p className="text-xl font-semibold">Lumpia Mbak Cun</p>
                <p className="text-[#8A726C] uppercase tracking-[0.18em] text-xs">
                  Testimoni
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  function transitionTo(nextIndex: number) {
    if (nextIndex === displayIndex) {
      return;
    }

    setLeavingIndex(displayIndex);
    setDisplayIndex(nextIndex);

    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = window.setTimeout(() => {
      setLeavingIndex(null);
      animationTimeoutRef.current = null;
    }, 320);
  }

  function goToPrevious() {
    transitionTo(
      displayIndex === 0 ? testimonials.length - 1 : displayIndex - 1,
    );
  }

  function goToNext() {
    transitionTo(
      displayIndex === testimonials.length - 1 ? 0 : displayIndex + 1,
    );
  }

  const active = testimonials[displayIndex];
  const leaving = leavingIndex === null ? null : testimonials[leavingIndex];
  const activeImage = getSafeImage(active.image);
  const leavingImage = getSafeImage(leaving?.image);

  return (
    <div className="space-y-6">
      <div className="testimonial-stage relative h-[360px] overflow-hidden rounded-lg bg-[#F8F2F0] sm:h-[320px] lg:h-[280px]">
        <p className="testimonial-mark absolute left-6 top-5 text-6xl font-semibold">
          &ldquo;
        </p>

        <article className="testimonial-card testimonial-card-current flex h-full flex-col justify-between gap-5 p-8 pt-12 sm:gap-6">
          <p className="testimonial-quote text-xl leading-8 text-[#231f19]">
            {active.quote}
          </p>
          <div className="flex items-center space-x-4">
            {activeImage ? (
              <img
                src={activeImage}
                alt={active.name}
                className="h-[52px] w-[52px] shrink-0 rounded-lg object-cover object-center"
              />
            ) : (
              <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-lg bg-[#eef3da] font-[var(--font-noto-serif)] text-lg font-semibold text-[#526b2d]">
                {getInitials(active.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-xl font-semibold">{active.name}</p>
              <p className="text-[#8A726C] uppercase tracking-[0.18em] text-xs">
                {active.role}
              </p>
            </div>
          </div>
        </article>

        {leaving && (
          <article className="testimonial-card testimonial-card-leaving flex h-full flex-col justify-between gap-5 p-8 pt-12 sm:gap-6">
            <p className="testimonial-quote text-xl leading-8 text-[#231f19]">
              {leaving.quote}
            </p>
            <div className="flex items-center space-x-4">
              {leavingImage ? (
                <img
                  src={leavingImage}
                  alt={leaving.name}
                  className="h-[52px] w-[52px] shrink-0 rounded-lg object-cover object-center"
                />
              ) : (
                <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-lg bg-[#eef3da] font-[var(--font-noto-serif)] text-lg font-semibold text-[#526b2d]">
                  {getInitials(leaving.name)}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-xl font-semibold">{leaving.name}</p>
                <p className="text-[#8A726C] uppercase tracking-[0.18em] text-xs">
                  {leaving.role}
                </p>
              </div>
            </div>
          </article>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Testimoni sebelumnya"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D9CFAF] bg-white text-[#6A624D] transition hover:border-[#e6c814] hover:bg-[#FCDC31] hover:text-[#231f19]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M14.5 6.5 9 12l5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={goToNext}
          aria-label="Testimoni berikutnya"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D9CFAF] bg-white text-[#6A624D] transition hover:border-[#e6c814] hover:bg-[#FCDC31] hover:text-[#231f19]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M9.5 6.5 15 12l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
