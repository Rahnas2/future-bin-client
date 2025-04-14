import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AdminSearch from '@/components/Admin/AdminSearch'
import TableHead from '../TableHead'
import { AppDispatch } from '@/redux/store'
import { fetchCollectors } from '@/redux/slices/adminSlice'
import UsersData from '../UsersData'
import Pagination from '@/components/common/Pagination'
import { fetchCollectorsApi } from '@/api/adminServices'

type Props = {}

const ApprovalRequests = (props: Props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const fetchCollectorsApprovalRequests = async () => {
          const response = await dispatch(fetchCollectors({approvedStatus: 'pending', page: currentPage, limit: 10})).unwrap()
          setTotalPages(response.totalPages);
        };
        fetchCollectorsApprovalRequests();
      }, [currentPage, dispatch]);

    return (
        <div className="bg-seconday py-6 rounded-xl">

            <div className="font-bold mb-8 px-6">All Collectos</div>

            <AdminSearch />

            <table className='w-full'>
                <TableHead status={true} />
                <UsersData role='collector' status={false} />
            </table>

            <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>

        </div>
    )
}

export default ApprovalRequests