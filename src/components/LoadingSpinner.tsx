'use client';
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";


export function LoadingScreen() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
                <div className="w-32 h-32 mb-4">
                    <AnimatedCircularProgressBar
                        max={100}
                        min={0}
                        value={92}
                        gaugePrimaryColor="rgb(37 99 235)"
                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                    />
                </div>
            </div>
        </>
    );
}