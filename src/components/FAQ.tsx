'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What is international shipping?",
        answer: "International shipping is the process of transporting goods across international borders. It involves various logistics, documentation, and customs procedures to ensure safe and legal delivery of items from one country to another."
    },
    {
        question: "How can I get free shipping quotes?",
        answer: "You can get free shipping quotes by filling out our online form or contacting our customer service team. We'll provide detailed pricing based on your specific requirements, destination, and shipment details."
    },
    {
        question: "What items can I ship internationally?",
        answer: "Most personal and commercial items can be shipped internationally. However, there are restrictions on dangerous goods, perishables, and certain regulated items. Contact us for a detailed list of prohibited items."
    },
    {
        question: "How long does international shipping take?",
        answer: "Shipping times vary depending on the destination, shipping method, and customs processing. Typical timeframes range from 5-30 business days. Express services are available for faster delivery."
    },
    {
        question: "What should I know about customs duties or taxes?",
        answer: "Customs duties and taxes vary by country and type of goods. These charges are typically paid by the recipient and are calculated based on the declared value and nature of the items being shipped."
    },
    {
        question: "How do I track my shipment?",
        answer: "Once your shipment is processed, you'll receive a tracking number. You can use this number on our website or app to monitor your shipment's progress in real-time."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-20 py-28 bg-gradient-to-b from-gray-50 to-white rounded-3xl">
            <div className="text-center mb-12">
                <span className="text-blue-600">
                    ANSWERS FOR YOUR MOVE
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-gray-200"
                                >
                                    <div className="px-6 py-4 text-gray-600">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;