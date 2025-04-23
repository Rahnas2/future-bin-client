import { fetchPickupRequestById } from '@/api/pickupRequest'
import { pickupRequestType } from '@/types/PickupRequest'
import React, { useEffect, useState } from 'react'
import ComponentSpinner from '../ComponentSpinner'
import Address from '@/components/Address'
import SingleWasteTypeAndWeight from '../WasteTypes/SingleWasteTypeAndWeight'
import { CalendarDays, Clock9, MessageCircle } from 'lucide-react'
import PickupRequestProgressBar from './PickupRequestProgressBar'
import { useSelector } from 'react-redux'
import { IRootState } from '@/redux/slices'
import PersonalInfoCard from '../PersonalInfoCard'
import { reviewType } from '@/types/reviewType'
import FeedBackAddEditModal from '@/components/User/Feedback/FeedBackAddEditModal'
import { fetchUserReviewWithCollectorIdApi } from '@/api/reviewService'
import CancelPickupRequestModal from './CancelPickupRequestModal'
import ActiveSubscriptionCard from '@/components/User/Subscription/ActiveSubscriptionCard'
import ChatModal from '@/components/collectors/ChatModal'

type Props = {
    requestId: string
}

const SinglePickupRequestComp: React.FC<Props> = ({ requestId }) => {

    const [pickupRequest, setPickupRequest] = useState<pickupRequestType | null>(null)
    const [pickupRequestLoading, setIsPickupRequestLoading] = useState(true)

    const { role } = useSelector((state: IRootState) => state.auth)

    const [feedback, setFeedback] = useState<reviewType | null>(null)
    const [addEditModal, setAddEditModal] = useState(false)

    const [cancelModal, setCancelModal] = useState(false)

    const [chatModal, setChatModal] = useState(false)

    const handleAddEditModalOpen = () => {
        setAddEditModal(true)
    }

    const handleAddEditModalClose = () => {
        setAddEditModal(false)
    }

    const handleCancelModalOpen = () => {
        setCancelModal(true)
    }

    const handleCancelModalClose = () => {
        setCancelModal(false)
    }

    //Handle Chat Modal 
    const handleChatOpen = () => {
        setChatModal(true)
    }

    // close any open chat modal
    const handleChatClose = () => {
        setChatModal(false)
    }

    useEffect(() => {
        const fetchPickupRequest = async () => {
            try {
                setIsPickupRequestLoading(true)

                const result = await fetchPickupRequestById(requestId)
                setPickupRequest(result.request)
            } catch (error) {
                console.error('error fetching request ', error)
            } finally {
                setIsPickupRequestLoading(false)
            }
        }
        fetchPickupRequest()
    }, [])

    useEffect(() => {
        const checkIfUserReviewed = async () => {
            try {
                if (
                    role === 'resident' &&
                    pickupRequest?.status === 'completed'
                ) {
                    const result = await fetchUserReviewWithCollectorIdApi(pickupRequest.collectorId as string)
                    setFeedback(result.review)
                }
            } catch (error) {
                console.error("Error checking feedback:", error)
            }
        }

        checkIfUserReviewed()
    }, [pickupRequest, role])


    return (
        <>
            {pickupRequestLoading ? <ComponentSpinner /> :
                <div className='flex flex-col gap-8  '>
                    <div >
                        <span className='text-sm'>Request ID: </span>
                        <span className='opacity-50'>{pickupRequest?._id}</span>
                    </div>

                    <div className='flex justify-between'>

                        <div className=''>
                            <Address address={pickupRequest?.address!} />
                        </div>

                        <div>
                            <div className='mb-5 tracking-widest text-center'>
                                <span className='opacity-50 text-lg '>Type:</span> &nbsp;
                                <span className='uppercase font-bold'>{pickupRequest?.type}</span>
                            </div>
                            {pickupRequest?.type === 'on-demand' ? pickupRequest?.wasteTypes.map(waste => (
                                <div className='mb-3'>
                                    <SingleWasteTypeAndWeight key={waste.name} waste={waste} />
                                </div>
                            )) :
                                <></>
                                // <ActiveSubscriptionCard subscription={} />
                            }
                        </div>

                        <div className='grid grid-cols-2 gap-x-10'>
                            <div>
                                <div className='mb-3'>Created At Date & Time</div>
                                <div className='opacity-50 flex flex-col gap-2'>
                                    <div><CalendarDays className='inline' /> &nbsp; <span >{new Date(pickupRequest?.createdAt!).toLocaleDateString()}</span></div>
                                    <div><Clock9 className='inline' /> &nbsp; <span>{new Date(pickupRequest?.createdAt!).toLocaleTimeString()}</span></div>
                                </div>
                            </div>

                            <div>
                                <div className='mb-3'>Assigned Date & Time</div>
                                <div className='opacity-50 flex flex-col gap-2'>
                                    <div><CalendarDays className='inline' /> &nbsp; {pickupRequest?.assignedAt ? <span>{new Date(pickupRequest.assignedAt).toLocaleDateString()}</span> : <span>-</ span>}</div>
                                    <div><Clock9 className='inline' /> &nbsp; {pickupRequest?.assignedAt ? <span>{new Date(pickupRequest.assignedAt).toLocaleTimeString()}</span> : <span>-</ span>}</div>
                                </div>
                            </div>

                            <div>
                                <div className='mb-3'>Completed Date & Time</div>
                                <div className='opacity-50 flex flex-col gap-2 '>
                                    <div><CalendarDays className='inline' /> &nbsp; {pickupRequest?.completedAt ? <span>{new Date(pickupRequest.completedAt).toLocaleDateString()}</span> : <span>-</ span>}</div>
                                    <div><Clock9 className='inline' /> &nbsp; {pickupRequest?.completedAt ? <span>{new Date(pickupRequest.completedAt).toLocaleTimeString()}</span> : <span>-</ span>}</div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='flex justify-between items-center'>
                        {role && role === 'collector' ?
                            <div>
                                <div className='mb-5 font-medium'>User Information</div>
                                <PersonalInfoCard userName={pickupRequest?.name!} mobile={pickupRequest?.mobile!} email={pickupRequest?.email!} />
                            </div> :
                            <div>
                                <div className='mb-5 font-medium'>Collector Information</div>
                                <PersonalInfoCard userName={pickupRequest?.collectorName!} mobile='9090909090' email='' />
                            </div>
                        }
                        <div className='flex-1 px-3'>
                            <PickupRequestProgressBar status={pickupRequest?.status!} />
                        </div>

                        <div className='w-xs '>
                            <div className='mb-5'>Payment Information</div>

                            <div className='[&>*]:w-full [&>*]:flex [&>*]:justify-between [&>*]:mb-3 border-1 border-gray-500 rounded-lg px-8 py-5 shadow-lg'>
                                <div className=''>
                                    <span>Total Amount To Pay</span>
                                    <span>{pickupRequest?.totalAmount}</span>
                                </div>

                                <div>
                                    <span>Total Amount Paid</span>
                                    <span>{pickupRequest?.paidAmount}</span>
                                </div>

                                <div>
                                    <span>Payment Status</span>
                                    <span className={`${pickupRequest?.paymentStatus === 'pending' ? 'text-blue-500' : pickupRequest?.paymentStatus === 'accepted' ? 'text-accent2' : 'text-red-500'}`}>{pickupRequest?.paymentStatus}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {pickupRequest?.status === 'cancelled' &&
                        <div className='bg-red-500 rounded-sm p-2'>
                            <div>{role === pickupRequest.cancellation?.cancelledBy ? 'You' : pickupRequest.cancellation?.cancelledBy} the request because {pickupRequest.cancellation?.reason}</div>
                            <span>Description: {pickupRequest.cancellation?.description ? pickupRequest.cancellation?.description : '-'}</span>
                        </div>
                    }

                    <div className='text-end [&>*]:px-4 [&>*]:py-2 [&>*]:rounded-md [&>*]:cursor-pointer mt-10'>
                        {role === 'resident' && pickupRequest?.status === 'completed' && (
                            <button onClick={handleAddEditModalOpen} className='bg-blue-500 hover:bg-blue-400'>{feedback ? 'Update Feedback About the Collector' : 'Add Your Feedback About the Collector'}</button>
                        )}

                        {pickupRequest?.status !== 'completed' && pickupRequest?.status !== 'cancelled' ? <button onClick={handleCancelModalOpen} className='bg-red-500 hover:bg-red-400'>Cancel Request</button> : <></>}

                        {pickupRequest?.status === 'accepted' || pickupRequest?.status === 'confirmed' ?
                            <div className='relative inline ml-10'>
                                <button onClick={handleChatOpen} className='cursor-pointer '>
                                    <MessageCircle className='inline text-4xl text-blue-400 ' />
                                </button>
                                {chatModal && (
                                    <>
                                        <div
                                            className="fixed inset-0 bg-opacity-30 flex justify-center items-center"
                                            onClick={handleChatClose}
                                        ></div>
                                        <div className="absolute bottom-3 right-10 z-50 bg-white text-secondary rounded-sm">
                                            <ChatModal participant={pickupRequest.collectorId as string} participantName={pickupRequest.collectorName as string} />
                                        </div>
                                    </>
                                )}

                            </div> : <></>
                            }

                    </div>
                </div >

            }
            {addEditModal && <FeedBackAddEditModal onClose={handleAddEditModalClose} mode={feedback ? 'edit' : 'add'} review={feedback ? feedback : undefined} setReview={setFeedback} type='collector' collectorId={pickupRequest?.collectorId as string} />}
            {cancelModal && <CancelPickupRequestModal onClose={handleCancelModalClose} pickupRequestId={pickupRequest?._id as string} />}
        </>
    )
}

export default SinglePickupRequestComp