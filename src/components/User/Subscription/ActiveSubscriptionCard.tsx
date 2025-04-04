import { Progress } from "@/components/ui/progress"
import { subscriptionType } from "@/types/SubscriptionType"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    subscription: subscriptionType
}

const ActiveSubscriptionCard = (props: Props) => {

    const navigate  = useNavigate()

    const [progress, setProgress] = useState(1)

    // useEffect(() => {
    //     const timer = setTimeout(() => setProgress(66), 500)
    //     return () => clearTimeout(timer)
    // }, [])

    return (
        <div className="flex flex-col gap-6 bg-primary px-6 py-5 rounded-2xl w-md">

            <div className="text-end text-sm font-bold">
                <div><span>Started From:&nbsp;&nbsp;&nbsp;</span>
                    <span className="opacity-50">01/10/25</span></div>

            </div>

            <div className="flex items-center justify-center gap-2 text-lg font-bold">
                <span>Active Plan: </span>
                <span className="text-accent2">{props.subscription.name}</span>
            </div>

            <div className="flex flex-col gap-3 items-center">
                <Progress value={progress} className="w-[60%] bg-gray-500" />
                <div className="text-sm ">
                    <span>Pickup Left: </span>
                    <span className="opacity-50">4 Of 4</span>
                </div>
            </div>

            <div>
                <span>Renewable  Date :&nbsp;&nbsp;&nbsp;</span>
                <span className="opacity-50">01/10/25</span>
            </div>

            <div className="flex justify-center text-sm font-medium">
                <button onClick={() => navigate('/subscription-plans')} className="px-4 py-1 bg-accent rounded-md">Upgrade Subscription</button>
            </div>
        </div>
    )
}

export default ActiveSubscriptionCard