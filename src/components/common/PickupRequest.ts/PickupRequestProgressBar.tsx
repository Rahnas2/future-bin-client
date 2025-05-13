import { Check, Clock, Ban, CreditCard, Package } from 'lucide-react';

type props = {
  status: string
}

const statusConfig = [
  {
    id: 'pending',
    label: 'Pending',
    icon: Clock,
    description: 'Request submitted'
  },
  {
    id: 'accepted',
    label: 'Accepted',
    icon: Check,
    description: 'Request accepted'
  },
  {
    id: 'confirmed',
    label: 'Payment',
    icon: CreditCard,
    description: 'Payment confirmed'
  },
  {
    id: 'completed',
    label: 'Completed',
    icon: Package,
    description: 'Pickup completed'
  }
];

const PickupRequestProgressBar: React.FC<props> = ({ status }) => {
  // Determine if the request is cancelled
  const isCancelled = status === 'cancelled';
  
  // If cancelled, determine what the last completed step was
  // You might need to pass this as a prop if it's stored in your data
  // For now, I'll assume it's cancelled at the current step
  
  // Find the current step index (excluding cancelled status)
  const normalSteps = statusConfig.filter(step => step.id !== 'cancelled');
  const activeStatusIndex = isCancelled ? -1 : normalSteps.findIndex(step => step.id === status);

  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between relative max-w-4xl mx-auto">
        {normalSteps.map((step, index) => {
          const isActive = !isCancelled && index === activeStatusIndex;
          const isCompleted = !isCancelled && index < activeStatusIndex;
          const isUpcoming = !isCancelled && index > activeStatusIndex;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative flex-1 z-10"
            >
              {/* Progress line connecting circles */}
              {index < normalSteps.length - 1 && (
                <div 
                  className="absolute left-1/2 top-5 w-full h-0.5"
                  style={{ width: 'calc(100%)' }}
                >
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gray-200" />
                    <div
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        isCompleted || (isActive && !isCancelled) ? 'bg-blue-500' : 'bg-transparent'
                      }`}
                      style={{
                        width: isCompleted || (isActive && !isCancelled) ? '100%' : '0%'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Circle indicator */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center 
                  transition-all duration-300 ease-in-out transform z-10 bg-accent
                  ${isActive ? 'border-2 border-blue-500 scale-110 shadow-lg bg-blue-500' : ''}
                  ${isCompleted ? 'border-2 border-green-500 bg-green-500 text-white' : ''}
                  ${isUpcoming ? 'border-2 border-gray-300 text-gray-400 bg-white' : ''}
                  ${isCancelled ? 'border-2 border-red-500 bg-red-500 text-white' : ''}
                `}
              >
                {isCancelled && index === normalSteps.length - 1 ? (
                  <Ban size={20} />
                ) : (
                  <step.icon size={20} />
                )}
              </div>

              {/* Labels */}
              <div className="mt-3 text-center">
                <span className={`
                  block font-medium text-sm mb-1
                  ${isActive ? 'text-blue-600' : ''}
                  ${isCompleted ? 'text-accent2' : ''}
                  ${isUpcoming ? 'text-gray-500' : ''}
                  ${isCancelled ? 'text-red-600' : ''}
                `}>
                  {isCancelled && index === normalSteps.length - 1 ? 'Cancelled' : step.label}
                </span>
                <span className="text-xs text-gray-400 hidden sm:block">
                  {isCancelled && index === normalSteps.length - 1 ? 'Request cancelled' : step.description}
                </span>
              </div>
            </div>
          );
        })}

        {/* Show cancelled indicator if the request is cancelled at any intermediate step */} 
        {isCancelled && activeStatusIndex !== -1 && (
          <div className="absolute left-0 right-0 top-0 flex items-center justify-center h-10 pointer-events-none">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Ban size={16} />
              <span className="text-sm font-medium">Cancelled</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupRequestProgressBar