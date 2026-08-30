import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { sections } from "../data/portfolio";
import { scrollToSection } from "./SmoothScroll";

/**
 * Navbar.jsx
 * Floating pill navigation. It condenses on scroll, tracks the section in
 * view with a shared layout indicator and swaps to a full-screen panel on
 * small screens.
 */
export default function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setCondensed(v > 60));

  useEffect(() => {
    // Map intermediate sub-sections to their parent navbar categories
    const sectionMapping = {
      home: "home",
      about: "about",
      stack: "stack",
      projects: "projects",
      "java-lab": "projects",
      lab: "projects",
      experience: "experience",
      achievements: "achievements",
      hackathons: "achievements",
      beyond: "achievements",
      interview: "contact",
      why: "contact",
      contact: "contact",
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const navId = sectionMapping[entry.target.id];
            if (navId) setActive(navId);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    Object.keys(sectionMapping).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.3 }}
        className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4"
      >
        <motion.nav
          aria-label="Primary"
          animate={{
            paddingTop: condensed ? 8 : 12,
            paddingBottom: condensed ? 8 : 12,
            backgroundColor: condensed
              ? "color-mix(in oklab, var(--surface) 82%, transparent)"
              : "color-mix(in oklab, var(--surface) 40%, transparent)",
          }}
          transition={{ duration: 0.3 }}
          className="flex w-full max-w-5xl items-center justify-between gap-6 rounded-full border border-border px-4 backdrop-blur-xl sm:px-6"
        >
          <button
            type="button"
            onClick={() => go("home")}
            className="flex items-center gap-3"
            data-cursor="HOME"
          >
            <span
              className="grid size-9 place-items-center rounded-full font-display text-xs font-bold text-primary-foreground"
              style={{ background: "var(--gradient-aurora)" }}
            >
              PM
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold leading-none">
                Pooja Mallelor
              </span>
              <span className="mono-label text-[9px]">Java Full Stack</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.map((s) => (
              <li key={s.id} className="relative">
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  className={`relative rounded-full px-3.5 py-2 font-mono text-[10px] tracking-[0.16em] transition-colors ${
                    active === s.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === s.id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-violet/40 bg-violet/15"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="flex size-9 flex-col items-center justify-center gap-1.5 rounded-full border border-border lg:hidden"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0 }}
              className="block h-px w-4 bg-foreground"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }}
              className="block h-px w-4 bg-foreground"
            />
          </button>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[79] bg-background/95 px-6 pt-28 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-2">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                >
                  <button
                    type="button"
                    onClick={() => go(s.id)}
                    className="w-full border-b border-border py-4 text-left font-display text-3xl font-semibold"
                  >
                    {s.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
