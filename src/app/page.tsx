"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { ZoomParallax } from "@/components/ui/zoom-parallax"
import { FeatureWithImageCarousel } from "@/components/ui/feature-with-image-carousel"
import { FeatureWithImage } from "@/components/ui/feature-with-image"
import PricingTable from "@/components/ui/modern-pricing-table"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import { Accordion05 } from "@/components/ui/accordion-05"
import { NeoMinimalFooter } from "@/components/ui/neo-minimal-footer"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { Badge } from "@/components/ui/badge"
import { AuroraText } from "@/components/ui/aurora-text"
import { OrbitGallery3D } from "@/components/ui/3d-orbit-gallery"
import Lenis from 'lenis'

const heroImages = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
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
    "https://images.unsplash.com/photo-1501854140884-074bf86ee91c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533227297702-038f88560383?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae99?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1458560871784-56d23406c091?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414609245229-ae455353cc2f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1428515613728-6b4607e44363?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485627941502-d2e6429fa8af?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop"
]

const zoomImages = [
    { src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1200&auto=format&fit=crop', alt: 'Friends on dock' },
    { src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop', alt: 'Family walk' },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop', alt: 'Concert crowd' },
    { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop', alt: 'Wedding party' },
    { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop', alt: 'Yosemite' },
    { src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop', alt: 'Friends jumping' },
    { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop', alt: 'Green mountains' },
]

const pricingPlans = [
    {
        title: "Starter",
        price: { monthly: 0, yearly: 0 },
        description: "For casual memory keepers",
        features: ["5GB cloud storage", "Basic AI search", "Standard albums", "Family sharing (up to 2 users)"],
        ctaText: "Get Started Free",
        ctaHref: "#",
        isFeatured: false
    },
    {
        title: "Memories Pro",
        price: { monthly: 9, yearly: 86 },
        description: "Our most popular plan for families",
        features: ["500GB cloud storage", "Advanced AI selection", "Personalized weekly bundles", "Family sharing (up to 6 users)", "RAW file support"],
        ctaText: "Start 14-day Trial",
        ctaHref: "#",
        isFeatured: true
    },
    {
        title: "Archive",
        price: { monthly: 24, yearly: 230 },
        description: "Unlimited storage for life",
        features: ["Unlimited cloud storage", "Priority AI rendering", "Physical album discounts", "Concierge search support", "Advanced encryption"],
        ctaText: "Go Unlimited",
        ctaHref: "#",
        isFeatured: false
    }
]

const testimonials = [
    { text: "Picz finally organized my 50,000 messy photos into beautiful albums. I cry every time I see the weekly bundles.", name: "Sarah J.", role: "Mom of 3", image: "https://i.pravatar.cc/150?u=sarah" },
    { text: "The AI search is black magic. I typed 'blue sweater' and found a photo of my dog from 2012 instantly.", name: "Mark T.", role: "Photographer", image: "https://i.pravatar.cc/150?u=mark" },
    { text: "Best way to share vacation photos with the family. No more compressed WhatsApp mess.", name: "Elena R.", role: "Travel Blogger", image: "https://i.pravatar.cc/150?u=elena" },
    { text: "The personalized albums are so thoughtful. It's like having a private curator for my life.", name: "David K.", role: "Designer", image: "https://i.pravatar.cc/150?u=david" },
    { text: "I love how it identifies 'best' shots. Saved me hours of sorting through duplicates.", name: "Linda W.", role: "Grandmother", image: "https://i.pravatar.cc/150?u=linda" },
    { text: "Security was my main concern, but Picz handles encryption perfectly. I feel safe.", name: "James L.", role: "Tech Lead", image: "https://i.pravatar.cc/150?u=james" },
]

export default function LandingPage() {
    const { scrollY } = useScroll()
    const backgroundY = useTransform(scrollY, [0, 800], [0, 300])

    useEffect(() => {
        const lenis = new Lenis()
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])

    const scrollToPricing = () => {
        const element = document.getElementById('pricing');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <main className="relative bg-white text-black min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-white">
                {/* Image Grid Background - Fixed scale, overflowing */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        style={{ y: backgroundY }}
                        className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 w-[300vw] md:w-[160vw] h-[350vh] md:h-[200vh] flex-none rotate-3">
                        {heroImages.map((url, i) => (
                            <div key={i} className="relative w-full h-full overflow-hidden">
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: Math.random() * 0.5, duration: 1 }}
                                    src={url}
                                    alt="hero background"
                                    className="w-full h-full object-cover grayscale-0 hover:grayscale transition-all duration-500"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Overlay for text readability - dark blur for contrast */}
                <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-sm" />

                <motion.div
                    className="z-50 text-center space-y-6 items-center flex flex-col px-8 relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="space-y-2">

                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white italic">
                            Picz.
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-xl text-balance">
                        The <AuroraText className="text-xl md:text-2xl font-bold" colors={["#ffaa40", "#9c40ff", "#ffaa40"]}>AI-powered</AuroraText> home for your most precious memories. Organized, searchable, and beautiful.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <InteractiveHoverButton onClick={scrollToPricing} text="Get Started" className="w-40 h-14 text-base hover:border-black" />
                    </div>
                </motion.div>
            </section>

            {/* Intro Text Section */}
            <section className="py-32 bg-white flex items-center justify-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-black uppercase"
                        >
                            Every picture <br />
                            is a <br />
                            story.
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between"
                        >
                            <p className="text-xl md:text-2xl text-gray-600 max-w-md leading-relaxed">
                                We built Picz because we believe your best moments shouldn't be buried in a cloud. They should be seen, felt, and remembered.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-12 h-1 bg-black"></div>
                                <span className="text-sm font-bold uppercase tracking-widest">Archive with intent</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Zoom Parallax Section */}
            <ZoomParallax images={zoomImages} />

            {/* Feature/Pricing Content Wrapper */}
            <div className="relative bg-white z-[50]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <FeatureWithImageCarousel />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <FeatureWithImage />
                </motion.div>

                <motion.section
                    className="h-screen py-20 bg-white"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <OrbitGallery3D />
                </motion.section>

                <section id="pricing" className="bg-white pt-32 md:pt-80 pb-20">
                    <PricingTable plans={pricingPlans} />
                </section>

                <motion.section
                    className="bg-white py-20"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="container mx-auto px-8 mb-16 text-center">
                        <Badge variant="outline" className="border-none p-0 mb-4 text-black uppercase tracking-widest text-xs font-bold">
                            <AuroraText>Community</AuroraText>
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black">What our hunters say</h2>
                    </div>
                    <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[700px] overflow-hidden">
                        <TestimonialsColumn testimonials={testimonials.slice(0, 2)} duration={15} />
                        <TestimonialsColumn testimonials={testimonials.slice(2, 4)} className="hidden md:block" duration={18} />
                        <TestimonialsColumn testimonials={testimonials.slice(4, 6)} className="hidden lg:block" duration={14} />
                    </div>
                </motion.section>

                <motion.section
                    className="bg-white"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <Accordion05 />
                </motion.section>

                <section className="py-40 bg-black text-white text-center">
                    <div className="container mx-auto px-8 space-y-10">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic">Ready to archive?</h2>
                        <p className="text-xl text-gray-400 max-w-xl mx-auto">Join 50,000+ memory seekers and start your 14-day free trial today.</p>
                        <div className="flex justify-center">
                            <InteractiveHoverButton onClick={scrollToPricing} text="Join the collective" className="w-64 h-16 text-xl bg-white text-black border-none transition-transform hover:scale-105" />
                        </div>
                    </div>
                </section>
            </div>

            {/* Sticky Reveal Footer Outside the main content wrapper */}
            <NeoMinimalFooter />
        </main>
    )
}
