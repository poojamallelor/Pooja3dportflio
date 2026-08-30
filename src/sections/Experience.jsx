import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { experience } from "../data/experience";

/**
 * Experience.jsx
 * Internship and training timeline with a scroll-drawn spine.
 */
export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="06"
        kicker="Engineering Journey"
        title="Internships and structured training."
        description="Where I practiced Java, SQL and workplace engineering habits outside the classroom."
      />

      <div className="relative mt-16 pl-8 sm:pl-14">
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-0 top-0 h-full w-px origin-top sm:left-3"
          style={{ background: "var(--gradient-aurora)" }}
        />

        <ol className="space-y-12">
          {experience.map((e, i) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, x: 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="relative"
            >
              <span className="absolute -left-8 top-2 size-2.5 rounded-full bg-violet ring-4 ring-background sm:-left-[2.85rem]" />
              <div className="panel rounded-3xl p-8">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="mono-label text-amber">{e.period}</span>
                  {e.duration ? <span className="mono-label">{e.duration}</span> : null}
                  {e.mode ? <span className="mono-label">{e.mode}</span> : null}
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight">{e.role}</h3>
                <p className="mt-1 text-sm text-violet">{e.org}</p>
                <ul className="mt-5 space-y-2">
                  {e.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-magenta" />
                      {p}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
