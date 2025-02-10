'use client';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
    const sections = [
        {
            title: "1. Information We Collect",
            content: [
                {
                    subtitle: "a) Information You Provide Directly:",
                    items: [
                        "Personal Information: Name, email address, phone number, nationality, and other details provided when filling out forms or subscribing to our services.",
                        "Form Data: Responses to our questionnaires to generate personalized action plans."
                    ]
                },
                {
                    subtitle: "b) Information We Collect Automatically:",
                    items: [
                        "Device Information: IP address, browser type, operating system, referring URLs, and pages visited.",
                        "Cookies and Tracking Technologies: To enhance user experience and analyze site performance."
                    ]
                }
            ]
        },
        {
            title: "2. How We Use Your Information",
            content: [
                "• To generate personalized action plans based on your inputs.",
                "• To improve our services, website functionality, and user experience.",
                "• To communicate with you about updates, offers, and important information.",
                "• For security, fraud prevention, and legal compliance."
            ]
        },
        {
            title: "3. Sharing of Information",
            content: [
                "• With Service Providers: For hosting, email delivery, analytics, and other technical support.",
                "• Legal Requirements: If required by law, legal process, or to protect MetaExpat's rights.",
                "• Business Transfers: In case of a merger, sale, or asset transfer.",
                "",
                "We do NOT sell, rent, or trade your personal information to third parties."
            ]
        },
        {
            title: "4. Cookies and Tracking Technologies",
            content: [
                "We use cookies to:",
                "• Recognize repeat visitors.",
                "• Analyze traffic and user interactions.",
                "• Improve website performance.",
                "",
                "You can manage cookie preferences through your browser settings."
            ]
        },
        {
            title: "5. Data Retention",
            content: [
                "We retain your personal information only as long as necessary to:",
                "• Provide our services.",
                "• Comply with legal obligations.",
                "• Resolve disputes and enforce agreements."
            ]
        },
        {
            title: "6. Data Security",
            content: [
                "We implement security measures to protect your data, including:",
                "• Encryption of sensitive information.",
                "• Secure servers and data storage.",
                "• Regular security audits and updates.",
                "",
                "However, no method of transmission over the internet is 100% secure."
            ]
        },
        {
            title: "7. Your Rights",
            content: [
                "Depending on your location, you may have the right to:",
                "• Access, correct, or delete your personal data.",
                "• Withdraw consent at any time.",
                "• Request data portability.",
                "• Object to data processing for marketing purposes.",
                "",
                "To exercise these rights, contact us at support@metaexpat.com"
            ]
        },
        {
            title: "8. International Data Transfers",
            content: "As MetaExpat operates globally, your data may be transferred to and processed in countries outside your own. We ensure appropriate safeguards are in place for such transfers."
        },
        {
            title: "9. Children's Privacy",
            content: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors."
        },
        {
            title: "10. Changes to This Privacy Policy",
            content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated \"Effective Date.\""
        }
    ];
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 md:px-20 py-28 bg-gradient-to-b from-gray-50 to-white rounded-3xl">
                {/* Header Section */}
                <div className='text-center mb-16'>
                    <p className="text-blue-600 uppercase tracking-wide">LEARN MORE OF OUR</p>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2">Privacy Policy</h1>
                </div>

                {/* Introduction Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-8 mb-12"
                >
                    <p className="text-gray-600 leading-relaxed">
                        Your privacy is important to us. That is why we protect all personal information that you provide to us.
                        You will find here how we use and process your personal information and how we use cookies.
                    </p>
                </motion.div>

                {/* Privacy Policy Sections */}
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
                                <div className="space-y-4">
                                    {section.content.map((item, i) => (
                                        typeof item === 'object' ? (
                                            <div key={i} className="space-y-2">
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    {item.subtitle}
                                                </h3>
                                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                                    {item.items.map((subItem, j) => (
                                                        <li key={j} className="leading-relaxed">{subItem}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p key={i} className="text-gray-600 leading-relaxed">
                                                {item}
                                            </p>
                                        )
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
                            11. Contact Us
                        </h2>
                        <p className="text-gray-600 mb-4">
                            If you have any questions or concerns about this Privacy Policy, please contact us at:
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