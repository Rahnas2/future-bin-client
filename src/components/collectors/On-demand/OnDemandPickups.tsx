import { sendOtpService } from '@/api/authService'
import { fetchPickupRequestsByTypeAndStatus } from '@/api/pickupRequest'
import ComponentSpinner from '@/components/common/ComponentSpinner'
import { OnDemandPickupRequestType } from '@/types/PickupRequest'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IoChatbox } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ChatModal from '../ChatModal'

type Props = {}

const OnDemandPickups = (props: Props) => {

    const navigate = useNavigate()

    const [OnDemandPickups, setOnDemandPickups] = useState<OnDemandPickupRequestType[] | null>(null)
    // const [selectedPickupRequest, setSelectedPickupRequest] = useState({id: '', email: ''})
    const [isLoading, setIsLoading] = useState(false)


    const [activeChatId, setActiveChatId] = useState<string | null>(null)

    useEffect(() => {
        const fetchActiveSubscriptionRequests = async () => {
            try {
                setIsLoading(true)
                const result = await fetchPickupRequestsByTypeAndStatus('on-demand', 'confirmed')
                setOnDemandPickups(result.pickupRequests)
            } catch (error) {
                console.error('error fetching active subscriptions ', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchActiveSubscriptionRequests()
    }, [])

    const handleRequestAction = async (id: string, action: 'completed' | 'cancel', email?: string) => {
        if (action === 'completed') {
            await sendOtpService(email!)
            navigate('/otp-verification', { state: { email: email, mode: 'on-demand-completed', id: id } })
            // navigate('/collector/request/on-demand/complete', { state: { requestId } })
            return
        } else {
            navigate('/collector/request/cancel', { state: { id: id } })
        }
    }

    //navigate to map page
    const navigateMap = (coordinates: [number, number]) => {
        navigate('/map', { state: { destination: coordinates.reverse() } })
    }

    //Handle Modal
    const handleChatOpen = (id: string) => {
        setActiveChatId(id)
    }

    // close any open chat modal
    const handleChatClose = () => {
        setActiveChatId(null)
    }

    if (isLoading) return <ComponentSpinner />

    if (!OnDemandPickups || !OnDemandPickups.length) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-lg">No active on-demand pickupsfound</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {OnDemandPickups.map(req => (

                <div key={req._id} className="p-5 border border-gray-500 hover:border-accent2 rounded-md shadow-lg">
                    <div className="text-lg capitalize mb-2">{req.name}</div>

                    <div className="opacity-50 flex flex-col gap-1 text-sm">
                        <div> <Phone className="inline h-4 w-4 mr-2" />&nbsp;<span>{req.mobile}</span>  </div>

                        <div> <Mail className="inline h-4 w-4 mr-2" />&nbsp;<span>{req.email}</span></div>

                        <button onClick={() => navigateMap(req.address.location.coordinates)} className='cursor-pointer w-fit'><MapPin className="inline h-4 w-4 mr-2" />&nbsp;<span>{req.address.street + ',' + req.address.city}</span></button>

                    </div>

                    <div className='relative text-end'>
                        <button onClick={() => handleChatOpen(req._id as string)} className='cursor-pointer'>
                            <MessageCircle className='inline text-4xl text-blue-400 ' />
                        </button>

                        {activeChatId === req._id && (
                            <>
                                <div
                                    className="fixed inset-0 bg-opacity-30 flex justify-center items-center"
                                    onClick={handleChatClose}
                                ></div>
                                <div className="absolute bottom-3 right-10 z-50 bg-white text-secondary rounded-sm">
                                    <ChatModal participant={req.userId as string} participantName={req.name} />
                                </div>
                            </>
                        )}

                    </div>

                    <div className="border opacity-10 mt-3 mb-5"></div>

                    <div className="text-sm flex flex-col gap-5">

                        <div className="flex">
                            <div className="flex-1"><span className="opacity-50">Plan</span> <br /> {req.wasteTypes.map(w => (<span className="font-medium capitalize">{w.name + ' '}</span>))}</div>
                            <div className="flex-1"><span className="opacity-50">Total Weight</span> <br /> <span className="font-medium">{req.totalWeight}</span></div>
                            <div className="text-end"><button onClick={() => handleRequestAction(req._id as string, 'completed', req.email)} className="px-3 py-2 border border-gray-500 cursor-pointer rounded-md w-xs shadow-lg">Completed Pickup</button></div>
                        </div>

                        <div className="flex">
                            <div className="flex-1"><span className="opacity-50">Total Price</span> <br /> <span className="font-medium">{req.totalAmount}</span></div>
                            <div className="flex-1"><span className="opacity-50">Assigned At</span> <br /> <span className="font-medium"></span>{new Date(req.assignedAt!).toDateString()}</div>
                            <div className="text-end"><button onClick={() => handleRequestAction(req._id as string, 'cancel')} className=" px-3 py-2  border border-red-500 bg-red-500 cursor-pointer rounded-md w-xs">Cancel Pickup</button></div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default OnDemandPickups