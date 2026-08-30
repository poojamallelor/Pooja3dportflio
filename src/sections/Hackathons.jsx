import { motion } from "motion/react";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import { hackathons } from "../data/hackathons";
import { setActiveAchievement } from "../lib/worldState";

/**
 * Hackathons.jsx
 * Competition ledger. The featured (hero) entry gets a trophy-scale panel and
 * activates the achievement environment in the 3D world on hover.
 */
export default function Hackathons() {
  const hero = hackathons.find((h) => h.hero);
  const rest = hackathons.filter((h) => !h.hero);

  return (
    <Section id="hackathons">
      <SectionHeading
        index="08"
        kicker="Hackathons"
        title="Built under pressure, repeatedly."
        description="Six national and state level competitions, from 24-hour sprints to a first-prize finish."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {hero ? (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => setActiveAchievement(true)}
            onMouseLeave={() => setActiveAchievement(false)}
            className="panel relative overflow-hidden rounded-3xl p-9"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--gradient-aurora)" }}
            />
            <span className="mono-label text-amber">Featured Result</span>
            <h3 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
              {hero.name}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{hero.scope}</p>

            <div className="mt-10 flex flex-wrap items-end gap-8">
              <div>
                <p className="mono-label">Result</p>
                <p className="mt-2 text-2xl font-semibold text-amber">
                  {hero.result}
                </p>
              </div>
              <div>
                <p className="mono-label">Year</p>
                <p className="mt-2 text-2xl font-semibold">{hero.year}</p>
              </div>
            </div>
          </motion.article>
        ) : null}

        <ul className="grid gap-3">
          {rest.map((h, i) => (
            <motion.li
              key={h.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="panel flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-colors hover:border-violet/50"
            >
              <div>
                <p className="text-base font-medium">{h.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{h.scope}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-violet">{h.result}</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {h.year}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
