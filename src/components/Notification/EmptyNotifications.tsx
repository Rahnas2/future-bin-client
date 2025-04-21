import { BellOff } from 'lucide-react'
import React from 'react'

type Props = {}

const EmptyNotifications = (props: Props) => {
    return (
        <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
            <div className=" p-4 rounded-full mb-4">
                <BellOff className="h-10 w-10 text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">No notifications yet</h3>
            <p className="text-gray-400 max-w-xs">
                When you receive notifications, they'll appear here
            </p>
        </div>
    )
}

export default EmptyNotifications