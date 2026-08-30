import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { whyHire } from "../data/portfolio";

/**
 * WhyHire.jsx
 * Closing argument: five capability pillars stated plainly, in a numbered
 * editorial list that reads like a summary sheet.
 */
export default function WhyHire() {
  return (
    <Section id="why">
      <SectionHeading
        index="11"
        kicker="Why Hire Me"
        title="What I bring on day one."
      />

      <div className="mt-16 divide-y divide-border border-y border-border">
        {whyHire.map((pillar, i) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="group grid gap-4 py-8 transition-colors hover:bg-surface/40 lg:grid-cols-[80px_260px_1fr] lg:items-center lg:px-4"
          >
            <span className="mono-label text-violet">{pillar.id}</span>
            <h3 className="text-2xl font-semibold">{pillar.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {pillar.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-surface-2/50 px-3.5 py-1.5 text-xs text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
