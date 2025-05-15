
import AdminSearch from '@/components/Admin/AdminSearch'
import TableHead from '../TableHead'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { fetchCollectors } from '@/redux/slices/adminSlice'
import UsersData from '../UsersData'
import Pagination from '@/components/common/Pagination'
import EmptyUsers from '../EmptyUsers'
import { Truck } from 'lucide-react'



const ApprovedCollectors = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSerachTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchApprovedCollectors = async () => {
      const response = await dispatch(fetchCollectors({ approvedStatus: 'approved', page: currentPage, limit: 10, search: searchTerm })).unwrap()
      setTotalPages(response.totalPages);
    };
    fetchApprovedCollectors();
  }, [currentPage, dispatch, debouncedTerm]);

  //debouce 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm)
      setCurrentPage(1)
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);


  //handle search
  const handleSearch = (val: string) => {
    setSerachTerm(val)
  }

  return (
    <div className="md:bg-seconday py-6 rounded-xl">
      <div className="font-medium text-lg mb-8 px-6">All Collectors</div>

      {totalPages === 0 && !searchTerm ? <EmptyUsers Icon={Truck } text='No Approval Collectors' /> :
        <>
          <AdminSearch onSearch={handleSearch} />

          <table className='w-full'>
            <TableHead status={true} />
            <UsersData role='collector' status={true} />
          </table>
        </>
      }
      {totalPages > 0 && <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>}


    </div>
  )
}

export default ApprovedCollectors