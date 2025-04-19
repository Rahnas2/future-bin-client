import { fetchCurrentSubscriptionApi } from "@/api/userService"
import { IRootState } from "@/redux/slices"
import { stat } from "fs"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ActiveSubscriptionCard from "./ActiveSubscriptionCard"
import { subscriptionType } from "@/types/SubscriptionType"
import ActiveSubscriptionFeatures from "./ActiveSubscriptionFeatures"
import { fetchPickupRequestsByTypeAndStatus } from "@/api/pickupRequest"
import { SubscriptionPickupRequestType } from "@/types/PickupRequest"


type Props = {}

const UserSubscriptionComp = (props: Props) => {

    const { user } = useSelector((state: IRootState) => state.user)
    const [pickupRequest, SetPickupickupRequest] = useState<SubscriptionPickupRequestType >()

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                if (user && user.subscriptionPlanId) {
                    const result = await fetchPickupRequestsByTypeAndStatus('subscription', 'confirmed')
                    console.log('current subscrition ', result.pickupRequests)
                    SetPickupickupRequest(result.pickupRequests[0])
                }

            } catch (error) {
                console.log('error finding the current subscription', error)
            }
        }
        fetchRequestHistory()
    }, [])

    return (
        <div>

            {pickupRequest &&
                <div className="flex gap-10"> <ActiveSubscriptionCard subscription={pickupRequest.subscription} price={pickupRequest.totalAmount} />
                    {/* <ActiveSubscriptionFeatures features={pickupRequest.subscription.features} /> */}
                </div>
            }
        </div>
    )
}

export default UserSubscriptionComp