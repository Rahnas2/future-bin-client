import React, { useEffect, useState } from 'react'
import { fetchAllSubscriptionsApi } from '../../api/userService'
import { subscriptionType } from '../../types/SubscriptionType'
import { TiTick } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux/slices'
import toast from 'react-hot-toast'
import SubscriptionRequestModal from '../User/SubscriptionRequestModal'
import showSubscriptionToast from '../User/Subscription/ConfirmSubscriptionTost'


type Props = {}

const SubscriptionPlans = (props: Props) => {

    const [isLoading, setIsloading] = useState(true)
    const [subscriptions, setSubscriptions] = useState<subscriptionType[]>([])

    const { accessToken } = useSelector((state: IRootState) => state.auth)

    const { user } = useSelector((state: IRootState) => state.user)

    // handle on-demand request modal 
    const [selectedSubscription, setSelectedSubscription] = useState<subscriptionType | null>(null);

    const handleOpen = (subscription: subscriptionType) => {
        if (!accessToken) {
            return toast.error('plase login to user this service')
        }

        if (user?.subscriptionPlanId) {
            // If the user already has this subscription, show an error
            if (subscription._id === user.subscriptionPlanId) {
                return toast(`You already have an active ${subscription.name} subscription.`);
            }
    
            // If the user has a different active subscription, show a confirmation
            return showSubscriptionToast(subscription, () => {
                setSelectedSubscription(subscription);
            });
        }


    setSelectedSubscription(subscription);
};

const handleClose = () => {
    setSelectedSubscription(null);
};

useEffect(() => {
    const fetchAllSubscriptions = async () => {
        try {
            const result = await fetchAllSubscriptionsApi()
            setSubscriptions(result.subscriptions)
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log('error ', error)
        }
    }
    fetchAllSubscriptions()
}, [])

// const handleSubscriptionReqeust = () => {
//     if (!accessToken) {
//         return toast.error('plase login to user this service')
//     }
//     setIsOpen(true)
// }

if (isLoading) return <div>loading...</div>

return (
    <div className='flex justify-center mt-10'>
        <div>
            <div className='font-semibold text-xl mb-8'>Our Subscription Plans</div>
            <div className='flex flex-col lg:flex-row gap-10'>
                {
                    subscriptions.map((data, index) => (
                        <div key={data._id} className={`${index === 1 ? 'from-accent from-20% via-[#0D7247] via-43% to-[#06753E] to-74%' : 'border border-gray-600'} w-xs bg-linear-to-br rounded-xl px-8 py-8 shadow-xl shadow-accent`}>
                            <div className={`${index === 1 ? 'text-primary' : ''} font-bold text-2xl mb-6 uppercase`}>{data.name}</div>

                            <div className='text-xl '>
                                <span className='font-bold text-2xl mr-3'>₹ {data.price}</span>
                                {/* <span className=' p-0 m-0 w-8 font-bold text-2xl '>{data.price}</span> */}
                                <span className={` ${index === 1 ? 'text-primary' : 'opacity-50'} `}>Per Month</span>
                            </div>

                            <div className={`${index === 1 ? 'text-primary' : 'opacity-50'} text-sm mb-6 w-full`}>{data.description}</div>

                            <div className='flex justify-center mb-8'>
                                <span onClick={() => handleOpen(data)} className={`${index === 1 ? 'bg-primary' : 'bg-accent'} text-sm px-10 py-1 rounded-xl cursor-pointer`}>Get Subscription</span>
                            </div>

                            <div className='flex justify-between items-center mb-3'><span className='uppercase font-bold '>Features</span></div>
                            <div className='flex flex-col gap-3 [&>*]:flex [&>*]:gap-2'>
                                {data.features.map((feature, i) => (
                                    <div key={i}>
                                        <span><TiTick className={`${index === 1 ? 'text-primary' : 'text-accent2'} inline`} /></span>
                                        <div className='w-full'  >{feature}</div>
                                    </div>
                                ))}
                            </div>

                            {/* on-demand request modal  */}
                            {selectedSubscription && selectedSubscription._id === data._id && (
                                <SubscriptionRequestModal
                                    onClose={handleClose}
                                    subscription={selectedSubscription}
                                />
                            )}

                        </div>
                    ))
                }
            </div>
        </div>
    </div>
)
}

export default SubscriptionPlans