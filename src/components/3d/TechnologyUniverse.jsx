import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { worldState, damp } from "../../lib/worldState";

/**
 * TechnologyUniverse.jsx
 * The stack visualisation: layered node clusters for frontend, API, backend,
 * JDBC, database and core CS. Hovering a technology in the DOM sets
 * `worldState.activeTech`, which lights that cluster and its connections.
 */

const LAYERS = [
  { key: "frontend", y: 3.2, radius: 3.1, count: 7, color: "#0EA5E9" },
  { key: "api", y: 1.6, radius: 2.4, count: 5, color: "#0EA5E9" },
  { key: "backend", y: 0, radius: 2.8, count: 6, color: "#6366F1" },
  { key: "jdbc", y: -1.6, radius: 1.9, count: 4, color: "#6366F1" },
  { key: "database", y: -3.2, radius: 2.6, count: 6, color: "#6366F1" },
  { key: "core", y: -4.8, radius: 3.4, count: 8, color: "#6366F1" },
];

function Layer({ layer, index }) {
  const group = useRef(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: layer.count }, (_, i) => {
        const a = (i / layer.count) * Math.PI * 2 + index * 0.4;
        return [Math.cos(a) * layer.radius, 0, Math.sin(a) * layer.radius];
      }),
    [layer, index],
  );

  const ringPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i += 1) {
      const a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * layer.radius, 0, Math.sin(a) * layer.radius));
    }
    return pts;
  }, [layer.radius]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!group.current) return;
    const active =
      worldState.activeTech === layer.key ||
      (layer.key === "backend" && worldState.activeTech === "java");
    group.current.rotation.y += dt * (active ? 0.5 : 0.09) * (index % 2 ? 1 : -1);
    const target = active ? 1.16 : 1;
    group.current.scale.setScalar(damp(group.current.scale.x, target, 4, dt));
    group.current.children.forEach((child) => {
      if (child.material && "opacity" in child.material) {
        child.material.opacity = damp(
          child.material.opacity,
          active ? 1 : 0.42,
          4,
          dt,
        );
      }
    });
  });

  return (
    <group ref={group} position={[0, layer.y, 0]}>
      <Line points={ringPoints} color={layer.color} lineWidth={1} transparent opacity={0.4} />
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color={layer.color}
            emissive={layer.color}
            emissiveIntensity={2}
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function TechnologyUniverse() {
  const root = useRef(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!root.current) return;
    // Visible across the stack range of the page (~18% – 45% scroll).
    const p = worldState.scroll;
    const visible = p > 0.14 && p < 0.5 ? 1 : 0.08;
    root.current.visible = visible > 0.1 || worldState.activeTech !== null;
    root.current.scale.setScalar(
      damp(root.current.scale.x, visible > 0.5 ? 1 : 0.55, 2.4, dt),
    );
    root.current.position.y = damp(root.current.position.y, visible > 0.5 ? 0 : -3, 2, dt);
  });

  return (
    <group ref={root} position={[0, -3, -4]}>
      {LAYERS.map((layer, i) => (
        <Layer key={layer.key} layer={layer} index={i} />
      ))}
    </group>
  );
}
