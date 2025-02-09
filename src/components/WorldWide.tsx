'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const WorldwideSection = () => {
    const router = useRouter();

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const stats = [
        {
            number: "7",
            label: "emirates covered",
            description: "We have you covered in emirates with our wide network of partners."
        },
        {
            number: "100+",
            label: "relocation plans created",
            description: "We have served lots of customers with their relocation using action plans."
        },
        {
            number: "50+",
            label: "trusted local partners",
            description: "We have a dedicated team of legal advisors, business consultant and more."
        }
    ];

    return (
        <section className="bg-[#0A0B14] text-white py-20 relative overflow-hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="text-blue-600 text-sm font-medium uppercase">SETTLED</span>
                    <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-12">
                        Why MetaExpat is Your<br />
                        Best Choice in the UAE.
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <p className="text-gray-400">
                            <span className='font-extrabold'>🌐 Covering All Emirates</span> From Abu Dhabi to Ras Al Khaimah, we have got you covered.
                        </p>
                        <p className="text-gray-400">
                            <span className='font-extrabold'>📁 Step-by-Step Guidance</span> Simplify your relocation with personalized action plans.
                        </p>
                        <p className="text-gray-400">
                            <span className='font-extrabold'>🤝 Reliable Local Partners</span> Trusted networks across legal, administrative, and real
                            estate sectors.
                        </p>
                        <p className="text-gray-400">
                            <span className='font-extrabold'>🚀 Fast & Transparent Process</span> No hidden fees, no delays—just clear, efficient
                            support.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Button
                                onClick={() => { router.push('/action') }}
                                className="w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-lg h-15 hover:bg-blue-700 transition-colors"
                            >
                                Get My UAE Relocation Plan →
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Gradient Blur Effect */}
                        <div className="absolute top-32 right-32 w-64 h-64 bg-blue-600/60 blur-[100px] rounded-full transform translate-x-1/2 -translate-y-1/2 z-0"></div>

                        {/* Stats Card */}
                        <div className="bg-[#0A0B14] rounded-2xl p-8 space-y-12 relative z-10 ring-slate-800 ring-1">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="group hover:bg-slate-800/50 p-4 rounded-lg transition-colors"
                                >
                                    <motion.h3
                                        whileHover={{ scale: 1.05 }}
                                        className="text-5xl font-bold text-blue-600"
                                    >
                                        {stat.number}
                                    </motion.h3>
                                    <p className="text-blue-600 mt-1">{stat.label}</p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {stat.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WorldwideSection;