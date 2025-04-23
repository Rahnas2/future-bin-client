
import { fetchPickupRequestById } from '@/api/pickupRequest'
import ReqActionCompletion from '@/components/collectors/RequestAction/Complete/ReqActionCompletion'
import ReqActionManageWasteTypes from '@/components/collectors/RequestAction/Complete/ReqActionManageWasteTypes'
import ReqActionSummary from '@/components/collectors/RequestAction/Complete/ReqActionSummary'
import RequestActionPersonalInfo from '@/components/collectors/RequestAction/Complete/RequestActionPersonalInfo'
import BackBtn from '@/components/common/BackBtn'
import Loader from '@/components/common/Loader'
import { OnDemandCompleteProvider } from '@/context/OnDemandCompleteContex'
import { onDemandWasteType } from '@/types/onDemandWasteType'
import { OnDemandPickupRequestType } from '@/types/PickupRequest'
import { Scale } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {}

const CollectorOnDemandCompleted = (props: Props) => {

    const location = useLocation()
    const navigate = useNavigate()
    const { requestId } = location.state

    const [requestData, setRequestData] = useState<OnDemandPickupRequestType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getpickupRequest = async () => {
            console.log('hello')
            if (!requestId) {
                console.log('hyyy')
                navigate('collector/pickups', { replace: true });
              }
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
    }, [location , navigate])

    if (loading) return <Loader />

    return (
        <OnDemandCompleteProvider initialPickupRequest={requestData as OnDemandPickupRequestType} >

            <div className='px-4 py-4'><BackBtn /></div>

            <div className='flex flex-col columns-2 md:flex-row  px-8 py-4 gap-10 lg:gap-0 justify-between'>

                <div className='flex-1'>
                    {/* user personal informations */}
                    <RequestActionPersonalInfo />
                </div>

                <div className='flex-1 px-6'>
                    <div className='flex mb-6 text-xl'>
                        <Scale className='mr-3 text-accent2' />
                        <h1>Waste Collection Details</h1>
                    </div>

                    {/* manage waste types */}
                    <ReqActionManageWasteTypes />
                </div>

                <div className='flex-1'>
                    {/* billing information  */}
                    <ReqActionSummary />

                    {/* request complition */}
                    <ReqActionCompletion />

                </div>

            </div>
        </ OnDemandCompleteProvider>
    )
}

export default CollectorOnDemandCompleted