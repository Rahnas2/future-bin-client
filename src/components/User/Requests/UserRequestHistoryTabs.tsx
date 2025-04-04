
import { pickupRequestType } from '@/types/PickupRequest'

type Props = {
    currentTab: 'all' | 'pending' | 'accepted' | 'cancelled' | 'completed',
    setTab: (tab: 'all' | 'pending' | 'accepted' | 'cancelled' | 'completed') => void
    allRequestHistory: pickupRequestType[]
    filterredRequestHistory: pickupRequestType[]
    setFilterredRequestHistory(reqeustes: pickupRequestType[]): void
}

const UserRequestHistoryTabs = (props: Props) => {

    const handleTab = (tab: 'all' | 'pending' | 'accepted' | 'cancelled' | 'completed') => {
        props.setTab(tab)

        if (tab === 'all') {
            props.setFilterredRequestHistory(props.allRequestHistory.map(req => req))
        } else {
            const changedRequestHistory = props.allRequestHistory.filter(req => req.status === tab)
            props.setFilterredRequestHistory(changedRequestHistory)
        }

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