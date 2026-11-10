"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, Group, Vector3 } from "three";

function HeadphoneBand() {
  const band = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-0.74, 0.1, 0),
        new Vector3(-0.73, 0.72, 0),
        new Vector3(-0.43, 1.16, 0),
        new Vector3(0, 1.32, 0),
        new Vector3(0.43, 1.16, 0),
        new Vector3(0.73, 0.72, 0),
        new Vector3(0.74, 0.1, 0),
      ]),
    [],
  );

  return (
    <>
      <mesh>
        <tubeGeometry args={[band, 64, 0.09, 12, false]} />
        <meshStandardMaterial color="#171326" metalness={0.72} roughness={0.22} />
      </mesh>
      <mesh>
        <tubeGeometry args={[band, 64, 0.025, 8, false]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#702cff"
          emissiveIntensity={1.7}
          metalness={0.3}
          roughness={0.3}
        />
      </mesh>
    </>
  );
}

function PersonWearingHeadphones() {
  const person = useRef<Group>(null);

  useFrame((state) => {
    if (!person.current) return;

    const elapsed = state.clock.elapsedTime;
    const entrance = Math.min(elapsed / 1.25, 1);
    const easedEntrance = 1 - (1 - entrance) ** 3;

    person.current.position.y = -1.35 * (1 - easedEntrance) + Math.sin(elapsed * 1.4) * 0.035;
    person.current.scale.setScalar(0.82 + easedEntrance * 0.18);
    person.current.rotation.y = -0.12 + Math.sin(elapsed * 0.42) * 0.035;
    person.current.rotation.x = Math.sin(elapsed * 0.7) * 0.025;
  });

  return (
    <group ref={person} rotation={[0, -0.12, 0]}>
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, -1.1, 0]} scale={[1.05, 0.58, 0.55]}>
          <sphereGeometry args={[1, 40, 32]} />
          <meshStandardMaterial color="#27213a" metalness={0.52} roughness={0.32} />
        </mesh>
        <mesh position={[0, -0.84, 0.43]} scale={[0.48, 0.035, 0.035]}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color="#8063d9" emissive="#4c279e" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <cylinderGeometry args={[0.24, 0.29, 0.55, 32]} />
          <meshStandardMaterial color="#a96f68" roughness={0.65} />
        </mesh>

        <mesh position={[0, 0.27, 0]} scale={[0.66, 0.84, 0.57]}>
          <sphereGeometry args={[1, 48, 40]} />
          <meshStandardMaterial color="#d89a83" roughness={0.68} />
        </mesh>
        <mesh position={[0, 0.88, 0.02]} scale={[0.67, 0.37, 0.58]}>
          <sphereGeometry args={[1, 40, 28]} />
          <meshStandardMaterial color="#211a30" metalness={0.2} roughness={0.48} />
        </mesh>
        <mesh position={[-0.3, 0.77, 0.27]} rotation={[0, 0, -0.38]} scale={[0.2, 0.31, 0.2]}>
          <sphereGeometry args={[1, 24, 20]} />
          <meshStandardMaterial color="#211a30" roughness={0.48} />
        </mesh>
        <mesh position={[0.3, 0.77, 0.27]} rotation={[0, 0, 0.38]} scale={[0.2, 0.31, 0.2]}>
          <sphereGeometry args={[1, 24, 20]} />
          <meshStandardMaterial color="#211a30" roughness={0.48} />
        </mesh>

        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.62, 0.25, 0.03]}>
            <mesh scale={[0.17, 0.24, 0.2]}>
              <sphereGeometry args={[1, 28, 24]} />
              <meshStandardMaterial color="#c98272" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.13]} scale={[0.15, 0.22, 0.17]}>
              <sphereGeometry args={[1, 32, 28]} />
              <meshStandardMaterial color="#171421" metalness={0.78} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.245]} scale={[0.11, 0.17, 0.07]}>
              <sphereGeometry args={[1, 32, 24]} />
              <meshStandardMaterial
                color="#7c3aed"
                emissive="#5917ec"
                emissiveIntensity={1.25}
                metalness={0.45}
                roughness={0.24}
              />
            </mesh>
            <mesh position={[0, 0, 0.3]} scale={[0.07, 0.12, 0.025]}>
              <sphereGeometry args={[1, 24, 20]} />
              <meshStandardMaterial color="#b4f4ff" emissive="#22d3ee" emissiveIntensity={1.8} />
            </mesh>
          </group>
        ))}

        <HeadphoneBand />

        {[-1, 1].map((side) => (
          <group key={`face-${side}`} position={[side * 0.24, 0.3, 0.51]}>
            <mesh scale={[0.075, 0.055, 0.04]}>
              <sphereGeometry args={[1, 24, 20]} />
              <meshStandardMaterial color="#211a30" roughness={0.42} />
            </mesh>
            <mesh position={[0, 0.095, 0]} scale={[0.09, 0.025, 0.04]}>
              <sphereGeometry args={[1, 24, 16]} />
              <meshStandardMaterial color="#493044" roughness={0.5} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.13, 0.55]} scale={[0.09, 0.19, 0.1]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#c98272" roughness={0.68} />
        </mesh>
        <mesh position={[0, -0.04, 0.53]} scale={[0.12, 0.035, 0.035]}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color="#854a58" roughness={0.55} />
        </mesh>
      </group>
    </group>
  );
}

function IntroPerson() {
  const headphones = useRef<Group>(null);
  const leftHand = useRef<Group>(null);
  const rightHand = useRef<Group>(null);
  const person = useRef<Group>(null);
  const band = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-0.74, 0.12, 0),
        new Vector3(-0.72, 0.72, 0),
        new Vector3(-0.42, 1.18, 0),
        new Vector3(0, 1.32, 0),
        new Vector3(0.42, 1.18, 0),
        new Vector3(0.72, 0.72, 0),
        new Vector3(0.74, 0.12, 0),
      ]),
    [],
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const putOn = Math.max(0, Math.min(1, (time - 0.65) / 2.35));
    const easedPutOn = putOn * putOn * (3 - 2 * putOn);
    const reach = Math.min(1, time / 1.15);
    const settle = Math.max(0, Math.min(1, (time - 3.05) / 0.7));

    if (headphones.current) {
      headphones.current.position.y = 0.58 * (1 - easedPutOn);
      headphones.current.scale.setScalar(0.88 + easedPutOn * 0.12);
      headphones.current.rotation.z = Math.sin(time * 1.8) * 0.035 * (1 - putOn);
    }

    for (const [hand, side] of [[leftHand.current, -1], [rightHand.current, 1]] as const) {
      if (!hand) continue;
      const raisedY = -0.1 + reach * 0.78 - settle * 0.72;
      const raisedX = side * (0.92 - reach * 0.12 + settle * 0.1);
      hand.position.set(raisedX, raisedY, 0.52);
      hand.rotation.z = -side * (reach * 0.4) * (1 - settle);
    }

    if (person.current) {
      person.current.position.y = -0.18 + Math.min(time / 0.7, 1) * 0.18;
      person.current.scale.setScalar(0.78);
      person.current.rotation.y = -0.12 + Math.sin(time * 0.65) * 0.025;
    }
  });

  return (
    <group ref={person}>
      <mesh position={[0, -0.88, -0.04]} scale={[1.18, 0.76, 0.58]}>
        <sphereGeometry args={[1, 40, 32]} />
        <meshStandardMaterial color="#27213a" metalness={0.45} roughness={0.34} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.24, 0.32, 0.52, 32]} />
        <meshStandardMaterial color="#b8796d" roughness={0.68} />
      </mesh>
      <mesh position={[0, 0.48, 0]} scale={[0.7, 0.86, 0.58]}>
        <sphereGeometry args={[1, 48, 40]} />
        <meshStandardMaterial color="#d89a83" roughness={0.68} />
      </mesh>
      <mesh position={[0, 1.09, -0.01]} scale={[0.72, 0.35, 0.61]}>
        <sphereGeometry args={[1, 40, 28]} />
        <meshStandardMaterial color="#211a30" roughness={0.45} />
      </mesh>
      <mesh position={[-0.3, 0.91, 0.28]} rotation={[0, 0, -0.35]} scale={[0.22, 0.34, 0.22]}>
        <sphereGeometry args={[1, 24, 20]} />
        <meshStandardMaterial color="#211a30" roughness={0.45} />
      </mesh>
      <mesh position={[0.3, 0.91, 0.28]} rotation={[0, 0, 0.35]} scale={[0.22, 0.34, 0.22]}>
        <sphereGeometry args={[1, 24, 20]} />
        <meshStandardMaterial color="#211a30" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.32, 0.55]} scale={[0.095, 0.2, 0.1]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#c98272" roughness={0.68} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={`eye-${side}`} position={[side * 0.24, 0.57, 0.545]} scale={[0.055, 0.043, 0.035]}>
          <sphereGeometry args={[1, 24, 20]} />
          <meshStandardMaterial color="#211a30" roughness={0.42} />
        </mesh>
      ))}
      <mesh position={[0, 0.12, 0.57]} scale={[0.1, 0.025, 0.025]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#854a58" roughness={0.55} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.67, 0.43, 0.02]}>
          <mesh scale={[0.17, 0.24, 0.2]}>
            <sphereGeometry args={[1, 28, 24]} />
            <meshStandardMaterial color="#c98272" roughness={0.7} />
          </mesh>
        </group>
      ))}

      <group ref={headphones} position={[0, 1.8, 0.1]}>
        <mesh>
          <tubeGeometry args={[band, 64, 0.085, 12, false]} />
          <meshStandardMaterial color="#171326" metalness={0.76} roughness={0.2} />
        </mesh>
        <mesh>
          <tubeGeometry args={[band, 64, 0.024, 8, false]} />
          <meshStandardMaterial color="#a78bfa" emissive="#702cff" emissiveIntensity={1.8} />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.74, 0.12, 0.02]}>
            <mesh scale={[0.19, 0.26, 0.2]}>
              <sphereGeometry args={[1, 32, 28]} />
              <meshStandardMaterial color="#171421" metalness={0.78} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.16]} scale={[0.14, 0.19, 0.07]}>
              <sphereGeometry args={[1, 32, 24]} />
              <meshStandardMaterial
                color="#7c3aed"
                emissive="#5917ec"
                emissiveIntensity={1.25}
                metalness={0.45}
                roughness={0.24}
              />
            </mesh>
          </group>
        ))}
      </group>

      {[[-1, leftHand], [1, rightHand]].map(([side, handRef]) => {
        const direction = side as number;
        const ref = handRef as typeof leftHand;
        return (
          <group key={direction} ref={ref} position={[direction, -0.1, 0.52]}>
            <mesh position={[0, -0.2, 0]} rotation={[0, 0, direction * -0.25]}>
              <capsuleGeometry args={[0.13, 0.55, 8, 20]} />
              <meshStandardMaterial color="#57405b" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.16, 0]} scale={[0.14, 0.17, 0.14]}>
              <sphereGeometry args={[1, 24, 20]} />
              <meshStandardMaterial color="#d89a83" roughness={0.68} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function NeonIntroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 5.6], fov: 36 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-label="Animación de una persona poniéndose audífonos"
    >
      <ambientLight intensity={1.1} />
      <pointLight position={[3, 3, 4]} intensity={48} color="#c2a4ff" />
      <pointLight position={[-3, 0, 2]} intensity={34} color="#22d3ee" />
      <IntroPerson />
    </Canvas>
  );
}

export default function NeonProductScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.48, 4.7], fov: 37 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-label="Persona animada en 3D usando audífonos inalámbricos JEAN"
    >
      <ambientLight intensity={1.05} />
      <pointLight position={[3, 3, 4]} intensity={46} color="#c2a4ff" />
      <pointLight position={[-3, -1, 2]} intensity={34} color="#22d3ee" />
      <pointLight position={[0, 2, -2]} intensity={18} color="#f0abfc" />
      <PersonWearingHeadphones />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={1.12}
        maxPolarAngle={2.02}
        target={[0, 0.48, 0]}
      />
    </Canvas>
  );
}
