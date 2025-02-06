'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Set initial window size
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        // Update mouse position
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Update window size on resize
        const updateWindowSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('resize', updateWindowSize);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);

    const calculateEyePosition = (eye: { x: number, y: number }) => {
        const deltaX = mousePosition.x - eye.x;
        const deltaY = mousePosition.y - eye.y;
        const distance = Math.min(5, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 20);
        const angle = Math.atan2(deltaY, deltaX);
        return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
        };
    };

    return (
        <div className="min-h-screen bg-black/100 flex flex-col items-center justify-center p-4">
            {/* Main Content */}
            <div className="relative z-10 text-center">
                {/* Robot Face */}
                <motion.div 
                    className="w-64 h-64 bg-gray-800 rounded-3xl mx-auto mb-8 relative"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    {/* Eyes */}
                    <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full">
                        <motion.div
                            className="w-8 h-8 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            animate={calculateEyePosition({ 
                                x: windowSize.width / 2 - 50, 
                                y: windowSize.height / 2 
                            })}
                        />
                    </div>
                    <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 w-16 h-16 bg-white rounded-full">
                        <motion.div
                            className="w-8 h-8 bg-blue-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            animate={calculateEyePosition({ 
                                x: windowSize.width / 2 + 50, 
                                y: windowSize.height / 2 
                            })}
                        />
                    </div>
                    {/* Mouth */}
                    <motion.div
                        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gray-700 rounded-full"
                        animate={{ scaleX: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>

                {/* Text Content */}
                <motion.h1
                    className="text-7xl font-bold text-white mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    4
                    <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block"
                    >
                        0
                    </motion.span>
                    4
                </motion.h1>
                
                <motion.p
                    className="text-xl text-gray-300 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Oops! Looks like you've ventured into the digital void.
                </motion.p>

                {/* Action Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Return to Safety
                    </Link>
                </motion.div>
            </div>

            {/* Fun Facts */}
            <motion.div
                className="absolute bottom-8 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <p>Did you know? The term "404" comes from room 404 at CERN where the World Wide Web was developed.</p>
            </motion.div>
        </div>
    );
}