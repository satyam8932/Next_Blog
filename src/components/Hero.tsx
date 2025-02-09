'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Globe, Search, Star, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
    const router = useRouter();

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const fadeInLeft = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6 }
    };

    const fadeInRight = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="px-4 lg:px-6 py-8 lg:py-16 lg:my-8 min-h-screen max-w-7xl mx-auto overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <motion.div 
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="space-y-6 lg:space-y-8"
                >
                    <motion.div 
                        variants={fadeInUp}
                        className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full"
                    >
                        <Globe size={16} />
                        <span className="text-sm lg:text-base">GET FREE PLANS IN 3 STEPS</span>
                    </motion.div>

                    <motion.h1 
                        variants={fadeInLeft}
                        className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                    >
                        Plan your <span className="text-blue-600">expatriation</span> the easy way
                    </motion.h1>

                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="space-y-4"
                    >
                        {[
                            { icon: Globe, text: "Receive a detailed and personalized action plan" },
                            { icon: Search, text: "Answer few questions, get your detailed plan" },
                            { icon: User, text: "Built by expats, for expats" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInLeft}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center space-x-2 hover:translate-x-2 transition-transform"
                            >
                                <item.icon className="text-gray-600 flex-shrink-0" size={20} />
                                <span className="text-sm lg:text-base">{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            className="w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-lg h-15 hover:bg-blue-700 transition-colors" 
                            onClick={() => { router.push('/action') }}
                        >
                            Get free plan →
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeInRight}
                    className="relative mt-8 lg:mt-0 h-[300px] sm:h-[400px] lg:h-[600px]"
                >
                    <motion.div 
                        className="w-full h-full rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            style={{
                                clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)",
                                objectFit: 'cover'
                            }}
                            src="/hero.jpg"
                            alt="Moving family"
                            fill
                            className="rounded-lg"
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}