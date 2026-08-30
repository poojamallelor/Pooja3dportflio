import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { skillCategories, visualNotes } from "../data/skills";
import { setActiveTech } from "../lib/worldState";

const accentClass = {
  violet: "text-violet",
  magenta: "text-magenta",
  amber: "text-amber",
  coral: "text-coral",
};

/**
 * Stack.jsx
 * The technology universe control panel. Hovering a skill activates the
 * matching cluster inside the persistent 3D world.
 */
export default function Stack() {
  return (
    <Section id="stack">
      <SectionHeading
        index="02"
        kicker="Technology Universe"
        title="A stack I can explain, not just list."
        description="Hover any technology to activate its layer inside the engineering universe rendered behind this page."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
            className="panel rounded-3xl p-7"
          >
            <div className="flex items-center justify-between">
              <span className={`mono-label ${accentClass[cat.accent]}`}>
                {cat.label}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {String(cat.skills.length).padStart(2, "0")}
              </span>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {cat.skills.map((skill) => (
                <li key={skill.name}>
                  <motion.button
                    type="button"
                    whileHover={{ y: -3 }}
                    onMouseEnter={() => setActiveTech(skill.visual)}
                    onMouseLeave={() => setActiveTech(null)}
                    onFocus={() => setActiveTech(skill.visual)}
                    onBlur={() => setActiveTech(null)}
                    title={visualNotes[skill.visual]}
                    className="rounded-full border border-border bg-surface-2/60 px-4 py-2 text-sm transition-colors hover:border-violet hover:text-violet"
                  >
                    {skill.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
