import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { worldState, damp } from "../../lib/worldState";

/**
 * AchievementWorld.jsx
 * Late-scroll environment for hackathons and proof of work: a faceted prism
 * "trophy" ringed by orbiting medals that spin up when an achievement is
 * hovered in the DOM.
 */

export default function AchievementWorld() {
  const root = useRef(null);
  const prism = useRef(null);
  const ring = useRef(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = worldState.scroll;
    const inRange = p > 0.6;
    if (root.current) {
      root.current.visible = inRange || worldState.activeAchievement;
      root.current.scale.setScalar(damp(root.current.scale.x, inRange ? 1 : 0.4, 2.2, dt));
      root.current.position.y = damp(root.current.position.y, inRange ? 0 : -4, 2, dt);
    }
    const hot = worldState.activeAchievement ? 1 : 0;
    if (prism.current) {
      prism.current.rotation.y += dt * (0.3 + hot * 0.9);
      prism.current.material.emissiveIntensity = damp(
        prism.current.material.emissiveIntensity,
        0.9 + hot * 2.2,
        3,
        dt,
      );
    }
    if (ring.current) {
      ring.current.rotation.y -= dt * (0.5 + hot * 1.4);
      ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return null;
}
