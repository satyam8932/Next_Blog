'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { MessageCircle, Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What is MetaExpat?",
        answer: "MetaExpat is a platform that helps you plan your relocation to the United Arab Emirates by providing a personalized action plan and resources tailored to your project."
    },
    {
        question: "How does MetaExpat work?",
        answer: "Fill out our interactive form by answering specific questions about your relocation project. Receive a detailed action plan with all the necessary steps for your relocation. Take action using our recommendations and resources."
    },
    {
        question: "Is MetaExpat a paid service?",
        answer: "No, you can receive your personalized action plan free of charge."
    },
    {
        question: "In what format will I receive my action plan?",
        answer: "You will receive your action plan in PDF format immediately after completing it."
    },
    {
        question: "How long will it take to receive my action plan?",
        answer: "The action plan is generated within a few minutes after completing the form."
    },
    {
        question: "Is the action plan available in multiple languages?",
        answer: "Yes! You can choose to receive your action plan in French, English, or Arabic."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const router = useRouter()
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-20 py-28 bg-gradient-to-b from-gray-50 to-white rounded-3xl">
            <div className="text-center mb-12">
                <span className="text-blue-600">
                    YOUR METAEXPAT FAQ
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
                                className={`w-5 h-5 transform transition-transform ${openIndex === index ? 'rotate-180' : ''
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
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative my-24 px-6 py-12 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden"
            >
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-100 rounded-full opacity-50"></div>
                </div>

                <div className="relative text-center space-y-6 max-w-2xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-blue-600 text-sm font-medium uppercase tracking-wider"
                    >
                        Still Have Questions?
                    </motion.span>

                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900"
                    >
                        Can&#39;t Find Your Answer?
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-600 max-w-lg mx-auto"
                    >
                        Our team is here to help you with any questions you might have. We're available 24/7 to assist you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium flex items-center gap-2 h-auto"
                                onClick={() => router.push('/contact')}
                            >
                                <MessageCircle className="w-5 h-5" />
                                Get in Touch!
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default FAQSection;