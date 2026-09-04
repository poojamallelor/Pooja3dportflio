import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function AIOrb({ scale = 1, isHovered = false }) {
  const orbRef = useRef();

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group scale={scale}>
      <Sphere ref={orbRef} args={[1, 64, 64]} scale={isHovered ? 1.1 : 1}>
        <MeshDistortMaterial
          color={isHovered ? "#d946ef" : "#8b5cf6"}
          attach="material"
          distort={0.4}
          speed={isHovered ? 3 : 1.5}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.8}
        />
      </Sphere>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#d946ef" />
    </group>
  );
}
