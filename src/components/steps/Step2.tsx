// components/Step2.tsx
import { motion } from 'framer-motion';
import { FormData } from '@/lib/types';
import { formOptions } from '@/lib/constants';

interface Step2Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const Step2 = ({ formData, setFormData }: Step2Props) => {
  const budgetRanges = [
    { value: 'less_5000', label: 'Less than $5,000' },
    { value: '5000_10000', label: 'Between $5,000 and $10,000' },
    { value: '10000_20000', label: 'Between $10,000 and $20,000' },
    { value: 'more_20000', label: 'More than $20,000' }
  ];

  const timelineOptions = [
    { 
      value: 'asap', 
      label: 'As soon as possible',
      description: 'Less than 3 months'
    },
    { 
      value: '3_6_months', 
      label: 'In 3 to 6 months',
      description: 'Medium-term planning'
    },
    { 
      value: '6_plus_months', 
      label: 'In more than 6 months',
      description: 'Long-term planning'
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
        <h2 className="text-2xl font-bold text-gray-800">Budget and Timeline</h2>
        <p className="text-gray-600 mt-2">
          Let's ensure a realistic plan based on your financial situation and timeline
        </p>
      </div>

      {/* Budget Section */}
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            What is your estimated total budget for this move?
            <span className="block text-sm text-gray-500 font-normal mt-1">
              Including visa, housing, administrative fees, etc.
            </span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {budgetRanges.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200
                  ${formData.budget === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-200'}
                `}
                onClick={() => setFormData({ ...formData, budget: option.value })}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                    ${formData.budget === option.value 
                      ? 'border-blue-500' 
                      : 'border-gray-300'}
                  `}>
                    {formData.budget === option.value && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div>
                    <span className="text-gray-800 font-medium">{option.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-6 mt-8">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            When do you plan to complete your relocation?
          </label>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {timelineOptions.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`
                  relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200
                  ${formData.timeline === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-200'}
                `}
                onClick={() => setFormData({ ...formData, timeline: option.value })}
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    mt-1 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                    ${formData.timeline === option.value 
                      ? 'border-blue-500' 
                      : 'border-gray-300'}
                  `}>
                    {formData.timeline === option.value && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{option.label}</p>
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Validation Message */}
      {(!formData.budget || !formData.timeline) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 mt-4"
        >
          Please select both your budget range and preferred timeline to proceed.
        </motion.p>
      )}
    </motion.div>
  );
};

export default Step2;