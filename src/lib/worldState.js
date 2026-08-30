// Lightweight shared state between DOM sections and the 3D world.
// Mutated imperatively so 3D frames read it without triggering React re-renders.

export const worldState = {
  scroll: 0, // 0..1 page progress
  mouseX: 0, // -1..1
  mouseY: 0, // -1..1
  activeTech: null, // e.g. "java" | "backend" | "api" | "database" | "frontend"
  activeProject: null,
  activeAchievement: false,
  reducedMotion: false,
};

export function setActiveTech(visual) {
  worldState.activeTech = visual;
}

export function setActiveProject(id) {
  worldState.activeProject = id;
}

export function setActiveAchievement(flag) {
  worldState.activeAchievement = flag;
}

export function initWorldListeners() {
  if (typeof window === "undefined") return () => {};

  worldState.reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const onScroll = () => {
    const max = document.body.scrollHeight - window.innerHeight;
    worldState.scroll = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  };
  const onMove = (e) => {
    worldState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    worldState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("pointermove", onMove, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    window.removeEventListener("pointermove", onMove);
  };
}

export function damp(current, target, lambda, delta) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}
