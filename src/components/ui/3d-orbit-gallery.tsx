"use client"

import { Lock } from "lucide-react"
import { AuroraText } from "@/components/ui/aurora-text"

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
    "https://images.unsplash.com/photo-1511497584788-8767601111969?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
]

export function OrbitGallery3D() {
    return (
        <div className="w-full h-auto bg-white relative flex flex-col items-center justify-center pt-32 md:pt-72 pb-12 overflow-hidden">
            <div className="container mx-auto z-20 px-8 mb-12 md:mb-24 flex justify-center">
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

            <div className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[700px] px-6 md:px-0">
                <div className="relative w-full h-full overflow-hidden rounded-[2rem] md:rounded-[3rem]">
                    {/* Image Grid Background */}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full h-full opacity-40">
                        {BASE_IMAGES.map((img, i) => (
                            <div key={i} className="relative aspect-square overflow-hidden bg-gray-100">
                                <img src={img} alt="" className="w-full h-full object-cover grayscale" />
                            </div>
                        ))}
                    </div>

                    {/* Secure Overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                        {/* The actual blur layer - covering everything with a slight overflow to prevent edges from showing */}
                        <div className="absolute inset-[-2px] bg-white/50 backdrop-blur-3xl" />

                        <div className="relative z-20 flex flex-col items-center gap-6 px-8 text-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-black rounded-full flex items-center justify-center shadow-2xl">
                                <Lock className="w-10 h-10 md:w-14 md:h-14 text-white" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold tracking-[0.3em] uppercase text-black mb-2">Security Status</p>
                                <div className="flex items-center gap-2 justify-center">
                                    <span className="font-mono text-sm font-bold">
                                        <AuroraText>AES-256 ACTIVE</AuroraText>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
