import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const technologies = [
    {
        name: "AI",
        position: [0, 2.25, 0],
    },
    {
        name: "React",
        position: [2.25, 0.45, 0.3],
    },
    {
        name: "Node.js",
        position: [1.35, -1.8, -0.2],
    },
    {
        name: "Python",
        position: [-1.6, -1.65, 0.2],
    },
    {
        name: "LangGraph",
        position: [-2.35, 0.45, -0.3],
    },
];

function Core() {
    const ref = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (ref.current) {
            ref.current.rotation.x = Math.sin(time * 0.25) * 0.15;
            ref.current.rotation.y = time * 0.2;
        }
    });

    return (
        <group ref={ref}>
            {/* Outer wireframe */}
            <mesh>
                <icosahedronGeometry args={[1.25, 1]} />

                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.35}
                />
            </mesh>

            {/* Inner core */}
            <mesh>
                <icosahedronGeometry args={[0.55, 2]} />

                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.35}
                    roughness={0.2}
                    metalness={0.9}
                />
            </mesh>

            {/* Inner ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.55, 0.012, 12, 80]} />

                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.45}
                />
            </mesh>
        </group>
    );
}

function Node({ name, position, index, systemActive }) {
    const ref = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (!ref.current) return;

        const targetScale = systemActive ? 1.15 : 1;

        ref.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.05
        );

        ref.current.position.y =
            position[1] + Math.sin(time * 1.2 + index) * 0.08;

        ref.current.rotation.y = time * 0.5;
    });

    return (
        <group ref={ref} position={position}>
            <mesh>
                <sphereGeometry args={[0.09, 16, 16]} />

                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={systemActive ? 1.4 : 0.8}
                />
            </mesh>

            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.17, 0.008, 8, 32]} />

                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={systemActive ? 0.65 : 0.35}
                />
            </mesh>

            <Text
                position={[0, -0.25, 0]}
                fontSize={0.16}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {name}
            </Text>
        </group>
    );
}

function Connections() {
    const lines = useMemo(() => {
        const center = new THREE.Vector3(0, 0, 0);

        return technologies.map((tech) => {
            const points = [
                center,
                new THREE.Vector3(...tech.position),
            ];

            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            return geometry;
        });
    }, []);

    return (
        <>
            {lines.map((geometry, index) => (
                <line key={index} geometry={geometry}>
                    <lineBasicMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.12}
                    />
                </line>
            ))}
        </>
    );
}

function Scene({ systemActive }) {
    const { pointer } = useThree();
    const sceneRef = useRef();

    useFrame(() => {
        if (!sceneRef.current) return;

        const targetY = systemActive
            ? pointer.x * 0.25
            : pointer.x * 0.15;

        const targetX = systemActive
            ? -pointer.y * 0.15
            : -pointer.y * 0.08;

        sceneRef.current.rotation.y +=
            (targetY - sceneRef.current.rotation.y) * 0.02;

        sceneRef.current.rotation.x +=
            (targetX - sceneRef.current.rotation.x) * 0.02;

        const targetScale = systemActive ? 1.12 : 1;

        sceneRef.current.scale.lerp(
            new THREE.Vector3(
                targetScale,
                targetScale,
                targetScale
            ),
            0.03
        );
    });

    return (
        <group ref={sceneRef}>
            <Core />

            <Connections />

            {technologies.map((technology, index) => (
                <Node
                    key={technology.name}
                    {...technology}
                    index={index}
                    systemActive={systemActive}
                />
            ))}
        </group>
    );
}

function DeveloperCore({ systemActive }) {
    return (
        <div className="h-[560px] w-full">
            <Canvas
                camera={{
                    position: [0, 0, 7],
                    fov: 45,
                }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={1.2} />

                <directionalLight
                    position={[4, 4, 5]}
                    intensity={2.5}
                />

                <pointLight
                    position={[-3, -2, 3]}
                    intensity={2}
                />

                <Float
                    speed={systemActive ? 1.5 : 1}
                    rotationIntensity={systemActive ? 0.25 : 0.15}
                    floatIntensity={systemActive ? 0.7 : 0.4}
                >
                    <Scene systemActive={systemActive} />
                </Float>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                />
            </Canvas>
        </div>
    );
}

export default DeveloperCore;