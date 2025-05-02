import { fetchPickupRequestsByTypeAndStatus } from "@/api/pickupRequest"
import ComponentSpinner from "@/components/common/ComponentSpinner"
import { SubscriptionPickupRequestType } from "@/types/PickupRequest"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import ScheduledPickupModal from "./ScheduledPickupModal"
import { pickupRequestApi } from "@/api/userService"
import { useNavigate } from "react-router-dom"
import ChatModal from "../ChatModal"

type Props = {}

const CollectorActiveSubscriptions = (props: Props) => {

    const navigate = useNavigate()

    const [ActiveSubscriptions, setActiveSubscriptions] = useState<SubscriptionPickupRequestType[] | null>(null)
    const [selectedPickupRequest, setSelectedPickupRequest] = useState({ id: '', email: '' })
    const [isLoading, setIsLoading] = useState(false)

    const [openScheduledPickups, setOpenScheuledPickups] = useState(false)

    const [activeChatId, setActiveChatId] = useState<string | null>(null)

    const handleOpenScheduledPickups = (pickupRequestId: string, email: string) => {
        setOpenScheuledPickups(true)
        setSelectedPickupRequest({ id: pickupRequestId, email: email })
    }

    const handleCloseScheduledPickups = () => {
        setOpenScheuledPickups(false)
    }

    //navigate to map page
    const navigateMap = (coordinates: [number, number]) => {
        navigate('/map', { state: { destination: coordinates.reverse() } })
    }

    useEffect(() => {
        const fetchActiveSubscriptionRequests = async () => {
            try {
                setIsLoading(true)
                const result = await fetchPickupRequestsByTypeAndStatus('subscription', 'confirmed')
                setActiveSubscriptions(result.pickupRequests)
            } catch (error) {
                console.error('error fetching active subscriptions ', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchActiveSubscriptionRequests()
    }, [])

    //Handle Modal
    const handleChatOpen = (id: string) => {
        setActiveChatId(id)
    }

    // close any open chat modal
    const handleChatClose = () => {
        setActiveChatId(null)
    }

    if (isLoading) return <ComponentSpinner />

    if (!ActiveSubscriptions || !ActiveSubscriptions.length) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-lg">No active subscription plans found</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {ActiveSubscriptions.map(req => (

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

                    <div className="border opacity-10 my-5"></div>

                    <div className="text-sm flex flex-col gap-5">

                        <div className="flex">
                            <div className="flex-1"><span className="opacity-50">Plan</span> <br /> <span className="font-medium">{req?.subscription?.name}</span></div>
                            <div className="flex-1"><span className="opacity-50">Progress</span> <br /> <span className="font-medium">{req?.subscription?.totalPickups + '/' + req?.subscription?.completedPickups}</span></div>
                            <div className="text-end"><button onClick={() => handleOpenScheduledPickups(req._id as string, req.email)} className="px-3 py-2 border border-gray-500 cursor-pointer rounded-md w-xs shadow-lg">Scheduled Pickups</button></div>
                        </div>

                        <div className="flex">
                            <div className="flex-1"><span className="opacity-50">Start Date</span> <br /> <span className="font-medium">89/9/27</span></div>
                            <div className="flex-1"><span className="opacity-50">End Date</span> <br /> <span className="font-medium">89/9/24</span></div>
                            <div className="text-end"><button onClick={() => navigate('/collector/request/cancel', { state: { id: req._id as string } })} className=" px-3 py-2  border border-red-500 bg-red-500 cursor-pointer rounded-md w-xs">Cancel Subscription</button></div>
                        </div>
                    </div>
                </div>
            ))}

            {openScheduledPickups && <ScheduledPickupModal pickupRequestId={selectedPickupRequest.id} email={selectedPickupRequest.email} onClose={handleCloseScheduledPickups} />}
        </div>
    )
}

export default CollectorActiveSubscriptions