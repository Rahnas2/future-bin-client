import { pickupRequestStatusType } from '@/types/pickupRequestStatus'

type Props = {
    currentTab: 'all' | pickupRequestStatusType,
    setTab: (tab: 'all' | pickupRequestStatusType) => void
}

const UserRequestHistoryTabs = (props: Props) => {

    const handleTab = (tab: 'all' | pickupRequestStatusType) => {
        props.setTab(tab)
    }
    
    return (
        <div className='flex justify-between md:gap-5 w-full md:w-fit bg-primary rounded-2xl text-sm  [&>*]:md:rounded-2xl  [&>*]:md:px-6 [&>*]:py-2 [&>*]:md:py-3 [&>*]:cursor-pointer'>
            <span onClick={() => handleTab('all')} className={`${props.currentTab === 'all' ? 'md:bg-accent  md:border-b-0 border-b border-b-accent2 transform duration-1000': 'hover:text-accent2'} `}>All</span>
            <span onClick={() => handleTab('pending')} className={` ${props.currentTab === 'pending' ?  'md:bg-accent  md:border-b-0 border-b border-b-accent2 transform duration-1000': 'hover:text-accent2'} `}>Pending</span>
            <span onClick={() => handleTab('accepted')} className={` ${props.currentTab === 'accepted' ? 'md:bg-accent  md:border-b-0 border-b border-b-accent2 transform duration-1000': 'hover:text-accent2'} `}>Accepted</span>
            <span onClick={() => handleTab('confirmed')} className={` ${props.currentTab === 'confirmed'  ? 'md:bg-accent  md:border-b-0 border-b border-b-accent2 transform duration-1000': 'hover:text-accent2'} `}>In Progress</span>
            <span onClick={() => handleTab('cancelled')} className={`${props.currentTab === 'cancelled' ? 'md:bg-accent  md:border-b-0 border-b border-b-accent2 transform duration-1000': 'hover:text-accent2'} `}>Cacelled</span>
            <span onClick={() => handleTab('completed')} className={`${props.currentTab === 'completed' ? 'md:bg-accent  md:border-b-0 border-b border-b-accent2 transform duration-1000': 'hover:text-accent2'}`}>Completed</span>
        </div>
    )
}

export default UserRequestHistoryTabs