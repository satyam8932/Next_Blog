'use client';
import Image from 'next/image';
import { Mail, MapPin, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        isError: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Show success alert
            setAlertState({
                isOpen: true,
                title: 'Message Sent Successfully',
                message: 'Thank you for contacting us. We\'ll get back to you soon!',
                isError: false
            });

            // Clear form
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Submission error:', error);
            // Show error alert
            setAlertState({
                isOpen: true,
                title: 'Error',
                message: 'Failed to send message. Please try again.',
                isError: true
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-left mb-8">
                    <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
                        LET'S CONNECT
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="space-y-8">
                        <h1 className="text-5xl font-bold text-gray-900">Contact us</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-blue-600 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-blue-600 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Message"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-blue-600 sm:text-sm p-2 border"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Sending...
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>

                        {/* Company Info */}
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">Moveasy B.V.</h3>
                                <div className="flex items-start space-x-2 text-gray-600">
                                    <MapPin className="h-5 w-5 mt-0.5" />
                                    <div>
                                        <p>64 Floor Burj Khalifa</p>
                                        <p>101D United Arab Emirates</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                                <div className="flex items-start space-x-2 text-gray-600">
                                    <Clock className="h-5 w-5 mt-0.5" />
                                    <p>Mon – Fri: 10:00 to 18:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-[300px] md:h-[600px] overflow-hidden md:flex hidden">
                        <Image
                            style={{ clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)" }}
                            src="/hero.jpg" // Add your image path here
                            alt="Contact visual"
                            fill
                            className="rounded-lg"
                            priority
                        />
                    </div>
                </div>

                {/* Legal Notice */}
                <div className="mt-16 text-sm text-gray-500 bg-zinc-100 p-6 rounded-3xl">
                    <h3 className="flex items-center space-x-2 font-medium text-gray-900 mb-2">
                        <Mail className="h-4 w-4" />
                        <span>Legal Notice</span>
                    </h3>
                    <p className='font-'>
                        All rights are reserved, unless expressly stated otherwise. For citations,
                        please quote source. All content merely provides a non-committal overview
                        of the website. No guarantee is accepted for the correctness, completeness
                        or topicality of the data. This also affects the hyperlinks. Changes or
                        additions are made without prior notice.
                    </p>
                </div>

                {/* Alert Dialog */}
                <AlertDialog
                    open={alertState.isOpen}
                    onOpenChange={(open) => setAlertState(prev => ({ ...prev, isOpen: open }))}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {alertState.title}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {alertState.message}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction
                                className={`${alertState.isError ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                            >
                                {alertState.isError ? 'Try Again' : 'Close'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </main>
            <Footer />
        </>
    )
}