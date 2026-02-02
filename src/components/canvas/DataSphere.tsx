"use client";

import React, { useRef, useMemo, useState, useEffect, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// --- DETERMINISTIC DATA GENERATION ---
const STAR_COUNT = 5000;
const STAR_DATA = (() => {
  const positions = new Float32Array(STAR_COUNT * 3);
  const phases = new Float32Array(STAR_COUNT);
  const sizes = new Float32Array(STAR_COUNT);
  let seed = 98765;
  const lcg = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = 0; i < STAR_COUNT; i++) {
    const r = 100;
    const theta = 2 * Math.PI * lcg();
    const phi = Math.acos(2 * lcg() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    phases[i] = lcg() * Math.PI * 2;
    sizes[i] = 1.0 + lcg() * 2.0;
  }
  return { positions, phases, sizes };
})();

// --- STARFIELD SHADER ---
const StarfieldShader = {
  uniforms: { uTime: { value: 0 }, uSize: { value: 0.4 } },
  vertexShader: `
    uniform float uTime;
    uniform float uSize;
    attribute float aPhase;
    attribute float aSize;
    varying float vOpacity;
    void main() {
      float twinkle = 0.2 + 0.8 * pow(0.5 + 0.5 * sin(uTime * 0.3 + aPhase), 3.0);
      vOpacity = twinkle;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = uSize * aSize * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying float vOpacity;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5));
      if (d > 0.5) discard;
      float alpha = smoothstep(0.5, 0.1, d) * vOpacity;
      gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    }
  `,
};

const StaticStarfield = memo(() => {
  const meshRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current?.uniforms.uTime) {
      materialRef.current.uniforms.uTime.value = time;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.01;
      meshRef.current.rotation.x = time * 0.005;
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      meshRef.current.position.y = scrollY * 0.01; 
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STAR_DATA.positions, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[STAR_DATA.phases, 1]} />
        <bufferAttribute attach="attributes-aSize" args={[STAR_DATA.sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial 
        ref={materialRef} 
        args={[StarfieldShader]} 
        transparent 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  );
});

StaticStarfield.displayName = "StaticStarfield";

// --- ELECTRIC RING SHADER ---
const RingRevealShader = {
  uniforms: {
    uColor: { value: new THREE.Color("#818cf8") },
    uOpacity: { value: 0 },
    uReveal: { value: 0 },
  },
  vertexShader: `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uReveal;
    varying vec3 vPosition;
    void main() {
      float angle = atan(vPosition.y, vPosition.x);
      if (angle < 0.0) angle += 6.28318530718;
      if (angle > uReveal * 6.28318530718) discard;
      gl_FragColor = vec4(uColor, uOpacity);
    }
  `,
};

interface ElectricRingProps {
  radius: number;
  rotation: [number, number, number];
  speed: number;
  color: string;
  opacity: number;
  pulseSpeed: number;
  visible: boolean;
}

function ElectricRing({ radius, rotation, speed, color, opacity, pulseSpeed, visible }: ElectricRingProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const lineRef = useRef<THREE.Line>(null!);
  const ringMaterialRef = useRef<THREE.ShaderMaterial>(null!);
  const trailMaterialRef = useRef<THREE.LineBasicMaterial>(null!);
  const startTime = useRef<number | null>(null);
  const revealProgress = useRef(0);

  const trailSegments = 60;
  const trailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(trailSegments * 3), 3));
    const colors = new Float32Array(trailSegments * 3);
    const baseColor = new THREE.Color(color);
    for (let i = 0; i < trailSegments; i++) {
      const ratio = 1 - (i / trailSegments);
      colors[i * 3] = baseColor.r * ratio;
      colors[i * 3 + 1] = baseColor.g * ratio;
      colors[i * 3 + 2] = baseColor.b * ratio;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [color]);

  const shaderArgs = useMemo(() => ({
    ...RingRevealShader,
    uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: 0 }, uReveal: { value: 0 } }
  }), [color]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!startTime.current && visible) startTime.current = time;
    if (visible && startTime.current && groupRef.current) {
      const elapsed = time - startTime.current;
      const orbitDuration = (Math.PI * 2) / pulseSpeed;
      revealProgress.current = Math.min(elapsed / orbitDuration, 1);
      if (ringMaterialRef.current?.uniforms.uReveal && ringMaterialRef.current?.uniforms.uOpacity) {
        ringMaterialRef.current.uniforms.uReveal.value = revealProgress.current;
        ringMaterialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(ringMaterialRef.current.uniforms.uOpacity.value, opacity, 0.02);
      }
      if (trailMaterialRef.current) trailMaterialRef.current.opacity = THREE.MathUtils.lerp(trailMaterialRef.current.opacity, 0.8, 0.02);
      groupRef.current.rotation.z = time * speed;
      if (lineRef.current?.geometry.attributes.position) {
        const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
        const currentAngle = elapsed * pulseSpeed;
        for (let i = 0; i < trailSegments; i++) {
          const angle = currentAngle - (i * 0.03); 
          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = Math.sin(angle) * radius;
          positions[i * 3 + 2] = 0;
        }
        lineRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group rotation={rotation}>
      <group ref={groupRef}>
        <mesh>
          <torusGeometry args={[radius, 0.015, 16, 100]} />
          <shaderMaterial ref={ringMaterialRef} args={[shaderArgs]} transparent depthWrite={false} />
        </mesh>
        <primitive object={new THREE.Line(trailGeometry)} ref={lineRef}>
          <lineBasicMaterial ref={trailMaterialRef} vertexColors transparent opacity={0} blending={THREE.AdditiveBlending} />
        </primitive>
      </group>
    </group>
  );
}

function DataCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (shouldShow && materialRef.current) materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 1, 0.02);
    if (meshRef.current && groupRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = time * 0.1;
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      groupRef.current.position.y = scrollY * 0.008;
    }
  });

  const ringRotations = useMemo(() => [
    [Math.PI / 4, Math.PI / 4, 0] as [number, number, number],
    [-Math.PI / 3, Math.PI / 6, 0] as [number, number, number],
    [Math.PI / 2, 0, 0] as [number, number, number],
  ], []);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[4, 0]} />
        <meshPhysicalMaterial 
          ref={materialRef} 
          color="#6366f1" 
          emissive="#1e1b4b" 
          emissiveIntensity={0.65} 
          metalness={1} 
          roughness={0.1} 
          transmission={0.8} 
          thickness={5} 
          ior={1.5} 
          wireframe 
          transparent 
          opacity={0} 
        />
      </mesh>
      <ElectricRing radius={5.5} rotation={ringRotations[0]!} speed={0.1} color="#818cf8" opacity={0.05} pulseSpeed={0.8} visible={shouldShow} />
      <ElectricRing radius={6.5} rotation={ringRotations[1]!} speed={-0.15} color="#c084fc" opacity={0.05} pulseSpeed={1.1} visible={shouldShow} />
      <ElectricRing radius={7.5} rotation={ringRotations[2]!} speed={0.05} color="#6366f1" opacity={0.05} pulseSpeed={0.6} visible={shouldShow} />
      <pointLight intensity={shouldShow ? 10 : 0} color="#818cf8" distance={15} />
    </group>
  );
}

export default function AdvancedCanvas() {
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="absolute inset-0 -z-10 h-full w-full bg-[#02010a]" />;
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-[#02010a]">
      <div className={`w-full h-full transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <Canvas dpr={[1, 2]} gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }} onCreated={() => setIsReady(true)}>
          <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
          <color attach="background" args={["#02010a"]} />
          <StaticStarfield />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <DataCrystal />
          </Float>
          <ambientLight intensity={0.4} />
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.4} intensity={1.5} radius={0.5} />
            <Noise opacity={0.02} />
            <Vignette darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
