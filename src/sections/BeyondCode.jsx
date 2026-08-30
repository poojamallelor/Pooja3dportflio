import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { beyondCode, personal } from "../data/portfolio";

/**
 * BeyondCode.jsx
 * Leadership, communication and community involvement, plus the personal
 * layer (languages and interests) that rounds out the engineering profile.
 */
export default function BeyondCode() {
  return (
    <Section id="beyond">
      <SectionHeading
        index="09"
        kicker="Beyond Code"
        title="Leadership, stage time and service."
        description="Engineering rarely happens alone — these are the roles where I coordinate, present and contribute."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {beyondCode.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="panel rounded-3xl p-7 transition-colors hover:border-magenta/50"
          >
            <span className="mono-label text-magenta">{item.org}</span>
            <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.detail}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div id="personal" className="mt-10 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="panel rounded-3xl p-7"
        >
          <span className="mono-label text-amber">Languages</span>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {personal.languages.map((lang) => (
              <li
                key={lang}
                className="rounded-full border border-border bg-surface-2/60 px-4 py-2 text-sm"
              >
                {lang}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="panel rounded-3xl p-7"
        >
          <span className="mono-label text-coral">Interests</span>
          <ul className="mt-6 space-y-3">
            {personal.interests.map((interest) => (
              <li
                key={interest}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <span className="mt-2 h-1 w-4 shrink-0 rounded-full bg-coral/70" />
                {interest}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
