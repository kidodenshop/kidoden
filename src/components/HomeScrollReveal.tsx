"use client";

import { useEffect, useRef } from "react";

export default function HomeScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let elements = Array.from(
      container.querySelectorAll<HTMLElement>(".reveal-on-scroll")
    );
    if (elements.length === 0) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Trigger when element top reaches 84% of the viewport
      const triggerBottom = windowHeight * 0.84;

      // Reveal elements once and remove them from future checks
      elements = elements.filter((el) => {
        const rect = el.getBoundingClientRect();

        // Reveal element the first time it scrolls into view
        if (rect.top <= triggerBottom && rect.bottom >= 0) {
          el.classList.add("revealed");
          return false; // Permanently revealed; no need to track again
        }
        return true;
      });

      // If all elements are revealed, remove scroll listeners for performance
      if (elements.length === 0) {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      }
    };

    // Run on mount with a slight delay for initial layout
    const timer = setTimeout(handleScroll, 60);

    // Attach passive scroll and resize listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="home-scroll-container flex flex-col min-h-screen bg-white">
      {children}
    </div>
  );
}
