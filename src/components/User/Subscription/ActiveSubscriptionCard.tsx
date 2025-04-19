import { Progress } from "@/components/ui/progress"
import { SubscriptionPickupRequestType } from "@/types/PickupRequest"
import { pickupRequestSubscriptionObjType } from "@/types/pickupRequestSubscriptionObjType"
import { subscriptionType } from "@/types/SubscriptionType"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    subscription: pickupRequestSubscriptionObjType
    price: number
}

const ActiveSubscriptionCard: React.FC<Props> = ({subscription, price}) => {

    const navigate  = useNavigate()

    const [progress, setProgress] = useState(subscription.completedPickups)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(progress), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex flex-col gap-6 bg-primary px-6 py-5 rounded-2xl w-md">

            <div className="text-end text-sm font-bold">
                <div><span>Started From:&nbsp;&nbsp;&nbsp;</span>
                    <span className="opacity-50">{new Date(subscription.startDate!).toDateString()}</span></div>

            </div>

            <div className="flex items-center justify-center gap-2 text-lg font-bold">
                <span>Active Plan: </span>
                <span className="text-accent2">{subscription.name}</span>
            </div>

            <div className="flex flex-col gap-3 items-center">
                <Progress value={progress} className="w-[60%] bg-gray-500" />
                <div className="text-sm ">
                    <span>Pickup Left: </span>
                    <span className="opacity-50">{subscription.completedPickups + ' out of ' + subscription.totalPickups}</span>
                </div>
            </div>

            <div>
                <span>End  Date :&nbsp;&nbsp;&nbsp;</span>
                <span className="opacity-50">{new Date(subscription.endDate!).toDateString()}</span>
            </div>

            <div className="flex justify-center text-sm font-medium">
                <button onClick={() => navigate('/subscription-plans')} className="px-4 py-1 bg-accent rounded-md">Upgrade Subscription</button>
            </div>
        </div>
    )
}

export default ActiveSubscriptionCard