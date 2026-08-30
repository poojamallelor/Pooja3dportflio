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

  return (
    <group ref={root} position={[0, 0, -2]}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh ref={prism}>
          <coneGeometry args={[1.1, 2.4, 6]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={0.9}
            metalness={0.95}
            roughness={0.15}
            transparent
            opacity={0.75}
          />
        </mesh>
      </Float>

      <group ref={ring}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 3, Math.sin(a * 2) * 0.6, Math.sin(a) * 3]}>
              <torusGeometry args={[0.28, 0.045, 10, 40]} />
              <meshStandardMaterial
                color={i % 2 ? "#EC4899" : "#FB7185"}
                emissive={i % 2 ? "#EC4899" : "#FB7185"}
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
