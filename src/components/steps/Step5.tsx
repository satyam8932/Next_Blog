import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '@/lib/types';

interface Step5Props {
    formData: FormData;
    onSubmit: () => void;
  }
  
  const Step5 = ({ formData, onSubmit }: Step5Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
  
    const handleSubmit = async () => {
      if (!termsAccepted) return;
      
      setIsSubmitting(true);
      try {
        await onSubmit();
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
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
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
              <p><span className="font-medium">Moving Reason:</span> {formData.moveReason.join(', ')}</p>
              {formData.otherMoveReason && (
                <p><span className="font-medium">Other Reason:</span> {formData.otherMoveReason}</p>
              )}
              <p><span className="font-medium">Family Status:</span> {formData.familyStatus}</p>
            </div>
          </motion.div>
  
          {/* Budget & Timeline Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
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
              <p><span className="font-medium">Budget Range:</span> {formData.budget}</p>
              <p><span className="font-medium">Timeline:</span> {formData.timeline}</p>
            </div>
          </motion.div>
  
          {/* Preferences Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
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
              <p><span className="font-medium">Languages:</span> {formData.languages.join(', ')}</p>
              {formData.otherLanguage && (
                <p><span className="font-medium">Other Language:</span> {formData.otherLanguage}</p>
              )}
              <p><span className="font-medium">Preferred City:</span> {formData.preferredCity}</p>
              {formData.specificCity && (
                <p><span className="font-medium">Specific City:</span> {formData.specificCity}</p>
              )}
              <p><span className="font-medium">Knowledge Level:</span> {formData.knowledgeLevel}</p>
            </div>
          </motion.div>
  
          {/* Housing & Support Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
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
              <p><span className="font-medium">Housing Preference:</span> {formData.housingPreference}</p>
              <p><span className="font-medium">Need Assistance:</span> {formData.needAssistance}</p>
            </div>
          </motion.div>
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
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
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
            <li>A confirmation email with your summary</li>
            <li>A detailed action plan within 24 hours</li>
            <li>Contact information for your dedicated support team</li>
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
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Application</span>
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