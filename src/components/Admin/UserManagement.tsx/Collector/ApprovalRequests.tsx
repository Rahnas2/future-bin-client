import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AdminSearch from '@/components/Admin/AdminSearch'
import TableHead from '../TableHead'
import { AppDispatch } from '@/redux/store'
import { fetchCollectors } from '@/redux/slices/adminSlice'
import UsersData from '../UsersData'
import Pagination from '@/components/common/Pagination'
import EmptyUsers from '../EmptyUsers'
import { GitPullRequest } from 'lucide-react'


const ApprovalRequests = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSerachTerm] = useState("")
    const [debouncedTerm, setDebouncedTerm] = useState("");

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const fetchCollectorsApprovalRequests = async () => {
            const response = await dispatch(fetchCollectors({ approvedStatus: 'pending', page: currentPage, limit: 10, search: searchTerm })).unwrap()
            setTotalPages(response.totalPages);
        };
        fetchCollectorsApprovalRequests();
    }, [currentPage, dispatch, debouncedTerm]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm)
            setCurrentPage(1)
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleSearch = (val: string) => {
        setSerachTerm(val)
    }

    return (
        <div className="md:bg-seconday py-6 rounded-xl">

            <div className="font-medium text-lg mb-8 px-6">All Requests</div>

            {totalPages === 0 && !searchTerm ? <EmptyUsers Icon={GitPullRequest} text='No Approval Requests' /> : 
            <>
            <AdminSearch onSearch={handleSearch}/>

            <table className='w-full'>
                <TableHead status={true} />
                <UsersData role='collector' status={false} />
            </table>
            </>
            }
            {totalPages > 0 && <div className="mt-6"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /></div>}



        </div>
    )
}

export default ApprovalRequests