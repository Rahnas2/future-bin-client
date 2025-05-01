import React, { useEffect, useState } from 'react'
import { pickupRequestType } from '../../../types/PickupRequest'
import { fetchPickupRequestHistoryApi } from '../../../api/userService'

import UserRequestHistoryTabs from './UserRequestHistoryTabs'
import UserRequestHistoryTable from './UserRequestHistoryTable'
import { pickupRequestStatusType } from '@/types/pickupRequestStatus'

type Props = {}

const UserPickupRequestComp = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tab, setTab] = useState<'all' | pickupRequestStatusType>('all')

    const [requests, setRequests] = useState<pickupRequestType[] | []>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                const result = await fetchPickupRequestHistoryApi(tab, currentPage, 10)
                setRequests(result.requests)
                // setFilterredRequest(result.requests)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log('error fetching request history')
            }
        }
        fetchRequestHistory()
    }, [tab])



    const handleTabChange = (tab: 'all' | pickupRequestStatusType) => {
        setTab(tab)
    }

    return (
        <div>
            <div className='text-lg font-medium mb-5'>Requests</div>
            <UserRequestHistoryTabs
                currentTab={tab}
                setTab={handleTabChange}
                requestHistory={requests}
            />

            {
                isLoading ? <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent2"></div>
                </div> : requests.length === 0 ? <div className="flex justify-center items-center h-64 text-gray-500">
                    <p>No requests found</p>
                </div> :
                    <>
                        <UserRequestHistoryTable
                            loading={isLoading}
                            reqeustHistory={requests}
                        />
                    </>

            }
        </div>
    )
}

export default UserPickupRequestComp