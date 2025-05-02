
import UserSubscriptionComp from '../../components/User/Subscription/UserSubscriptionComp'
type Props = {}

const SubscriptionManagementUser = (props: Props) => {
    return (
            <div className="md:bg-seconday flex-1 md:py-15 px-4 md:px-8 rounded-md ">
                <UserSubscriptionComp />
            </div>
    )
}

export default SubscriptionManagementUser