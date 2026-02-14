"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Users, MapPin, Cloud, Wand2, History, Camera, Smartphone, Shield, type LucideIcon } from "lucide-react"

export interface Frame {
    id: number
    video?: string
    image?: string
    title: string
    description: string
    icon: LucideIcon
    defaultPos: { x: number; y: number; w: number; h: number }
    corner?: string
    edgeHorizontal?: string
    edgeVertical?: string
    mediaSize: number
    borderThickness?: number
    borderSize?: number
    isHovered: boolean
}

interface FrameComponentProps {
    video?: string
    image?: string
    title: string
    description: string
    icon: LucideIcon
    width: number | string
    height: number | string
    className?: string
    corner?: string
    edgeHorizontal?: string
    edgeVertical?: string
    mediaSize: number
    borderThickness?: number
    borderSize?: number
    showFrame: boolean
    isHovered: boolean
}

function FrameComponent({
    video,
    image,
    title,
    description,
    icon: Icon,
    width,
    height,
    className = "",
    corner,
    edgeHorizontal,
    edgeVertical,
    mediaSize,
    borderThickness,
    borderSize,
    showFrame,
    isHovered,
}: FrameComponentProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (isHovered && video) {
            videoRef.current?.play().catch(e => console.log("Autoplay prevented:", e))
        } else {
            videoRef.current?.pause()
        }
    }, [isHovered, video])

    return (
        <div
            className={`relative ${className} group cursor-pointer`}
            style={{
                width,
                height,
                transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
        >
            <div className={`
        relative w-full h-full overflow-hidden bg-white 
        transition-all duration-500
      `}>

                {/* Hover Image Background */}
                {image && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/60 transition-opacity duration-300" />
                    </div>
                )}

                {/* Video Background (if present and hovered) */}
                {video && isHovered && (
                    <div className="absolute inset-0 z-0">
                        <div
                            className="w-full h-full overflow-hidden"
                            style={{
                                transform: `scale(${mediaSize})`,
                                transformOrigin: "center",
                                transition: "transform 0.3s ease-in-out",
                            }}
                        >
                            <video
                                className="w-full h-full object-cover opacity-90"
                                src={video}
                                loop
                                muted
                                playsInline
                                ref={videoRef}
                            />
                            <div className="absolute inset-0 bg-black/60" />
                        </div>
                    </div>
                )}

                {/* Text Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.2 : 1,
                            y: isHovered ? -10 : 0
                        }}
                        className="mb-4 text-black group-hover:text-white transition-colors duration-300"
                    >
                        <Icon strokeWidth={1} className="w-12 h-12" />
                    </motion.div>

                    <h3 className="font-medium text-2xl tracking-tight text-black group-hover:text-white mb-2 transition-colors duration-300">{title}</h3>

                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            height: isHovered ? "auto" : 0
                        }}
                        className="overflow-hidden"
                    >
                        <p className="text-base text-gray-200 max-w-[200px] leading-relaxed">
                            {description}
                        </p>
                    </motion.div>
                </div>

            </div>
        </div>
    )
}

interface DynamicFrameLayoutProps {
    frames: Frame[]
    className?: string
    showFrames?: boolean
    hoverSize?: number
    gapSize?: number
}

export function DynamicFrameLayout({
    frames: initialFrames,
    className = "",
    showFrames = false,
    hoverSize = 6,
    gapSize = 4
}: DynamicFrameLayoutProps) {
    const frames = initialFrames;
    const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

    const getRowSizes = () => {
        if (hovered === null) return "1fr 1fr 1fr"
        const { row } = hovered
        const nonHoveredSize = (12 - hoverSize) / 2
        return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
    }

    const getColSizes = () => {
        if (hovered === null) return "1fr 1fr 1fr"
        const { col } = hovered
        const nonHoveredSize = (12 - hoverSize) / 2
        return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
    }

    return (
        <div
            className={`relative w-full h-full ${className}`}
            style={{
                display: "grid",
                gridTemplateRows: getRowSizes(),
                gridTemplateColumns: getColSizes(),
                gap: `${gapSize}px`,
                transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
            }}
        >
            {frames.map((frame, index) => {
                const row = Math.floor(index / 3)
                const col = index % 3

                return (
                    <motion.div
                        key={frame.id}
                        className="relative w-full h-full"
                        onMouseEnter={() => setHovered({ row, col })}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <FrameComponent
                            video={frame.video}
                            image={frame.image}
                            title={frame.title}
                            description={frame.description}
                            icon={frame.icon}
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            corner={frame.corner}
                            edgeHorizontal={frame.edgeHorizontal}
                            edgeVertical={frame.edgeVertical}
                            mediaSize={frame.mediaSize}
                            borderThickness={frame.borderThickness}
                            borderSize={frame.borderSize}
                            showFrame={showFrames}
                            isHovered={hovered?.row === row && hovered?.col === col}
                        />
                    </motion.div>
                )
            })}
        </div>
    )
}

const demoFrames: Frame[] = [
    {
        id: 1,
        title: "Smart Search",
        description: "Find photos by describing them naturally.",
        icon: Search,
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 0, y: 0, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
    {
        id: 2,
        title: "Face ID",
        description: "Auto-tag friends and family.",
        icon: Users,
        image: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 4, y: 0, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
    {
        id: 3,
        title: "Maps",
        description: "Explore your memories by location.",
        icon: MapPin,
        image: "https://images.unsplash.com/photo-1464817739569-85d3468afc98?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 8, y: 0, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
    {
        id: 4,
        title: "Cloud Sync",
        description: "Safe & secure encrypted storage.",
        icon: Cloud,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 0, y: 4, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
    {
        id: 5,
        title: "Magic Edit",
        description: "Remove objects and fix lighting instantly.",
        icon: Wand2,
        image: "https://images.unsplash.com/photo-1596265371388-43edbaadab94?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 4, y: 4, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
    {
        id: 6,
        title: "Time Travel",
        description: "Rediscover gems from years ago.",
        icon: History,
        image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 8, y: 4, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
    {
        id: 7,
        title: "RAW Support",
        description: "Professional format support.",
        icon: Camera,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 0, y: 8, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
    {
        id: 8,
        title: "Secure",
        description: "Your data is yours. Period.",
        icon: Shield,
        image: "https://images.unsplash.com/photo-1614064641938-3bcee529cfc4?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 4, y: 8, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
    {
        id: 9,
        title: "Mobile",
        description: "Access your library anywhere.",
        icon: Smartphone,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop",
        defaultPos: { x: 8, y: 8, w: 4, h: 4 },
        mediaSize: 1,
        isHovered: false,
    },
]

export function DemoPage() {
    return (
        <div className="w-full max-w-7xl mx-auto h-[800px] bg-white p-4">
            <DynamicFrameLayout
                frames={demoFrames}
                className="w-full h-full"
                hoverSize={6}
                gapSize={0}
            />
        </div>
    )
}

