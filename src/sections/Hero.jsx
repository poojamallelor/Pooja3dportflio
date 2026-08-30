import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile, contact } from "../data/portfolio";
import MagneticButton from "../components/MagneticButton";
import { scrollToSection } from "../components/SmoothScroll";

/**
 * Hero.jsx
 * Cinematic opening: split editorial type, rotating role marquee and
 * primary calls to action over the live 3D engineering universe.
 */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  const letters = profile.lastName.split("");

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-6 pt-32 pb-24 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="mono-label">{profile.location}</span>
            <span className="hidden h-px w-14 bg-border sm:block" />
            <span className="mono-label text-violet">Portfolio 2026</span>
          </motion.div>

          <h1 className="mt-8 font-display text-[13vw] font-semibold leading-[0.84] tracking-[-0.04em] sm:text-[9vw] lg:text-[7.4vw]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block text-muted-foreground"
            >
              {profile.firstName}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="block text-2xl tracking-[0.4em] text-violet sm:text-3xl"
            >
              {profile.middleName}
            </motion.span>
            <span className="block overflow-hidden">
              {letters.map((c, i) => (
                <motion.span
                  key={`${c}-${i}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.35 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-aurora"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </h1>

          <div className="mt-10 h-8 overflow-hidden">
            {profile.roles.map((role, i) => (
              <motion.p
                key={role}
                animate={{
                  y: `${(i - roleIndex) * 100}%`,
                  opacity: i === roleIndex ? 1 : 0,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-sm tracking-[0.28em] text-amber"
                style={{ height: "2rem", lineHeight: "2rem" }}
              >
                {role}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton cursor="VIEW" onClick={() => scrollToSection("projects")}>
              View Projects
            </MagneticButton>
            <MagneticButton
              variant="outline"
              cursor="TALK"
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              cursor="MAIL"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="panel rounded-3xl p-6"
        >
          <span className="mono-label">Core Stack</span>
          <ul className="mt-5 space-y-3">
            {profile.coreStack.map((tech, i) => (
              <li
                key={tech}
                className="flex items-baseline justify-between border-b border-border pb-3 last:border-0"
              >
                <span className="font-display text-lg">{tech}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-muted-foreground uppercase">
            B.Tech CSE · CGPA 8.1 · Graduating 2027
          </p>
        </motion.aside>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <span className="mono-label">Scroll</span>
      </motion.div>
    </section>
  );
}
