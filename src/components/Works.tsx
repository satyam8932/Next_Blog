'use client';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const HowItWorks = () => {
    const router = useRouter();
    const steps = [
        {
            number: 1,
            title: "Fill in your information",
            description: "Tell us about your project in just a few clicks.",
        },
        {
            number: 2,
            title: "Get Your Personalized Action Plan",
            description: "Receive a step-by-step guide tailored to your needs.",
        },
        {
            number: 3,
            title: "Take Action with Confidence ",
            description: "Access tools and resources to bring your plan to life.",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-20 py-28 bg-gradient-to-b from-gray-50 to-white rounded-3xl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="text-blue-600 text-sm font-medium uppercase">IT'S EASY</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">How to Get Your Personalized Expat Plan</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    {/* Vertical line connecting the steps */}
                    <div className="absolute left-4 top-8 bottom-8 w-[2px] bg-gray-200"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex items-start space-x-8 mb-16 last:mb-0 relative"
                        >
                            {/* Step number circle */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.2 + 0.2 }}
                                className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-black text-white flex items-center justify-center font-medium z-10"
                            >
                                {step.number}
                            </motion.div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="inline-flex items-center px-6 py-3"
                    >
                        <Button 
                            className='w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-lg h-15 hover:bg-blue-700 transition-colors' 
                            onClick={() => { router.push('/action') }}
                        >
                            Create My Plan Now →
                        </Button>
                    </motion.div>
                </div>

                {/* Dashboard Preview */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="border-b border-gray-200 p-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-xl font-semibold">Welcome, Liam Nguyen</h4>
                            </div>
                            <div className="space-y-6">
                                <h5 className="font-medium">Upcoming Tasks</h5>
                                {/* Task Items */}
                                {['Visa Appointment', 'Educational Documents', 'Medical Checkup',].map((task, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium">{task}</p>
                                            <p className="text-sm text-gray-500">Organized by Atria</p>
                                        </div>
                                        <span className="text-sm text-gray-500">29/12/2025</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;