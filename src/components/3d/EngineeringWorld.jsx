import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { worldState, damp } from "../../lib/worldState";
import TechnologyUniverse from "./TechnologyUniverse";
import ProjectWorld from "./ProjectWorld";
import AchievementWorld from "./AchievementWorld";

/**
 * EngineeringWorld.jsx
 * The persistent 3D layer behind the whole page. One Canvas hosts every
 * environment; the camera travels along a scroll-driven path and each
 * sub-world fades in over the scroll range that matches its DOM section.
 */

const VIOLET = "#6366F1";
const MAGENTA = "#0EA5E9";
const AMBER = "#6366F1";
const CORAL = "#0EA5E9";

/* --- The digital core: a layered, breathing engineering nucleus --- */
function DigitalCore() {
  const shell = useRef(null);
  const inner = useRef(null);
  const cage = useRef(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const energy = worldState.activeTech || worldState.activeProject ? 1 : 0;
    if (shell.current) {
      shell.current.rotation.y += dt * 0.12;
      shell.current.rotation.x = Math.sin(t * 0.2) * 0.14;
      const s = 1 + energy * 0.08 + Math.sin(t * 0.9) * 0.015;
      shell.current.scale.setScalar(damp(shell.current.scale.x, s, 4, dt));
    }
    if (cage.current) {
      cage.current.rotation.y -= dt * 0.24;
      cage.current.rotation.z += dt * 0.06;
    }
    if (inner.current) {
      inner.current.rotation.y += dt * 0.5;
      inner.current.material.emissiveIntensity = damp(
        inner.current.material.emissiveIntensity,
        0.35 + energy * 0.5,
        3,
        dt,
      );
    }
  });

  return (
    <group scale={0.8}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.85, 3]} />
        <meshStandardMaterial
          color="#1b1030"
          emissive={MAGENTA}
          emissiveIntensity={0.35}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshStandardMaterial
          color={VIOLET}
          wireframe
          transparent
          opacity={0.35}
          emissive={VIOLET}
          emissiveIntensity={0.35}
        />
      </mesh>

      <group ref={cage}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2 + i * 0.7, i * 0.9, i * 0.4]}>
            <torusGeometry args={[2.5 + i * 0.45, 0.008, 8, 160]} />
            <meshStandardMaterial
              color={i === 1 ? AMBER : i === 2 ? CORAL : MAGENTA}
              emissive={i === 1 ? AMBER : i === 2 ? CORAL : MAGENTA}
              emissiveIntensity={0.8}
              transparent
              opacity={0.5}
              toneMapped={false}
            />
          </mesh>
        ))}

      </group>
    </group>
  );
}

/* --- Ambient particle volume: the "data" of the ecosystem --- */
function ParticleField({ count = 900 }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 6 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 6;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (ref.current) {
      ref.current.rotation.y += dt * 0.02;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={VIOLET}
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* --- Light trails travelling between layers of the architecture --- */
function DataStreams() {
  const curves = useMemo(() => {
    const list = [];
    for (let i = 0; i < 7; i += 1) {
      const a = (i / 7) * Math.PI * 2;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * 7, -5 + i * 0.6, Math.sin(a) * 7),
        new THREE.Vector3(Math.cos(a + 0.6) * 3.4, -1 + i * 0.4, Math.sin(a + 0.6) * 3.4),
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(Math.cos(a + 2.4) * 3.6, 1.6 - i * 0.3, Math.sin(a + 2.4) * 3.6),
        new THREE.Vector3(Math.cos(a + 3) * 8, 4 - i * 0.5, Math.sin(a + 3) * 8),
      ]);
      list.push({ curve, points: curve.getPoints(80), color: i % 2 ? MAGENTA : VIOLET });
    }
    return list;
  }, []);

  const pulses = useRef([]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const boost = worldState.activeTech ? 2.2 : 1;
    pulses.current.forEach((mesh, i) => {
      if (!mesh) return;
      const item = curves[i];
      const t = (state.clock.elapsedTime * 0.12 * boost + i * 0.14) % 1;
      const p = item.curve.getPointAt(t);
      mesh.position.lerp(p, 1 - Math.exp(-14 * dt));
    });
  });

  return (
    <group>
      {curves.map((item, i) => (
        <group key={i}>
          <Line
            points={item.points}
            color={item.color}
            lineWidth={1}
            transparent
            opacity={0.24}
          />
          <mesh ref={(el) => (pulses.current[i] = el)}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color={i % 2 ? AMBER : CORAL} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* --- Floating architectural slabs: services, panels, structures --- */
function FloatingArchitecture() {
  const slabs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        pos: [
          Math.cos((i / 12) * Math.PI * 2) * (5 + (i % 3)),
          -4 + (i % 5) * 1.9,
          Math.sin((i / 12) * Math.PI * 2) * (5 + (i % 4)) - 2,
        ],
        rot: [Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.3],
        scale: [1.3 + (i % 3) * 0.5, 0.05, 0.9 + (i % 2) * 0.4],
        color: i % 4 === 0 ? AMBER : i % 3 === 0 ? CORAL : VIOLET,
      })),
    [],
  );

  return (
    <group>
      {slabs.map((slab, i) => (
        <Float key={i} speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
          <mesh position={slab.pos} rotation={slab.rot} scale={slab.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={slab.color}
              emissive={slab.color}
              emissiveIntensity={0.35}
              metalness={0.8}
              roughness={0.3}
              transparent
              opacity={0.65}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* --- Scroll-driven camera rig + mouse parallax --- */
function CameraRig() {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = worldState.scroll;
    const targetX = Math.sin(p * Math.PI * 2) * 3.2 + worldState.mouseX * 1.1;
    const targetY = 0.6 + Math.sin(p * Math.PI) * 2.4 - worldState.mouseY * 0.8;
    const targetZ = 9.5 - Math.sin(p * Math.PI) * 3.2;

    state.camera.position.x = damp(state.camera.position.x, targetX, 2.2, dt);
    state.camera.position.y = damp(state.camera.position.y, targetY, 2.2, dt);
    state.camera.position.z = damp(state.camera.position.z, targetZ, 2.2, dt);
    state.camera.lookAt(0, Math.sin(p * Math.PI * 1.5) * 0.6, 0);
  });
  return null;
}

function WorldScene() {
  const root = useRef(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (root.current) {
      root.current.rotation.y = damp(
        root.current.rotation.y,
        worldState.mouseX * 0.18,
        1.6,
        dt,
      );
      root.current.rotation.x = damp(
        root.current.rotation.x,
        worldState.mouseY * 0.08,
        1.6,
        dt,
      );
    }
  });

  return (
    <group ref={root}>
      <DigitalCore />
      <ParticleField />
      <DataStreams />
      <FloatingArchitecture />
      <TechnologyUniverse />
      <ProjectWorld />
      <AchievementWorld />
    </group>
  );
}

export default function EngineeringWorld() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity: 0.42,
        maskImage:
          "radial-gradient(120% 100% at 50% 40%, black 45%, transparent 100%)",
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 1, 10], fov: 55 }}
      >
        <color attach="background" args={["#08090D"]} />
        <fog attach="fog" args={["#08090D", 10, 30]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 9, 6]} intensity={0.7} color={VIOLET} />
        <pointLight position={[-7, -3, 4]} intensity={16} color={MAGENTA} distance={26} />
        <pointLight position={[6, 4, -5]} intensity={11} color={AMBER} distance={24} />

        <Suspense fallback={null}>
          <Environment resolution={128}>
            <Lightformer intensity={1.6} position={[0, 5, 0]} scale={[10, 10, 1]} />
            <Lightformer
              intensity={1}
              color={MAGENTA}
              position={[-6, 1, -2]}
              rotation-y={Math.PI / 2}
              scale={[18, 2, 1]}
            />
          </Environment>
          <WorldScene />
        </Suspense>
        <CameraRig />
      </Canvas>
    </div>
  );
}
