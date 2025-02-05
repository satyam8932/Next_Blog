interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
  }
  
export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
    return (
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 text-center">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
    );
  };