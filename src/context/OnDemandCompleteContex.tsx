import { createContext, useContext, useState } from 'react';
import { OnDemandPickupRequestType } from '@/types/PickupRequest';

const OnDemandCompleteContext = createContext<{
    pickupRequest: OnDemandPickupRequestType;
    setPickupRequest: React.Dispatch<React.SetStateAction<OnDemandPickupRequestType>>;
  }>({
    pickupRequest: {} as OnDemandPickupRequestType, // Default empty object, will be overridden
    setPickupRequest: () => {},
  });

export const OnDemandCompleteProvider: React.FC<{ children: React.ReactNode, initialPickupRequest: OnDemandPickupRequestType }> = ({ children, initialPickupRequest }) => {
    const [pickupRequest, setPickupRequest] = useState<OnDemandPickupRequestType>(initialPickupRequest);
  return (
    <OnDemandCompleteContext.Provider value={{ pickupRequest, setPickupRequest }}>
      {children}
    </OnDemandCompleteContext.Provider>
  );
};

export const useOnDemandComplete = () => useContext(OnDemandCompleteContext);