"use client";
import { useRef, useMemo, useCallback, PointerEvent as ReactPointerEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { orbitTech } from "@/lib/data";

interface SkillPointData {
  label: string;
  color: string;
  position: [number, number, number];
}

const SPHERE_RADIUS = 1.55;

function fibonacciSpherePoints(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push([x * radius, y * radius, z * radius]);
  }
  return points;
}

interface OrbitState { rotX: number; rotY: number; velX: number; velY: number; }

function CoreGlow() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 0.55 + Math.sin(t * 1.4) * 0.15;
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = pulse;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.06);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 8 + pulse * 6;
    }
  });

  return (
    <>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial color="#3b82f6" emissive="#7c3aed" emissiveIntensity={0.6} roughness={0.2} metalness={0.4} wireframe />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.05, 24, 24]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} depthWrite={false} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={10} color="#7c3aed" distance={5} />
    </>
  );
}

function SphereGroup({
  orbitRef, dragRef, points,
}: {
  orbitRef: { current: OrbitState };
  dragRef: { current: boolean };
  points: SkillPointData[];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const o = orbitRef.current;
    if (!dragRef.current) {
      o.velY += (0.06 - o.velY) * 0.02;
      o.rotY += o.velY * delta * 10;
      o.velX *= 0.94;
      o.rotX = THREE.MathUtils.clamp(o.rotX + o.velX, -0.5, 0.5);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = o.rotY;
      groupRef.current.rotation.x = o.rotX;
    }

    const euler = new THREE.Euler(o.rotX, o.rotY, 0, "XYZ");
    points.forEach((p, i) => {
      tmpVec.set(p.position[0], p.position[1], p.position[2]);
      tmpVec.applyEuler(euler);
      const depth = THREE.MathUtils.mapLinear(tmpVec.z, -SPHERE_RADIUS, SPHERE_RADIUS, 0.3, 1);
      const scale = THREE.MathUtils.mapLinear(tmpVec.z, -SPHERE_RADIUS, SPHERE_RADIUS, 0.8, 1.15);
      const el = labelRefs.current[i];
      if (el) {
        el.style.opacity = String(depth);
        el.style.transform = `scale(${scale})`;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <CoreGlow />

      {points.map((p, i) => (
        <group key={p.label}>
          <Line points={[[0, 0, 0], p.position]} color={p.color} transparent opacity={0.18} lineWidth={1} />
          <group position={p.position}>
            <Html center distanceFactor={7} occlude={false} style={{ pointerEvents: "auto" }}>
              <div
                ref={(el) => { labelRefs.current[i] = el; }}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: p.color,
                  whiteSpace: "nowrap",
                  cursor: "none",
                  textShadow: `0 0 10px ${p.color}aa`,
                  transition: "text-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = `0 0 18px ${p.color}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = `0 0 10px ${p.color}aa`;
                }}
              >
                {p.label}
              </div>
            </Html>
          </group>
        </group>
      ))}
    </group>
  );
}

export function SkillsSphere() {
  const orbitRef = useRef<OrbitState>({ rotX: 0.15, rotY: 0, velX: 0, velY: 0.06 });
  const dragRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });

  const points = useMemo<SkillPointData[]>(() => {
    const all = [
      ...orbitTech.inner.map((it) => ({ ...it, color: "#60a5fa" })),
      ...orbitTech.mid.map((it) => ({ ...it, color: "#a78bfa" })),
      ...orbitTech.outer.map((it) => ({ ...it, color: "#22d3ee" })),
    ];
    const coords = fibonacciSpherePoints(all.length, SPHERE_RADIUS);
    return all.map((it, i) => ({ label: it.label, color: it.color, position: coords[i] }));
  }, []);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = true;
    pointerRef.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - pointerRef.current.x;
    const dy = e.clientY - pointerRef.current.y;
    pointerRef.current = { x: e.clientX, y: e.clientY };
    orbitRef.current.velY = dx * 0.004;
    orbitRef.current.velX = dy * 0.003;
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current = false;
  }, []);

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ position: "relative", height: "clamp(340px, 45vw, 460px)", width: "100%", cursor: "grab", touchAction: "none", overflow: "hidden" }}
    >
      <Canvas camera={{ position: [0, 0.3, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1} />
        <SphereGroup orbitRef={orbitRef} dragRef={dragRef} points={points} />
      </Canvas>
    </div>
  );
}