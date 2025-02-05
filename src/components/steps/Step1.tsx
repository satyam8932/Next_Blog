import { motion } from 'framer-motion';
import { FormData } from '@/lib/types';
import { formOptions } from '@/lib/constants';

interface Step1Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const Step1 = ({ formData, setFormData }: Step1Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 p-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">General Information</h2>
        <p className="text-gray-600 mt-2">
          Help us determine your profile and needs for an accurate action plan
        </p>
      </div>

      {/* Move Reason Section */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          What is your main reason for moving to the UAE?
          <span className="block text-sm text-gray-500 font-normal mt-1">
            Select all that apply
          </span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formOptions.moveReasons.map((reason) => (
            <div
              key={reason}
              className={`
                relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200
                ${formData.moveReason.includes(reason) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'}
              `}
              onClick={() => {
                const newReasons = formData.moveReason.includes(reason)
                  ? formData.moveReason.filter(r => r !== reason)
                  : [...formData.moveReason, reason];
                setFormData({ ...formData, moveReason: newReasons });
              }}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  ${formData.moveReason.includes(reason) 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'}
                `}>
                  {formData.moveReason.includes(reason) && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700">{reason}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Other Reason Input */}
        {formData.moveReason.includes('Other') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <input
              type="text"
              placeholder="Please specify your reason"
              value={formData.otherMoveReason || ''}
              onChange={(e) => setFormData({ ...formData, otherMoveReason: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>
        )}
      </div>

      {/* Family Status Section */}
      <div className="space-y-4 mt-8">
        <label className="block text-lg font-medium text-gray-700">
          What is your current family status?
          <span className="block text-sm text-gray-500 font-normal mt-1">
            Helps tailor the action plan to specific needs
          </span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formOptions.familyStatuses.map((status) => (
            <div
              key={status}
              className={`
                relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200
                ${formData.familyStatus === status 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'}
              `}
              onClick={() => setFormData({ ...formData, familyStatus: status })}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${formData.familyStatus === status 
                    ? 'border-blue-500' 
                    : 'border-gray-300'}
                `}>
                  {formData.familyStatus === status && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <span className="text-gray-700">{status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Message */}
      {(!formData.moveReason.length || !formData.familyStatus) && (
        <p className="text-sm text-red-500 mt-4">
          Please complete all required fields before proceeding.
        </p>
      )}
    </motion.div>
  );
};

export default Step1;