'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const WorldwideSection = () => {
    const router = useRouter();
    return (
        <section className="bg-[#0A0B14] text-white py-20 relative overflow-hidden bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                {/* Header */}
                <span className="text-blue-600 text-sm font-medium uppercase">SETTLED</span>
                <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-12">
                    We are proud to serve all<br />
                    over the world.
                </h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div className="space-y-6">
                        <p className="text-gray-400">
                            To learn more about about travel and required documentation for the relocation process, simply speak to one of our experts.
                        </p>
                        <p className="text-gray-400">
                            With years of experience, we can give you an accurate overview of the worldwide requirements for international moving and shipping.
                        </p>
                        <Button onClick={()=>{router.push('/contact')}}
                            className="w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-lg h-15 hover:bg-blue-700 transition-colors"
                        >
                            Talk to an expert →
                        </Button>
                    </div>

                    {/* Right Column - Stats */}
                    <div className="relative">
                        {/* Gradient Blur Effect - Positioned outside the card */}
                        <div className="absolute top-32 right-32 w-64 h-64 bg-blue-600/60 blur-[100px] rounded-full transform translate-x-1/2 -translate-y-1/2 z-0"></div>

                        {/* Stats Card */}
                        <div className="bg-[#0A0B14] rounded-2xl p-8 space-y-12 relative z-10 ring-slate-800 ring-1">
                            <div>
                                <h3 className="text-5xl font-bold text-blue-600">40+</h3>
                                <p className="text-blue-600 mt-1">countries</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    We have you covered through our world wide network of partners.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-5xl font-bold text-blue-600">17500+</h3>
                                <p className="text-blue-600 mt-1">satisfied customers per year</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    You move every couple years, we do it on a daily basis.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-5xl font-bold text-blue-600">30+</h3>
                                <p className="text-blue-600 mt-1">international experts</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    We are a dedicated team to make your move as smooth as possible.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorldwideSection;