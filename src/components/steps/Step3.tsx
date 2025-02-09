// components/Step3.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FormData } from '@/lib/types';

interface Step3Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const Step3 = ({ formData, setFormData }: Step3Props) => {
  const [showOtherLanguage, setShowOtherLanguage] = useState(false);
  const [showCityInput, setShowCityInput] = useState(false);

  const languages = [
    'French',
    'English',
    'Arabic',
    'Russian',
    'Other'
  ];

  const knowledgeLevels = [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'I have no knowledge of the process'
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: 'I have done some research'
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'I am familiar with the process'
    }
  ];

  const handleLanguageChange = (language: string) => {
    if (language === 'Other') {
      setShowOtherLanguage(!showOtherLanguage);
      if (!showOtherLanguage) {
        setFormData({
          ...formData,
          languages: [...formData.languages, language]
        });
      } else {
        setFormData({
          ...formData,
          languages: formData.languages.filter(l => l !== 'Other'),
          otherLanguage: ''
        });
      }
    } else {
      const updatedLanguages = formData.languages.includes(language)
        ? formData.languages.filter(l => l !== language)
        : [...formData.languages, language];
      setFormData({ ...formData, languages: updatedLanguages });
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
        <h2 className="text-2xl font-bold text-gray-800">Preferences & Experience</h2>
        <p className="text-gray-600 mt-2">
          Help us fine-tune your plan according to your specific needs
        </p>
      </div>

      {/* Language Preferences */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          In which languages would you like to handle administrative procedures?
          <span className="block text-sm text-gray-500 font-normal mt-1">
            Select all that apply
          </span>
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((language) => (
            <div
              key={language}
              className={`
                relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200
                ${formData.languages.includes(language) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'}
              `}
              onClick={() => handleLanguageChange(language)}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  ${formData.languages.includes(language) 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'}
                `}>
                  {formData.languages.includes(language) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700">{language}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Other Language Input */}
        {showOtherLanguage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <input
              type="text"
              placeholder="Please specify the language"
              value={formData.otherLanguage || ''}
              onChange={(e) => setFormData({ ...formData, otherLanguage: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>
        )}
      </div>

      {/* City Preference */}
      <div className="space-y-4 mt-8">
        <label className="block text-lg font-medium text-gray-700">
          Do you already know which city you would like to move to?
          <span className="block text-sm text-gray-500 font-normal mt-1">
            Example: Dubai, Abu Dhabi, Sharjah...
          </span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`
              relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200
              ${formData.preferredCity === 'specific' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-200'}
            `}
            onClick={() => {
              setFormData({ ...formData, preferredCity: 'specific' });
              setShowCityInput(true);
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${formData.preferredCity === 'specific' 
                  ? 'border-blue-500' 
                  : 'border-gray-300'}
              `}>
                {formData.preferredCity === 'specific' && (
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                )}
              </div>
              <span className="text-gray-700">Yes, I know the city</span>
            </div>
          </div>

          <div
            className={`
              relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200
              ${formData.preferredCity === 'recommendation' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-200'}
            `}
            onClick={() => {
              setFormData({ ...formData, preferredCity: 'recommendation', specificCity: '' });
              setShowCityInput(false);
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${formData.preferredCity === 'recommendation' 
                  ? 'border-blue-500' 
                  : 'border-gray-300'}
              `}>
                {formData.preferredCity === 'recommendation' && (
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                )}
              </div>
              <span className="text-gray-700">I would like a recommendation</span>
            </div>
          </div>
        </div>

        {/* Specific City Input */}
        {showCityInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <input
              type="text"
              placeholder="Enter the city name"
              value={formData.specificCity || ''}
              onChange={(e) => setFormData({ ...formData, specificCity: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>
        )}
      </div>

      {/* Knowledge Level */}
      <div className="space-y-4 mt-8">
        <label className="block text-lg font-medium text-gray-700">
          What is your level of knowledge regarding UAE administrative procedures?
        </label>

        <div className="grid grid-cols-1 gap-4">
          {knowledgeLevels.map((level) => (
            <motion.div
              key={level.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200
                ${formData.knowledgeLevel === level.value 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'}
              `}
              onClick={() => setFormData({ ...formData, knowledgeLevel: level.value })}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                  ${formData.knowledgeLevel === level.value 
                    ? 'border-blue-500' 
                    : 'border-gray-300'}
                `}>
                  {formData.knowledgeLevel === level.value && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{level.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{level.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Validation Message */}
      {(!formData.languages.length || !formData.preferredCity || !formData.knowledgeLevel) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 mt-4"
        >
          Please complete all required fields before proceeding.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Step3;