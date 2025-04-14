import React, { useEffect, useState } from 'react'
import { OnDemandPickupRequestType, pickupRequestType, SubscriptionPickupRequestType } from '../../types/PickupRequest'
import { CiLocationArrow1 } from 'react-icons/ci'
import { GiPathDistance } from 'react-icons/gi'
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io'
import { IoChatbox } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux/slices'
import { acceptPickupRequestApi } from '../../api/collectorServices'
import toast from 'react-hot-toast'
import ChatModal from './ChatModal'
import { request } from 'http'
import { useNavigate } from 'react-router-dom'
import { calculateDistance } from '@/utils/calculateDistance'
import { getPosition } from '@/utils/getCurrentPosition'

type Props = {
    request: pickupRequestType
    onAction: (requestid: string) => void
    onDecline: (requestId: string) => void
}

//get relative time function
const getRelativeTime = (createdAt: string): string => {
    const diff = Date.now().valueOf() - new Date(createdAt).valueOf()

    const seconds = Math.floor(diff / 1000)
    if (seconds < 60) {
        return 'just now'
    }

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    }

    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    }
    const days = Math.floor(hours / 24)
    return `${days} day${days !== 1 ? 's' : ''} ago`;
}


const PickupReqeustCard = (props: Props) => {

    const { collector } = useSelector((state: IRootState) => state.collector)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [approximateDistance, setApproximateDistance] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        const findApproximateDistance = async () => {
            try {
                const response = await getPosition()
                console.log('response position ', response)
                const distance = calculateDistance(props.request.address.location.coordinates[1], props.request.address.location.coordinates[0], response.latitude, response.longitude)
                setApproximateDistance(Number(distance.toFixed(2)))
            } catch (error) {
                console.log('error calculating distance ', error)
            }

        }
        findApproximateDistance()

    }, [])

    //accept request
    const handleRequestAccept = async () => {
        try {
            const name = collector?.firstName + ' ' + collector?.lastName
            const result = await acceptPickupRequestApi(props.request._id as string, name)
            props.onAction(props.request._id as string)
            toast.success(result.message)
        } catch (error) {
            console.log('error ', error)
        }
    }

    //ignore request
    const handleRequestDecline = async () => {
        props.onAction(props.request._id as string)
        props.onDecline(props.request._id as string)
    }

    //hnadle chat modal open
    const handleChatOpen = () => {
        setIsChatOpen(true)
    }

    //handle chat modal close
    const hanldeChatClose = () => {
        setIsChatOpen(false)
    }

    //navigate to map page
    const navigateMap = (coordinates: [number, number]) => {
        navigate('/map', { state: { destination: coordinates.reverse() } })
    }

    return (
        <>
            {
                <div className='w-sm px-5 py-6 border border-gray-700 rounded-xl bg-seconday shadow-2xl'>


                    <div className='opacity-50'>{getRelativeTime(props.request.createdAt as string)}</div>

                    <div className='text-end'>
                        <span className='text-accent2 mr-2'>₹ 30</span>
                        <span className='opacity-50'>per pickup</span>
                    </div>

                    <div className='font-bold mb-5'>{props.request.name}</div>

                    <div className='mb-3'>
                        {props.request.type === 'on-demand' ?
                            <>
                                <span className='opacity-50'>Types:&nbsp;&nbsp;</span>
                                {
                                    props.request.type === 'on-demand' && props.request.wasteTypes.map((type, index) => (
                                        <span key={index} className="text-sm font-medium">{type.name},&nbsp;&nbsp;</span>
                                    ))
                                }
                            </> :
                            <>
                                <span className='opacity-50'>Subcription:&nbsp;&nbsp;</span>
                                <span>{props.request.subscriptionPlanName}</span>
                            </>
                        }
                    </div>

                    <div className='mb-3'>
                        <span className='opacity-50'>Approximate Weight:&nbsp;&nbsp;</span>
                        <span className='text-sm font-medium'>{props.request.type === 'on-demand' && props.request.totalWeight}&nbsp; kg</span>
                    </div>

                    <div className='mb-10'>
                        <span className='opacity-50'>Transportation: &nbsp;&nbsp;</span>
                        <span className='text-sm font-medium'>15</span>
                    </div>

                    <button onClick={() => navigateMap(props.request.address.location.coordinates)} className='mb-2 cursor-pointer'>
                        <span className='font-black'><CiLocationArrow1 className='inline text-2xl font-bold' /></span>
                        <span className='opacity-50 ml-2'>{props.request.address.city + ', ' + props.request.address.district}</span>
                    </button>

                    <div>
                        <span><GiPathDistance className='inline text-2xl ' /></span>
                        <span className='opacity-50 ml-2'>Approximate {approximateDistance} km</span>
                    </div>

                    <div className='flex mt-6 items-center gap-4'>
                        <div onClick={handleRequestAccept} className='bg-accent px-6 py-2 rounded-4xl font-bold cursor-pointer'>
                            <span><IoMdCheckmarkCircleOutline className='inline text-xl' /></span>
                            <span className='ml-2 '>Accept</span>
                        </div>
                        <div onClick={handleRequestDecline} className='bg-red-700 px-6 py-2 rounded-4xl font-bold cursor-pointer'>
                            <span><IoMdCloseCircleOutline className='inline text-2xl' /></span>
                            <span className='ml-2 cursor-pointer'>Ignore</span>
                        </div>

                        <div className='relative'>
                            <div onClick={handleChatOpen} className='cursor-pointer'>
                                <IoChatbox className='inline text-4xl text-blue-500' />
                            </div>

                            {isChatOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-opacity-30 flex justify-center items-center "
                                        onClick={hanldeChatClose}
                                    ></div>
                                    <div className="absolute bottom-15 right-0  z-50 bg-white text-seconday rounded-sm">
                                        <ChatModal participant={props.request.userId as string} />
                                    </div>
                                </>

                            )}
                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default PickupReqeustCard