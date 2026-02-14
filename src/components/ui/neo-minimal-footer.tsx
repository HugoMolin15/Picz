'use client'

import React from 'react'
import { Github, Twitter, Linkedin, ArrowRight } from 'lucide-react'

export function NeoMinimalFooter() {
    return (
        <div
            className='relative h-[1100px] md:h-[800px]'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='relative h-[calc(100vh+1100px)] md:h-[calc(100vh+800px)] -top-[100vh]'>
                <div className='h-[1100px] md:h-[800px] sticky top-[calc(100vh-1100px)] md:top-[calc(100vh-800px)]'>
                    <FooterContent />
                </div>
            </div>
        </div>
    )
}

function FooterContent() {
    return (
        <div className='bg-white text-black py-12 md:py-20 px-6 md:px-12 h-full w-full flex flex-col justify-between border-t border-gray-100 overflow-hidden'>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 max-w-7xl relative z-10">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold tracking-tighter text-black">
                            PICZ
                        </h2>
                    </div>
                    <p className="text-base text-gray-500 leading-relaxed max-w-sm">
                        Your life is a story. We help you tell it.
                        Intelligent photo management for the curious and the creative.
                    </p>

                    {/* Minimal Input */}
                    <div className="flex items-center gap-2 mt-4 group max-w-sm">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                placeholder="Get weekly bundles..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>
                        <button className="p-3 bg-black rounded-xl text-white hover:bg-black/90 transition-colors shadow-lg">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Links Columns */}
                {[
                    { title: "Product", links: ["Features", "Pricing", "AI Search", "Security"] },
                    { title: "Company", links: ["About", "Blog", "Careers", "Legal"] },
                    { title: "Support", links: ["Help Center", "Community", "Privacy", "Status"] }
                ].map((section, idx) => (
                    <div key={idx} className="col-span-1 md:col-span-2 flex flex-col gap-6">
                        <h4 className="text-sm font-bold text-black uppercase tracking-widest">
                            {section.title}
                        </h4>
                        <ul className="flex flex-col gap-4">
                            {section.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-2 group w-fit">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-black transition-all group-hover:w-3 duration-200" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className='flex flex-col gap-4 mt-auto pt-10 md:pt-20 relative z-0'>
                <div className='flex justify-between items-end'>
                    <h1 className='text-[14vw] leading-[0.8] font-black tracking-tighter text-black uppercase italic'>
                        PICZ.
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-gray-100">
                    <p className="text-sm text-gray-400 font-mono">
                        © 2026 PICZ_TECHNOLOGIES. ALL RIGHTS RESERVED.
                    </p>

                    <div className="flex items-center gap-8">
                        <div className="flex gap-6">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-400 hover:text-black transition-colors">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
