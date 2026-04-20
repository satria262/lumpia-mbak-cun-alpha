"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  function goToPrevious() {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  }

  function goToNext() {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col bg-[#F8F2F0] p-8 rounded-lg space-y-4 relative min-h-[320px]">
        <p className="absolute -top-4 -left-2 opacity-25 text-[#CEC76F] text-4xl font-extrabold">
          99
        </p>
        <p className="text-xl leading-8 text-[#231f19]">{active.quote}</p>
        <div className="mt-auto flex items-center space-x-4">
          <Image
            src={active.image}
            alt={active.name}
            width={52}
            height={52}
            className="h-[52px] w-[52px] rounded-lg object-cover object-center"
          />
          <div>
            <p className="text-xl font-semibold">{active.name}</p>
            <p className="text-[#8A726C] uppercase tracking-[0.18em] text-xs">
              {active.role}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Testimoni sebelumnya"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D9CFAF] bg-white text-[#6A624D] transition hover:bg-[#CEC76F] hover:text-[#231f19]"
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
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D9CFAF] bg-white text-[#6A624D] transition hover:bg-[#CEC76F] hover:text-[#231f19]"
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
