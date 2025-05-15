import NotificationList from '@/components/Notification/NotificationList'


const CollectorNotifications = () => {
    return (
        <div className='flex min-h-lvh'>
            <div className="bg-primary md:mt-10 md:mr-5 px-4 py-10 md:py-5 rounded-t-2xl flex-1 ">
                <NotificationList />
            </div>
        </div>
    )
}

export default CollectorNotifications