
import { SetStateAction } from 'react'
import { OnDemandPickupRequestType } from '../../types/PickupRequest'
import PickupReqeustCard from './PickupReqeustCard'

type Props = {
    requests: OnDemandPickupRequestType[]
    setRequests: (value: SetStateAction<OnDemandPickupRequestType[] | []>) => void
    setDeclineIds: (value: SetStateAction<string[]>) => void
}

const OnDemandRequests = (props: Props) => {

    const handleRequestActions = (requestId: string) => {
        props.setRequests(prev => prev.filter(req => req._id !== requestId))
    }

    const handleDecline = (requestId: string) => {
        props.setDeclineIds(prev => {
            const updatedDeclineIds = [...prev, requestId];
            localStorage.setItem('pickupRequestDeclineIds', JSON.stringify(updatedDeclineIds));
            return updatedDeclineIds
        });
    }

    return (
        <div className='flex gap-3 flex-wrap mt-8'>
            {
                props.requests.map(request => (
                    <PickupReqeustCard  key={request._id} 
                    request={request}
                    onAction={handleRequestActions}
                    onDecline={handleDecline}
                    />
                ))
            }
        </div>
    )
         
}

export default OnDemandRequests