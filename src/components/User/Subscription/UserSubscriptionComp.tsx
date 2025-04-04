import { fetchCurrentSubscriptionApi } from "@/api/userService"
import { IRootState } from "@/redux/slices"
import { stat } from "fs"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ActiveSubscriptionCard from "./ActiveSubscriptionCard"
import { subscriptionType } from "@/types/SubscriptionType"
import ActiveSubscriptionFeatures from "./ActiveSubscriptionFeatures"


type Props = {}

const UserSubscriptionComp = (props: Props) => {

    const { user } = useSelector((state: IRootState) => state.user)
    const [subscription, setSubscription] = useState<subscriptionType>()

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                if (user && user.subscriptionPlanId) {
                    const result = await fetchCurrentSubscriptionApi(user.subscriptionPlanId)
                    console.log('current subscrition ', result.subscription)
                    setSubscription(result.subscription)
                }

            } catch (error) {
                console.log('error finding the current subscription', error)
            }
        }
        fetchRequestHistory()
    }, [])

    return (
        <div>

            {subscription &&
                <div className="flex gap-10"> <ActiveSubscriptionCard subscription={subscription} />
                    <ActiveSubscriptionFeatures features={subscription.features} />
                </div>
            }
        </div>
    )
}

export default UserSubscriptionComp