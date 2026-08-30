import { motion } from "motion/react";

/**
 * SectionHeading.jsx
 * Editorial section header: numbered mono index, clip-path title reveal
 * and an animated hairline that draws in on scroll.
 */
export default function SectionHeading({ index, kicker, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        {index ? <span className="mono-label text-violet">{index}</span> : null}
        {kicker ? <span className="mono-label">{kicker}</span> : null}
      </motion.div>

      <motion.h2
        initial={{ clipPath: "inset(0 0 100% 0)", y: 24 }}
        whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 text-4xl font-semibold leading-[0.95] sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="hairline mt-6 origin-left"
      />

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-base leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
