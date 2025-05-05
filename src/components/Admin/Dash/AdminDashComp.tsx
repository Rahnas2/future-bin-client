import { logOut } from '@/redux/slices/authSlice'
import { AppDispatch } from '@/redux/store'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RequestSummary from './RequestSummary'
import { Banknote, CircleEllipsis, CircleX, GitPullRequestDraft, Handshake, MapPinCheckInside } from 'lucide-react'
import RequestChart from './RequestChart'
import DistrictPerformance from './DistrictPerformance'
import TopAreas from './TopAreas'
import { fetchPickupRequestAnalyticsApi, fetchPickupRequestSummaryApi } from '@/api/adminServices'
import { pickupRequestSummaryType } from '@/types/pickupRequestSummaryType'
import { pickupRequestAnalyticsType } from '@/types/pickupRequestAnalyticsType'
import ComponentSpinner from '@/components/common/ComponentSpinner'

type Props = {}

const AdminDashComp = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            await dispatch(logOut()).unwrap()
            navigate('/admin/login')
        } catch (error) {
            console.log('log out errror ', error)
        } 
    }

    const [summary, setSummary] = useState<pickupRequestSummaryType>()
    const [analytics, setAnalytics] = useState<pickupRequestAnalyticsType>()

    const [timeRange, setTimeRange] = useState("6m")

    const [fromDate, setFromDate] = useState<Date>(new Date())
    const [toDate, setToDate] = useState<Date>(new Date())

    const [loading, setIsLoading] = useState(false)



    useEffect(() => {
        const fetchSummary = async () => {
            try {
                setIsLoading(true)
                const result = await fetchPickupRequestSummaryApi()
                setSummary(result.summary)
            } catch (error) {
                console.log('error fetching request summary ', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchSummary()
    }, [])

    useLayoutEffect(() => {
        const fetchAnalytics = async () => {

            const now = new Date()

            const to = new Date(now);
            to.setHours(23, 59, 59, 999)

            let from = new Date(now)

            if (timeRange === '30d') {
                from.setDate(now.getDate() - 30)
            } else if (timeRange === '7d') {
                from.setDate(now.getDate() - 7)
            } else {
                from.setMonth(now.getMonth() - 6)
            }

            from.setHours(0, 0, 0, 0);


            setFromDate(from)
            setToDate(to)

            try {
                const result = await fetchPickupRequestAnalyticsApi(from.toISOString(), now.toISOString())
                console.log('analytics response ', result)
                setAnalytics(result.analytics)
            } catch (error) {
                console.error('error fetching analytics ', error)
            }
        }
        fetchAnalytics()
    }, [timeRange])

    if(loading) return <ComponentSpinner/>
    return (
        <div className='flex flex-col gap-10 '>

            {/* logout */}
            <div className="w-full flex justify-end"><button onClick={handleLogOut} className="text-end px-6 py-1 bg-accent rounded-sm cursor-pointer">Logout</button></div>

            {/* summary */}
            <div className='flex justify-between'>
                <RequestSummary Icon={GitPullRequestDraft} text='Total Request' count={summary?.totalRequests || 0} />

                <RequestSummary Icon={CircleEllipsis} text='Pending Request' count={summary?.pending || 0} />

                <RequestSummary Icon={Handshake} text='Accepted Request' count={summary?.accepted || 0} />

                <RequestSummary Icon={Banknote} text='Confirm Request' count={summary?.confirmed || 0} />

                <RequestSummary Icon={MapPinCheckInside} text='completed Request' count={summary?.completed || 0} />

                <RequestSummary Icon={CircleX} text='cancelled Request' count={summary?.cancelled || 0} />

            </div>

            {/* request */}
            <RequestChart timeRange={timeRange} setTimeRange={setTimeRange} data={analytics?.trends!} fromDate={fromDate} toDate={toDate} />

            <div className='flex justify-between'>

                {/* district Performace */}
                <DistrictPerformance data={analytics?.districtPerformance!} timeRange={timeRange} />

                {/* Top Areas */}
                <TopAreas data={analytics?.topCities!} timeRange={timeRange} />
            </div>

        </div>
    )
}

export default AdminDashComp