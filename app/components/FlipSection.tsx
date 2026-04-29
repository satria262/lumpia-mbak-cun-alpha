"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type FlipSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function FlipSection({
  children,
  className = "",
}: FlipSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.24,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={["flip-section", isVisible ? "is-visible" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
