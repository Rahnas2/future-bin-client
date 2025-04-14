
import { pickupRequestType } from '@/types/PickupRequest'
import { pickupRequestStatusType } from '@/types/pickupRequestStatus'

type Props = {
    currentTab: 'all' | pickupRequestStatusType,
    setTab: (tab: 'all' | pickupRequestStatusType) => void
    requestHistory: pickupRequestType[]
}

const UserRequestHistoryTabs = (props: Props) => {

    const handleTab = (tab: 'all' | pickupRequestStatusType) => {
        props.setTab(tab)
    }
    
    return (
        <div className='flex gap-5 w-fit  bg-primary rounded-2xl [&>*]:rounded-2xl [&>*]:px-6 [&>*]:py-3 [&>*]:cursor-pointer'>
            <span onClick={() => handleTab('all')} className={`${props.currentTab === 'all' && 'bg-accent'} `}>All</span>
            <span onClick={() => handleTab('pending')} className={`${props.currentTab === 'pending' && 'bg-accent'} `}>Pending</span>
            <span onClick={() => handleTab('accepted')} className={`${props.currentTab === 'accepted' && 'bg-accent'} `}>In Progress</span>
            <span onClick={() => handleTab('cancelled')} className={`${props.currentTab === 'cancelled' && 'bg-accent'} `}>Cacelled</span>
            <span onClick={() => handleTab('completed')} className={`${props.currentTab === 'completed' && 'bg-accent'} `}>Completed</span>
        </div>
    )
}

export default UserRequestHistoryTabs