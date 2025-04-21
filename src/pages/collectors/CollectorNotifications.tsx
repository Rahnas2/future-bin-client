import NotificationList from '@/components/Notification/NotificationList'
import React from 'react'

type Props = {}

const CollectorNotifications = (props: Props) => {
    return (
        <div className='flex min-h-lvh'>
            <div className="bg-primary mt-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">
                <NotificationList />
            </div>
        </div>
    )
}

export default CollectorNotifications