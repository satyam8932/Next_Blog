import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '@/lib/types';

interface Step5Props {
    formData: FormData;
    onSubmit: (email: string) => void;
}

const Step5 = ({ formData, onSubmit }: Step5Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async () => {
        if (!termsAccepted) return;
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(email);
            // Handle successful submission
        } catch (error) {
            // Handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 p-4"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Review Your Information</h2>
                <p className="text-gray-600 mt-2">
                    Please review your selections before final submission
                </p>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Information Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-blue-100 transition-all duration-200"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="text-blue-500 mr-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        General Information
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-medium text-gray-700">Moving Reason:</span> <span className="text-gray-600">{formData.moveReason.join(', ')}</span></p>
                        {formData.otherMoveReason && (
                            <p><span className="font-medium text-gray-700">Other Reason:</span> <span className="text-gray-600">{formData.otherMoveReason}</span></p>
                        )}
                        <p><span className="font-medium text-gray-700">Family Status:</span> <span className="text-gray-600">{formData.familyStatus}</span></p>
                    </div>
                </motion.div>

                {/* Budget & Timeline Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-green-100 transition-all duration-200"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="text-green-500 mr-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        Budget & Timeline
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-medium text-gray-700">Budget Range:</span> <span className="text-gray-600">{formData.budget}</span></p>
                        <p><span className="font-medium text-gray-700">Timeline:</span> <span className="text-gray-600">{formData.timeline}</span></p>
                    </div>
                </motion.div>

                {/* Preferences Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-purple-100 transition-all duration-200"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="text-purple-500 mr-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </span>
                        Preferences
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-medium text-gray-700">Languages:</span> <span className="text-gray-600">{formData.languages}</span></p>
                        {formData.otherLanguage && (
                            <p><span className="font-medium text-gray-700">Other Language:</span> <span className="text-gray-600">{formData.otherLanguage}</span></p>
                        )}
                        <p><span className="font-medium text-gray-700">Preferred City:</span> <span className="text-gray-600">{formData.preferredCity}</span></p>
                        {formData.specificCity && (
                            <p><span className="font-medium text-gray-700">Specific City:</span> <span className="text-gray-600">{formData.specificCity}</span></p>
                        )}
                        <p><span className="font-medium text-gray-700">Knowledge Level:</span> <span className="text-gray-600">{formData.knowledgeLevel}</span></p>
                    </div>
                </motion.div>

                {/* Housing & Support Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-orange-100 transition-all duration-200"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="text-orange-500 mr-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </span>
                        Housing & Support
                    </h3>
                    <div className="space-y-2 text-sm">
                        <p><span className="font-medium text-gray-700">Housing Preference:</span> <span className="text-gray-600">{formData.housingPreference}</span></p>
                        <p><span className="font-medium text-gray-700">Need Assistance:</span> <span className="text-gray-600">{formData.needAssistance}</span></p>
                    </div>
                </motion.div>
            </div>

            {/* Email Input Section */}
            <div className="mt-8 max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                                className={`
                        block w-full px-4 py-3 rounded-lg border
                        focus:ring-0 focus:ring-offset-2 focus:outline-0
                        ${emailError
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }
                        transition-colors duration-200
                    `}
                                placeholder="your.email@example.com"
                            />
                            {emailError && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        {emailError && (
                            <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                                <span>{emailError}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-8">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        I confirm that all provided information is accurate and I agree to the{' '}
                        <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a>
                    </span>
                </label>
            </div>

            {/* Next Steps Information */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="text-blue-800 font-medium mb-2">What happens next?</h3>
                <p className="text-blue-600 text-sm">
                    After submission, you'll receive:
                </p>
                <ul className="list-disc list-inside text-blue-600 text-sm mt-2 space-y-1">
                    <li>A detailed action plan after clicking Generate within 60 seconds.</li>
                    <li>Please wait for Generation, don't hit back or you might loose your plan.</li>
                    <li>Contact information for your dedicated support team for help.</li>
                </ul>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleSubmit}
                    disabled={!termsAccepted || isSubmitting}
                    className={`
                        px-8 py-3 rounded-lg text-white font-medium
                        ${termsAccepted
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-400 cursor-not-allowed'}
                        transition-colors duration-200
                        flex items-center space-x-2
                    `}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <span>Generate</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
};

export default Step5;