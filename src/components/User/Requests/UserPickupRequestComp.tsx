import React, { useEffect, useState } from 'react'
import { pickupRequestType } from '../../../types/PickupRequest'
import { fetchPickupRequestHistoryApi } from '../../../api/userService'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import UserRequestHistoryTabs from './UserRequestHistoryTabs'
import UserRequestHistoryTable from './UserRequestHistoryTable'

type Props = {}

const UserPickupRequestComp = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tab, setTab] = useState<'all' | 'pending' | 'accepted' | 'cancelled' | 'completed'>('all')

    const [allRequests, setAllRequests] = useState<pickupRequestType[] | []>([])
    const [filterredRequests, setFilterredRequest] = useState<pickupRequestType[] | []>([])

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                const result = await fetchPickupRequestHistoryApi()
                setAllRequests(result.requestHistory)
                setFilterredRequest(result.requestHistory)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log('error fetching request history')
            }
        }
        fetchRequestHistory()
    }, [])

    

    const handleTabChange = (tab: 'all' | 'pending' | 'accepted' | 'cancelled' | 'completed') => {
        setTab(tab)
    }

    const handleFilterredReqeustHistoryChange = (requests: pickupRequestType[]) => {
        setFilterredRequest(requests)
    }

    return (
        <div>
            <div className='text-xl font-bold mb-5'>Requests</div>

            <UserRequestHistoryTabs 
            currentTab={tab}
            setTab={handleTabChange}
            allRequestHistory={allRequests}
            filterredRequestHistory={filterredRequests}
            setFilterredRequestHistory={handleFilterredReqeustHistoryChange}
            />

            <UserRequestHistoryTable
                loading={isLoading}
                reqeustHistory={filterredRequests}
            />


        </div>
    )
}

export default UserPickupRequestComp