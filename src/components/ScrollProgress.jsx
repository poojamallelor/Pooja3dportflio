import { motion, useScroll, useSpring } from "motion/react";

/**
 * ScrollProgress.jsx
 * Fixed aurora progress bar driven by the document scroll position.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, background: "var(--gradient-aurora)" }}
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left"
    />
  );
}
