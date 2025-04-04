
import SideNav from '@/components/UserDash/SideNav'
import UserSubscriptionComp from '../../components/User/Subscription/UserSubscriptionComp'
import React from 'react'

type Props = {}

const SubscriptionManagementUser = (props: Props) => {
    return (
        <div className="flex gap-4 px-10">
            <SideNav />
            <div className="bg-seconday flex-1 py-15 px-8  rounded-md">
                <UserSubscriptionComp />
            </div>
        </div>
    )
}

export default SubscriptionManagementUser