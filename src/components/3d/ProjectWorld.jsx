import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { fullStackProjects, reactProjects } from "../../data/projects";
import { worldState, damp } from "../../lib/worldState";

/**
 * ProjectWorld.jsx
 * Project environment: translucent glass panels arranged as a deep corridor.
 * Hovering a project card sets `worldState.activeProject`, pushing that panel
 * forward and raising its emissive energy.
 */

const COLORS = ["#6366F1", "#0EA5E9", "#6366F1", "#0EA5E9"];

const PROJECT_IDS = [
  ...fullStackProjects.map((p) => p.id),
  ...reactProjects.map((p) => p.id),
];

function Panel({ index, total }) {
  const ref = useRef(null);
  const projectID = PROJECT_IDS[index];
  const base = useMemo(() => {
    const side = index % 2 === 0 ? -1 : 1;
    return [side * (3.2 + (index % 3) * 0.7), 1.6 - index * 0.9, -2 - index * 1.6];
  }, [index]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!ref.current) return;
    const active = worldState.activeProject === projectID;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = damp(
      ref.current.rotation.y,
      (index % 2 === 0 ? 0.45 : -0.45) + worldState.mouseX * 0.12,
      2,
      dt,
    );
    ref.current.position.z = damp(
      ref.current.position.z,
      base[2] + (active ? 1.4 : 0) + Math.sin(t * 0.4 + index) * 0.15,
      2.4,
      dt,
    );
    const mat = ref.current.material;
    mat.emissiveIntensity = damp(mat.emissiveIntensity, active ? 1.3 : 0.32, 3, dt);
    mat.opacity = damp(mat.opacity, active ? 0.5 : 0.22, 3, dt);
  });

  const color = COLORS[index % COLORS.length];

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={ref} position={base}>
        <boxGeometry args={[2.6, 1.55, 0.04]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.32}
          metalness={0.7}
          roughness={0.15}
          transparent
          opacity={0.22}
        />
      </mesh>
    </Float>
  );
}

export default function ProjectWorld() {
  const root = useRef(null);
  const total = 7;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!root.current) return;
    const p = worldState.scroll;
    const inRange = p > 0.28 && p < 0.68;
    root.current.visible = inRange || worldState.activeProject !== null;
    root.current.scale.setScalar(damp(root.current.scale.x, inRange ? 1 : 0.6, 2.2, dt));
  });

  return (
    <group ref={root}>
      {Array.from({ length: total }, (_, i) => (
        <Panel key={i} index={i} total={total} />
      ))}
    </group>
  );
}
