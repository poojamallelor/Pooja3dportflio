import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * MagneticButton.jsx
 * Reusable magnetic CTA. The element leans toward the cursor with spring
 * physics and sweeps a light band on hover. Renders as <a> when `href` is set.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  download,
  target,
  rel,
  cursor,
  className = "",
  ariaLabel,
}) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 18, mass: 0.5 });
  const y = useSpring(my, { stiffness: 250, damping: 18, mass: 0.5 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 22);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 14);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors";
  const styles = {
    primary:
      "bg-violet text-primary-foreground hover:bg-magenta shadow-[var(--shadow-lift)]",
    outline:
      "border border-violet/45 text-foreground hover:border-magenta hover:text-magenta",
    ghost: "border border-border text-muted-foreground hover:text-foreground",
  };

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        className="relative z-10 block"
        initial={false}
        whileHover={{ x: 4 }}
      >
        →
      </motion.span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </>
  );

  const props = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    style: { x, y },
    className: `${base} ${styles[variant]} ${className}`,
    "data-cursor": cursor,
    "aria-label": ariaLabel,
    whileTap: { scale: 0.96 },
  };

  if (href) {
    return (
      <motion.a href={href} download={download} target={target} rel={rel} {...props}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} {...props}>
      {inner}
    </motion.button>
  );
}
