"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      '"Kulitnya begitu tipis dan renyah, namun mampu menahan sari rebung dengan sempurna. Ini adalah lumpia terbaik yang pernah saya makan selama 20 tahun berkunjung ke Semarang."',
    name: "Andi Wijaya",
    role: "Kritikus Kuliner",
    image: "/lumpia-pinterest.jpg",
  },
  {
    quote:
      '"Rasa rebungnya bersih dan manis, bumbunya terasa tenang tapi dalam. Setiap gigitan terasa seperti resep yang dijaga dengan sepenuh hati."',
    name: "Marisa Tan",
    role: "Pecinta Kuliner",
    image: "/lumpia-semarang.jpg",
  },
  {
    quote:
      '"Saya datang karena rekomendasi teman, lalu kembali karena konsistensinya. Hangat, renyah, dan isinya selalu terasa segar setiap kali dibeli."',
    name: "Bimo Hartono",
    role: "Pelanggan Setia",
    image: "/lumpia-pinterest.jpg",
  },
];

export default function TestimonialCarousel() {
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

  return (
    <div className="space-y-6">
      <div className="testimonial-stage relative min-h-[360px] rounded-lg bg-[#F8F2F0] sm:min-h-[320px] lg:min-h-[280px]">
        <p className="testimonial-mark absolute left-6 top-5 text-6xl font-semibold">
          &ldquo;
        </p>

        <article className="testimonial-card testimonial-card-current flex h-full flex-col justify-between gap-5 p-8 pt-12 sm:gap-6">
          <p className="text-xl leading-8 text-[#231f19]">{active.quote}</p>
          <div className="flex items-center space-x-4">
            <Image
              src={active.image}
              alt={active.name}
              width={52}
              height={52}
              className="h-[52px] w-[52px] rounded-lg object-cover object-center"
            />
            <div className="min-w-0">
              <p className="text-xl font-semibold">{active.name}</p>
              <p className="text-[#8A726C] uppercase tracking-[0.18em] text-xs">
                {active.role}
              </p>
            </div>
          </div>
        </article>

        {leaving && (
          <article className="testimonial-card testimonial-card-leaving flex h-full flex-col justify-between gap-5 p-8 pt-12 sm:gap-6">
            <p className="text-xl leading-8 text-[#231f19]">{leaving.quote}</p>
            <div className="flex items-center space-x-4">
              <Image
                src={leaving.image}
                alt={leaving.name}
                width={52}
                height={52}
                className="h-[52px] w-[52px] rounded-lg object-cover object-center"
              />
              <div className="min-w-0">
                <p className="text-xl font-semibold">{leaving.name}</p>
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
