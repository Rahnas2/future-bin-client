
import { fetchPickupRequestById } from '@/api/pickupRequest'
import ReqActionCompletion from '@/components/collectors/RequestAction/Complete/ReqActionCompletion'
import ReqActionManageWasteTypes from '@/components/collectors/RequestAction/Complete/ReqActionManageWasteTypes'
import ReqActionSummary from '@/components/collectors/RequestAction/Complete/ReqActionSummary'
import RequestActionPersonalInfo from '@/components/collectors/RequestAction/Complete/RequestActionPersonalInfo'
import Loader from '@/components/common/Loader'
import { OnDemandCompleteProvider } from '@/context/OnDemandCompleteContex'
import { onDemandWasteType } from '@/types/onDemandWasteType'
import { OnDemandPickupRequestType } from '@/types/PickupRequest'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'

type Props = {}

const CollectorOnDemandCompleted = (props: Props) => {

    const location = useLocation()

    const { requestId } = location.state
    const [requestData, setRequestData] = useState<OnDemandPickupRequestType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getpickupRequest = async () => {
            try {
                const response = await fetchPickupRequestById(requestId)
                setRequestData(response.request)
            } catch (error) {
                console.error('error fetching request ', error)
            } finally {
                setLoading(false)
            }
        }
        getpickupRequest()
    }, [])

    if(loading) return <Loader />

    return (
        <OnDemandCompleteProvider initialPickupRequest={requestData as OnDemandPickupRequestType} >
            <div className='flex px-4 py-4'>
                {/* user personal informations */}
                <RequestActionPersonalInfo />

                {/* manage waste types */}
                <ReqActionManageWasteTypes />

                {/* billing information  */}
                <ReqActionSummary />

                {/* request complition */}
                <ReqActionCompletion />

            </div>
        </ OnDemandCompleteProvider>
    )
}

export default CollectorOnDemandCompleted