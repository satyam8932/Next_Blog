// components/LoadingScreen.tsx
'use client';
import { useEffect, useState } from 'react';
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';


export function LoadingScreen() {
    const [progress, setProgress] = useState(87);

    useEffect(() => {
        const handleIncrement = (prev: number) => {
            if (prev >= 100) {
                return 0;
            }
            return prev + 100;
        };
        
        setProgress(handleIncrement(0));
        const interval = setInterval(
            () => setProgress(handleIncrement),
            1000
        );
        
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
                <div className="w-32 h-32 mb-4">
                    <AnimatedCircularProgressBar
                        max={100}
                        min={0}
                        value={progress}
                        gaugePrimaryColor="rgb(37 99 235)"
                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}