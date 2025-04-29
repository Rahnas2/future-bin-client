
import SideNav from '@/components/UserDash/SideNav'
import UserSubscriptionComp from '../../components/User/Subscription/UserSubscriptionComp'
type Props = {}

const SubscriptionManagementUser = (props: Props) => {
    return (
            <div className="bg-seconday flex-1 py-15 px-8  rounded-md">
                <UserSubscriptionComp />
            </div>
    )
}

export default SubscriptionManagementUser