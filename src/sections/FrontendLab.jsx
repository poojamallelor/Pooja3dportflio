import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { reactProjects, otherProjects } from "../data/projects";
import { setActiveProject } from "../lib/worldState";

/**
 * FrontendLab.jsx
 * React interface lab plus additional applied projects (Android + web).
 */
export default function FrontendLab() {
  return (
    <Section id="lab">
      <SectionHeading
        index="05"
        kicker="Frontend Lab"
        title="React and JavaScript Projects"
        description="Interactive user interfaces, React builds, and experimental JS projects."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {reactProjects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            onMouseEnter={() => setActiveProject(p.id)}
            onMouseLeave={() => setActiveProject(null)}
            className="panel group overflow-hidden rounded-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden bg-surface-2">
              {p.image ? (
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg leading-tight transition-colors group-hover:text-magenta">
                {p.title}
              </h3>
              {p.year ? (
                <span className="mono-label mt-2 block">{p.year}</span>
              ) : null}
              {p.description ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-20 grid gap-5 lg:grid-cols-2">
        {otherProjects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="panel overflow-hidden rounded-3xl p-8"
          >
            <span className="mono-label text-coral">{p.year}</span>
            <h3 className="mt-4 font-display text-2xl leading-tight">{p.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
