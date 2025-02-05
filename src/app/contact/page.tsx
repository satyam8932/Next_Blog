// pages/contact.js
import Image from 'next/image'
import { Mail, MapPin, Clock } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Contact() {
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

                        <form className="space-y-6">
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
                                    placeholder="Your Name"
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
                                    placeholder="example@email.com"
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
                                    rows={4}
                                    placeholder="Message"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-0 focus:border-blue-600 sm:text-sm p-2 border"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Submit
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
                    <div className="relative h-[600px] overflow-hidden">
                        <Image
                            style={{clipPath: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)"}}
                            src="/hero.jpg" // Add your image path here
                            alt="Contact visual"
                            fill
                            className="object-cover"
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
            </main>
            <Footer />
        </>
    )
}