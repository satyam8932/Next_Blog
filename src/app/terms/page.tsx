'use client';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function TermsAndConditionsPage() {
    const sections = [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using MetaExpat, you agree to be legally bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you must not use the Site."
        },
        {
          title: "2. Eligibility",
          content: "You must be at least 18 years old to use this Site. By using MetaExpat, you confirm that you meet this age requirement."
        },
        {
          title: "3. Services Provided",
          content: [
            "MetaExpat provides:",
            "• Personalized action plans for expatriation based on user-submitted information.",
            "• Informational content through blogs and guides related to immigration and relocation.",
            "",
            "MetaExpat does not provide legal advice or act as an immigration consultancy. The information is for guidance purposes only."
          ]
        },
        {
          title: "4. User Responsibilities",
          content: [
            "• Provide accurate, current, and complete information when using our services.",
            "• Do not misuse the Site, engage in illegal activities, or violate any applicable laws.",
            "• Do not attempt to gain unauthorized access to the Site's systems."
          ]
        },
        {
          title: "5. Intellectual Property",
          content: [
            "All content on MetaExpat, including text, graphics, logos, icons, and software, is the property of MetaExpat and protected by intellectual property laws.",
            "",
            "You may not:",
            "• Copy, modify, distribute, or create derivative works without written consent.",
            "• Use MetaExpat's content for commercial purposes without permission."
          ]
        },
        {
          title: "6. Personalized Action Plans",
          content: [
            "MetaExpat generates action plans based on the information you provide. While we strive for accuracy:",
            "• We do not guarantee the completeness or legal validity of the recommendations.",
            "• You are responsible for verifying information with official government sources before taking action."
          ]
        },
        {
          title: "7. Third-Party Links",
          content: "MetaExpat may contain links to third-party websites. We are not responsible for the content, privacy practices, or services of external sites."
        },
        {
          title: "8. Limitation of Liability",
          content: [
            "To the fullest extent permitted by law:",
            "• MetaExpat shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site.",
            "• We provide the Site and its services \"as is\" and \"as available\" without warranties of any kind."
          ]
        },
        {
          title: "9. Indemnification",
          content: "You agree to indemnify and hold harmless MetaExpat, its affiliates, and partners from any claims, liabilities, damages, losses, or expenses arising from your use of the Site or violation of these Terms."
        },
        {
          title: "10. Privacy Policy",
          content: "Your use of MetaExpat is also governed by our Privacy Policy outlines how we collect, use, and protect your personal data."
        },
        {
          title: "11. Modifications to Terms",
          content: "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Continued use of the Site after changes constitutes acceptance of the updated Terms."
        },
        {
          title: "12. Termination",
          content: "MetaExpat may suspend or terminate your access to the Site if you violate these Terms or engage in harmful activities."
        },
        {
          title: "13. Governing Law and Dispute Resolution",
          content: "These Terms are governed by the laws of the United Arab Emirates (UAE). Any disputes will be resolved through arbitration under the rules of the Dubai International Arbitration Centre (DIAC)."
        }
      ];

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 md:px-20 py-28 bg-gradient-to-b from-gray-50 to-white rounded-3xl">
                {/* Header Section */}
                <div className='text-center mb-16'>
                    <p className="text-blue-600 uppercase tracking-wide">METAEXPAT PLATFORM</p>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2">Terms and Conditions</h1>
                </div>

                {/* Introduction Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-8 mb-12"
                >
                    <p className="text-gray-600 leading-relaxed">
                        Welcome to MetaExpat! By accessing and using our website [www.metaexpat.com] ("Site") and related services,
                        you agree to comply with and be bound by the following Terms and Conditions ("Terms").
                        Please read them carefully before using the Site.
                    </p>
                </motion.div>

                {/* Terms Sections */}
                <div className="grid gap-8">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg p-8"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                {section.title}
                            </h2>
                            {Array.isArray(section.content) ? (
                                <div className="space-y-2 text-gray-600">
                                    {section.content.map((item, i) => (
                                        <p key={i} className="leading-relaxed">
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                            )}
                        </motion.div>
                    ))}

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-blue-50 rounded-xl shadow-lg p-8"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Contact Us
                        </h2>
                        <p className="text-gray-600 mb-4">
                            If you have any questions about these Terms and Conditions, please contact us at:
                        </p>
                        <div className="space-y-2">
                            <p className="text-gray-700 font-medium">MetaExpat</p>
                            <a
                                href="mailto:support@metaexpat.com"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700"
                            >
                                support@metaexpat.com
                                <svg
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </>
    );
}