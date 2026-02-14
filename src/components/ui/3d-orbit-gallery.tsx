"use client"

import { useRef, useMemo, Suspense, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTexture, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

const BASE_IMAGES = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop",

]

// Duplicate to increase density
const IMAGES = [...BASE_IMAGES, ...BASE_IMAGES]

function CameraAdjustment() {
    const { camera } = useThree()

    useEffect(() => {
        const handleResize = () => {
            // If width is less than 768px (mobile), move camera back to 65
            // Otherwise keep it at 38
            if (window.innerWidth < 768) {
                camera.position.setZ(45)
            } else {
                camera.position.setZ(38)
            }
            camera.updateProjectionMatrix()
        }

        // Initial check
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [camera])

    return null
}

function OrbitingContent() {
    const SPHERE_RADIUS = 16
    const ROTATION_SPEED_X = 0.0
    const ROTATION_SPEED_Y = 0.0001
    const IMAGE_SIZE = 3

    const groupRef = useRef<THREE.Group>(null)

    const textures = useTexture(IMAGES)

    useMemo(() => {
        textures.forEach((texture) => {
            texture.wrapS = THREE.ClampToEdgeWrapping
            texture.wrapT = THREE.ClampToEdgeWrapping
            texture.flipY = false
            texture.colorSpace = THREE.SRGBColorSpace
        })
    }, [textures])

    const orbitingImages = useMemo(() => {
        const images = []
        const count = IMAGES.length

        for (let i = 0; i < count; i++) {
            // Distribute points on a sphere using Fibonacci spiral for even distribution
            const offset = 2 / count
            const increment = Math.PI * (3 - Math.sqrt(5))

            const y = ((i * offset) - 1) + (offset / 2)
            const r = Math.sqrt(1 - Math.pow(y, 2))

            const phi = ((i + 1) * increment) % (2 * Math.PI)

            const x = Math.cos(phi) * r
            const z = Math.sin(phi) * r

            // Scale to sphere radius
            const position = new THREE.Vector3(x * SPHERE_RADIUS, y * SPHERE_RADIUS, z * SPHERE_RADIUS)

            // Calculate rotation to face center (or outward)
            const center = new THREE.Vector3(0, 0, 0)
            const outwardDirection = position.clone().sub(center).normalize()

            const matrix = new THREE.Matrix4()
            matrix.lookAt(position, position.clone().add(outwardDirection), new THREE.Vector3(0, 1, 0))
            const euler = new THREE.Euler()
            euler.setFromRotationMatrix(matrix)
            euler.z += Math.PI // Correct orientation if needed

            images.push({
                position: [position.x, position.y, position.z] as [number, number, number],
                rotation: [euler.x, euler.y, euler.z] as [number, number, number],
                textureIndex: i,
            })
        }
        return images
    }, [SPHERE_RADIUS]) // Re-calc if radius changes

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += ROTATION_SPEED_Y
            groupRef.current.rotation.x += ROTATION_SPEED_X
        }
    })

    return (
        <group ref={groupRef}>
            {orbitingImages.map((image, index) => (
                <mesh key={`image-${index}`} position={image.position} rotation={image.rotation}>
                    <circleGeometry args={[IMAGE_SIZE / 2, 32]} />
                    <meshBasicMaterial map={textures[image.textureIndex]} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    )
}

export function OrbitGallery3D() {
    return (
        <div className="w-full h-full bg-white relative flex flex-col items-center justify-center pt-96 md:pt-72 pb-12">

            <div className="container mx-auto z-10 px-8 mb-12 md:mb-24 flex justify-center">
                <div className="max-w-4xl w-full text-center">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-black uppercase mb-8">
                        ENCRYPTED. <br />
                        PRIVATE. <br />
                        FOREVER.
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Your memories deserve a fortress, not just a folder. We use military-grade encryption and decentralized storage to ensure your life&apos;s work remains private, permanent, and exclusively yours.
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full relative min-h-[600px]">
                <Canvas camera={{ position: [0, 0, 38], fov: 50 }}>
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <CameraAdjustment />
                    <Suspense fallback={null}>
                        <OrbitingContent />
                    </Suspense>
                    <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} autoRotate autoRotateSpeed={0.4} />
                </Canvas>
            </div>
        </div>
    )
}
