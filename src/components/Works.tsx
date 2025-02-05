import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            title: "Fill in your information",
            description: "Let us know where and what you are moving. This takes only 2 minutes.",
        },
        {
            number: 2,
            title: "Receive up to 6 quotes",
            description: "Get prices from vetted movers.",
        },
        {
            number: 3,
            title: "Compare and book your move",
            description: "Choose the mover based on reviews and prices.",
        },
    ];

    return (
        <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-blue-600 text-sm font-medium uppercase">IT'S EASY</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">How Relocately works</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                    {/* Vertical line connecting the steps */}
                    <div className="absolute left-4 top-8 bottom-8 w-[2px] bg-gray-200"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-8 mb-16 last:mb-0 relative">
                            {/* Step number circle */}
                            <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-black text-white flex items-center justify-center font-medium z-10">
                                {step.number}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                    <Link
                        href="/start"
                        className="inline-flex items-center px-6 py-3"
                    >
                        <Button className='w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-lg h-15 hover:bg-blue-700 transition-colors'>
                            Start now →
                        </Button>
                    </Link>
                </div>

                {/* Dashboard Preview */}
                <div className="relative">
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
                                <h4 className="text-xl font-semibold">Welcome, John Davis</h4>
                            </div>
                            <div className="space-y-6">
                                <h5 className="font-medium">Upcoming tasks</h5>
                                {/* Task Items */}
                                {['International Relocation', 'Secure Storage Solutions', 'Professional Vehicle Transport',].map((task, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium">{task}</p>
                                            <p className="text-sm text-gray-500">Organized by XYZ Moving Company</p>
                                        </div>
                                        <span className="text-sm text-gray-500">09/14/2024</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;