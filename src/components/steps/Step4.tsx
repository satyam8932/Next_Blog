// components/Step4.tsx
import { motion } from 'framer-motion';
import { FormData } from '@/lib/types';

interface Step4Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const Step4 = ({ formData, setFormData }: Step4Props) => {
  const housingOptions = [
    {
      value: 'rent',
      label: 'Rent',
      description: 'Flexible housing solution with various term options',
      icon: '🏢'
    },
    {
      value: 'buy',
      label: 'Buy',
      description: 'Long-term investment in UAE property',
      icon: '🏠'
    },
    {
      value: 'undecided',
      label: 'Not sure yet',
      description: 'Need more information to decide',
      icon: '❓'
    }
  ];

  const assistanceOptions = [
    {
      value: 'need_support',
      label: 'Yes, I would like support',
      description: 'Get professional assistance with procedures',
      features: [
        'Document preparation',
        'Translation services',
        'Administrative guidance',
        'Property search assistance'
      ]
    },
    {
      value: 'self_managed',
      label: 'No, I want to manage everything myself',
      description: 'Handle procedures independently',
      features: [
        'Access to guides',
        'Document checklists',
        'Self-service resources',
        'Email support'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 p-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Housing & Support Preferences</h2>
        <p className="text-gray-600 mt-2">
          Let's understand your housing needs and support requirements
        </p>
      </div>

      {/* Housing Preference Section */}
      <div className="space-y-6">
        <label className="block text-lg font-medium text-gray-700">
          Do you prefer to rent or buy a home?
          <span className="block text-sm text-gray-500 font-normal mt-1">
            Choose the option that best fits your plans
          </span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {housingOptions.map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200
                ${formData.housingPreference === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'}
              `}
              onClick={() => setFormData({ ...formData, housingPreference: option.value })}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <span className="text-4xl">{option.icon}</span>
                <div>
                  <p className="font-medium text-gray-800">{option.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                </div>
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${formData.housingPreference === option.value
                    ? 'border-blue-500'
                    : 'border-gray-300'}
                `}>
                  {formData.housingPreference === option.value && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Administrative Support Section */}
      <div className="space-y-6 mt-8">
        <label className="block text-lg font-medium text-gray-700">
          Do you need assistance with administrative procedures?
          <span className="block text-sm text-gray-500 font-normal mt-1">
            Choose the level of support you prefer
          </span>
        </label>

        <div className="grid grid-cols-1 gap-6">
          {assistanceOptions.map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200
                ${formData.needAssistance === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'}
              `}
              onClick={() => setFormData({ ...formData, needAssistance: option.value })}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                      ${formData.needAssistance === option.value
                        ? 'border-blue-500'
                        : 'border-gray-300'}
                    `}>
                      {formData.needAssistance === option.value && (
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{option.label}</p>
                      <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Validation Message */}
      {(!formData.housingPreference || !formData.needAssistance) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 mt-4"
        >
          Please select your housing and assistance preferences to proceed.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Step4;