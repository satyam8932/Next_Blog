'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import { ProgressBar } from './ProgressBar';
import { FormData } from '@/lib/types';

const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Section 1 initial values
    moveReason: [],
    otherMoveReason: '',
    familyStatus: '',

    // Section 2 initial values
    budget: '',
    timeline: '',

    // Section 3 initial values
    languages: [],
    otherLanguage: '',
    preferredCity: '',
    specificCity: '',
    knowledgeLevel: '',

    // Section 4 initial values
    housingPreference: '',
    needAssistance: ''
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', formData);
    try {
      // Add your submission logic here
      // Example:
      // const response = await fetch('/api/submit-form', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Submission failed');
      
      // Handle successful submission
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  // Validation function (optional)
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.moveReason.length > 0 && formData.familyStatus !== '';
      case 2:
        return formData.budget !== '' && formData.timeline !== '';
      case 3:
        return formData.languages.length > 0 && formData.preferredCity !== '' && formData.knowledgeLevel !== '';
      case 4:
        return formData.housingPreference !== '' && formData.needAssistance !== '';
      default:
        return true;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Plan Your Expatriation
        </h1>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {currentStep === 1 && (
              <Step1 formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 2 && (
              <Step2 formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 3 && (
              <Step3 formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 4 && (
              <Step4 formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 5 && (
              <Step5 
                formData={formData} 
                onSubmit={handleSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors duration-200"
          >
            Back
          </button>
          {currentStep < 5 && (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepForm;