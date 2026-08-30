import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * CustomCursor.jsx
 * Premium two-part cursor: a precise dot plus a lagging ring that morphs
 * into a labelled disc when hovering elements carrying `data-cursor="LABEL"`.
 * Disabled on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      const holder = target?.closest("[data-cursor]");
      setLabel(holder ? holder.getAttribute("data-cursor") || "" : "");
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute size-1.5 -ml-0.75 -mt-0.75 rounded-full bg-foreground"
        style={{ x, y }}
        animate={{ scale: down ? 0.5 : label ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-violet/70"
        style={{ 
          x: ringX, 
          y: ringY, 
          transform: "translate(-50%, -50%)" 
        }}
        animate={{
          width: label ? 84 : 34,
          height: label ? 84 : 34,
          backgroundColor: label
            ? "color-mix(in oklab, var(--violet) 88%, transparent)"
            : "transparent",
          scale: down ? 0.86 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <motion.span
          className="font-mono text-[9px] tracking-[0.2em] text-primary-foreground"
          animate={{ opacity: label ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
