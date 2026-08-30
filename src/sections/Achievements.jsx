import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { achievements } from "../data/achievements";
import { setActiveAchievement } from "../lib/worldState";

const accentBorder = {
  violet: "hover:border-violet/60",
  magenta: "hover:border-magenta/60",
  amber: "hover:border-amber/60",
  coral: "hover:border-coral/60",
};
const accentText = {
  violet: "text-violet",
  magenta: "text-magenta",
  amber: "text-amber",
  coral: "text-coral",
};

/**
 * Achievements.jsx
 * Proof-of-work gallery. Primary tiers span wider cells for editorial rhythm.
 */
export default function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        index="07"
        kicker="Proof Of Work"
        title="Certifications, research and recognition."
        description="Independent validation of the fundamentals I build on."
      />

      <div
        className="mt-16 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3"
        onMouseEnter={() => setActiveAchievement(true)}
        onMouseLeave={() => setActiveAchievement(false)}
      >
        {achievements.map((a, i) => (
          <motion.article
            key={a.id}
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
            className={`panel flex flex-col justify-between rounded-3xl p-7 transition-colors ${
              accentBorder[a.accent]
            } ${a.tier === "primary" ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <div>
              <span className={`mono-label ${accentText[a.accent]}`}>
                {a.highlight}
              </span>
              <h3 className="mt-4 font-display text-2xl leading-tight">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {a.issuer}
              </p>
            </div>
            {a.metrics.length ? (
              <ul className="mt-7 flex flex-wrap gap-2">
                {a.metrics.map((m) => (
                  <li
                    key={m}
                    className="rounded-full bg-surface-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
