'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface ZoomImage {
    src: string;
    alt?: string;
}

interface ZoomParallaxProps {
    images: ZoomImage[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pictures = [
        {
            src: images[0]?.src,
            scale: scale4,
            width: '25vw',
            height: '25vh',
            top: '0',
            left: '0'
        },
        {
            src: images[1]?.src,
            scale: scale5,
            width: '35vw',
            height: '30vh',
            top: '-30vh',
            left: '5vw'
        },
        {
            src: images[2]?.src,
            scale: scale6,
            width: '20vw',
            height: '45vh',
            top: '-10vh',
            left: '-25vw'
        },
        {
            src: images[3]?.src,
            scale: scale5,
            width: '25vw',
            height: '25vh',
            top: '0',
            left: '27.5vw'
        },
        {
            src: images[4]?.src,
            scale: scale6,
            width: '20vw',
            height: '25vh',
            top: '27.5vh',
            left: '5vw'
        },
        {
            src: images[5]?.src,
            scale: scale8,
            width: '30vw',
            height: '25vh',
            top: '27.5vh',
            left: '-22.5vw'
        },
        {
            src: images[6]?.src,
            scale: scale9,
            width: '15vw',
            height: '15vh',
            top: '22.5vh',
            left: '25vw'
        }
    ];

    return (
        <div ref={container} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen overflow-hidden bg-white">
                {pictures.map(({ src, scale, width, height, top, left }, index) => {
                    if (!src) return null;
                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className="absolute top-0 w-full h-full flex items-center justify-center p-0"
                        >
                            <div className="relative" style={{ width, height, top, left }}>
                                <img
                                    src={src}
                                    alt="parallax-img"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
