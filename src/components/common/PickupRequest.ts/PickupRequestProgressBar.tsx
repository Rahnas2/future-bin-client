const statusSteps = [
    { id: 'pending', label: 'Pending', icon: '⏳' },
    { id: 'accepted', label: 'Accepted', icon: '✅' },
    { id: 'completed', label: 'Completed', icon: '🎉' },
    { id: 'cancelled', label: 'Cancelled', icon: '❌' },
  ];
  
  type props = {
    status: string
  }
  const PickupRequestProgressBar:  React.FC<props> = ({ status }) => {
    // Determine the current step index (excluding cancelled unless it's the status)
    const isCancelled = status === 'cancelled';
    const currentStepIndex = isCancelled
      ? statusSteps.findIndex((step) => step.id === 'cancelled')
      : statusSteps.findIndex((step) => step.id === status);
  
    return (
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
        <div className="relative flex w-full justify-between items-center">
          {statusSteps.map((step, index) => {
            const isActive = index <= currentStepIndex && !isCancelled;
            const isCancelledStep = step.id === 'cancelled';
            const isCompleted = index < currentStepIndex && !isCancelled;
            const showStep = !isCancelledStep || (isCancelledStep && isCancelled);
  
            if (!showStep) return null;
  
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                {/* Icon and Circle */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive || isCancelledStep
                      ? 'bg-green-500 text-white border-green-500'
                      : isCompleted
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-200 text-gray-500 border-gray-300'
                  }`}
                >
                  <span className="text-xl">{step.icon}</span>
                </div>
                {/* Label */}
                <span
                  className={`mt-2 text-sm font-medium ${
                    isActive || isCancelledStep ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
  
          {/* Connecting Lines */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 z-0">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: isCancelled
                  ? '100%'
                  : `${(Math.min(currentStepIndex, 2) / 2) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PickupRequestProgressBar;