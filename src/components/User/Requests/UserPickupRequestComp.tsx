import React, { useEffect, useState } from 'react'
import { pickupRequestType } from '../../../types/PickupRequest'
import { fetchPickupRequestHistoryApi } from '../../../api/userService'

import UserRequestHistoryTabs from './UserRequestHistoryTabs'
import UserRequestHistoryTable from './UserRequestHistoryTable'
import { pickupRequestStatusType } from '@/types/pickupRequestStatus'
import ComponentSpinner from '@/components/common/ComponentSpinner'
import Pagination from '@/components/common/Pagination'

type Props = {}

const UserPickupRequestComp = (props: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tab, setTab] = useState<'all' | pickupRequestStatusType>('all')

    const [requests, setRequests] = useState<pickupRequestType[] | []>([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                setIsLoading(true)
                const result = await fetchPickupRequestHistoryApi(tab, currentPage, 10)
                setRequests(result.requests)
                setTotalPages(result.totalPages)
            } catch (error) {
                console.error('error fetching request history', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchRequestHistory()
    }, [tab, currentPage])



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
                isLoading ? <ComponentSpinner /> :
                    requests.length === 0 ? <div className="flex justify-center items-center h-64 text-gray-500">
                        <p>No requests found</p>
                    </div> :
                        <div className='flex flex-col gap-5'>
                            <UserRequestHistoryTable reqeustHistory={requests} />
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </div>
            }
        </div>
    )
}

export default UserPickupRequestComp