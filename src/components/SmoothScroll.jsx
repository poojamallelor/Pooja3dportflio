import { useEffect } from "react";
import Lenis from "lenis";
import { initWorldListeners } from "../lib/worldState";

/**
 * SmoothScroll.jsx
 * Boots Lenis smooth scrolling, exposes a global `scrollToSection` helper
 * and wires the shared scroll/mouse listeners the 3D world reads each frame.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanupWorld = initWorldListeners();
    if (reduced) return cleanupWorld;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    window.scrollToSection = (id) => {
      const el = document.getElementById(id);
      if (el) lenis.scrollTo(el, { offset: -80 });
    };

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.scrollToSection;
      cleanupWorld();
    };
  }, []);

  return null;
}

export function scrollToSection(id) {
  if (typeof window === "undefined") return;
  if (typeof window.scrollToSection === "function") {
    window.scrollToSection(id);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
