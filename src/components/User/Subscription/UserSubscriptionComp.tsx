
import { useEffect, useState } from "react"
import ActiveSubscriptionCard from "./ActiveSubscriptionCard"
import { fetchPickupRequestsByTypeAndStatus } from "@/api/pickupRequest"
import { SubscriptionPickupRequestType } from "@/types/PickupRequest"
import ActiveSubscriptionFeatures from "./ActiveSubscriptionFeatures"
import ComponentSpinner from "@/components/common/ComponentSpinner"
import { Link } from "react-router-dom"


type Props = {}

const UserSubscriptionComp = (props: Props) => {


    const [pickupRequest, setPickupRequest] = useState<SubscriptionPickupRequestType | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                setIsLoading(true)
                const result = await fetchPickupRequestsByTypeAndStatus('subscription', 'confirmed')
                console.log('current subscrition ', result.pickupRequests)
                setPickupRequest(result.pickupRequests[0])
            } catch (error) {
                console.log('error finding the current subscription', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchRequestHistory()
    }, [])

    if (isLoading) return <ComponentSpinner />

    if (!pickupRequest) {
        return (
            <div className=" p-6 text-center">
                <h3 className="mb-2 text-lg font-medium">No Active Subscription</h3>
                <p className="text-gray-600">You don't have any active subscriptions at the moment.</p>
                <Link to="/subscription-plans" className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" >
                    Browse Subscriptions
                </Link>
            </div>
        )
    }

    return (
        <div>
            <div className="flex gap-10"> <ActiveSubscriptionCard requestId={pickupRequest._id!} subscription={pickupRequest.subscription} price={pickupRequest.totalAmount} />
                <ActiveSubscriptionFeatures features={pickupRequest.subscription.features} />
            </div>
        </div>
    )
}

export default UserSubscriptionComp