import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

/* =========================================================
   PREM.OS 3D CORE
   Deliberately uses only @react-three/fiber primitives.
   This avoids the Drei renderer/error path that triggered
   the masked "Cannot convert object to primitive value" error.
========================================================= */

const nodes = [
    { name: "AI", position: [0, 2.25, 0] },
    { name: "React", position: [2.15, 0.65, 0] },
    { name: "Node", position: [1.4, -1.85, 0] },
    { name: "Python", position: [-1.45, -1.85, 0] },
    { name: "RAG", position: [-2.2, 0.55, 0] },
];

function TechNode({ name, position }) {
    const group = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!group.current) return;

        const time = state.clock.getElapsedTime();
        const target = hovered ? 1.28 : 1;

        group.current.scale.x += (target - group.current.scale.x) * 0.12;
        group.current.scale.y += (target - group.current.scale.y) * 0.12;
        group.current.scale.z += (target - group.current.scale.z) * 0.12;

        group.current.position.y =
            position[1] + Math.sin(time * 1.8 + position[0]) * 0.045;
    });

    return (
        <group
            ref={group}
            position={position}
            onPointerOver={(event) => {
                event.stopPropagation();
                setHovered(true);
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = "default";
            }}
        >
            <mesh>
                <sphereGeometry args={[0.085, 16, 16]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={hovered ? 2.5 : 0.8}
                    metalness={0.8}
                    roughness={0.15}
                />
            </mesh>

            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry
                    args={[hovered ? 0.19 : 0.145, 0.008, 6, 24]}
                />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={hovered ? 0.9 : 0.4}
                />
            </mesh>
        </group>
    );
}

function Core() {
    const group = useRef();

    useFrame((state) => {
        if (!group.current) return;

        const time = state.clock.getElapsedTime();

        const targetX =
            Math.sin(time * 0.35) * 0.12 + state.pointer.y * 0.22;
        const targetY =
            time * 0.22 + state.pointer.x * 0.42;
        const targetZ =
            Math.sin(time * 0.2) * 0.06 - state.pointer.x * 0.08;

        group.current.rotation.x +=
            (targetX - group.current.rotation.x) * 0.035;
        group.current.rotation.y +=
            (targetY - group.current.rotation.y) * 0.035;
        group.current.rotation.z +=
            (targetZ - group.current.rotation.z) * 0.035;
    });

    return (
        <group ref={group}>
            {/* Main wireframe core */}
            <mesh>
                <icosahedronGeometry args={[1.25, 1]} />
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.45}
                />
            </mesh>

            {/* Inner energy core */}
            <mesh>
                <icosahedronGeometry args={[0.58, 1]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={1.2}
                    metalness={1}
                    roughness={0.1}
                />
            </mesh>

            {/* Orbit rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.65, 0.018, 12, 64]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.5}
                />
            </mesh>

            <mesh rotation={[0.8, 0.4, 0.2]}>
                <torusGeometry args={[1.95, 0.01, 12, 64]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.25}
                />
            </mesh>

            <mesh rotation={[1.4, 0.2, 0.8]}>
                <torusGeometry args={[2.25, 0.006, 10, 64]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.12}
                />
            </mesh>

            {/* Minimal technology nodes */}
            {nodes.map((node) => (
                <TechNode
                    key={node.name}
                    name={node.name}
                    position={node.position}
                />
            ))}
        </group>
    );
}

function Hero3D() {
    return (
        <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[520px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />

            <Canvas
                camera={{
                    position: [0, 0, 7],
                    fov: 45,
                }}
                dpr={[1, 1.25]}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                }}
            >
                <ambientLight intensity={1.2} />

                <directionalLight
                    position={[4, 5, 6]}
                    intensity={3}
                />

                <pointLight
                    position={[-4, -2, 4]}
                    intensity={2}
                />

                <pointLight
                    position={[3, 0, 2]}
                    intensity={1.5}
                />

                <Core />
            </Canvas>

            {/* HTML labels preserve the original technology-node meaning
          without using Drei's Text renderer. */}
            <div className="pointer-events-none absolute inset-0">
                <span className="absolute left-1/2 top-[13%] -translate-x-1/2 text-[8px] uppercase tracking-[0.25em] text-white/35">
                    AI
                </span>
                <span className="absolute right-[8%] top-[40%] text-[8px] uppercase tracking-[0.25em] text-white/30">
                    React
                </span>
                <span className="absolute right-[23%] bottom-[13%] text-[8px] uppercase tracking-[0.25em] text-white/25">
                    Node
                </span>
                <span className="absolute left-[21%] bottom-[13%] text-[8px] uppercase tracking-[0.25em] text-white/25">
                    Python
                </span>
                <span className="absolute left-[7%] top-[40%] text-[8px] uppercase tracking-[0.25em] text-white/30">
                    RAG
                </span>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/35">
                        PREM.OS
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero3D;
