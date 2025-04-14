
import AdminSearch from '@/components/Admin/AdminSearch'
import TableHead from '../TableHead'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { fetchCollectors } from '@/redux/slices/adminSlice'
import UsersData from '../UsersData'
import Pagination from '@/components/common/Pagination'



const ApprovedCollectors = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchApprovedCollectors = async () => {
      const response = await dispatch(fetchCollectors({approvedStatus: 'approved', limit: currentPage, page: 10})).unwrap()
      setTotalPages(response.totalPages);
    };
    fetchApprovedCollectors();
  }, [currentPage, dispatch]);

  return (
    <div className="bg-seconday py-6 rounded-xl">
      <div className="font-bold mb-8 px-6">All Collectos</div>

      <AdminSearch />

      <table className='w-full'>
        <TableHead status={true} />
        <UsersData role='collector' status={true} />
      </table>

      <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>


    </div>
  )
}

export default ApprovedCollectors