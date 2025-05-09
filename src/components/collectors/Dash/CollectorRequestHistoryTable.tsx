import { pickupRequestType } from '@/types/PickupRequest'
import React from 'react'
import { MdLocationOn } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/common/Pagination';
import { PaginationState } from '@/types/PaginationState';

type Props = {
    collectionHistory: pickupRequestType[]
    type: 'all' | 'pending' | 'completed' | 'cancelled'
    pagination: PaginationState
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

const CollectorRequestHistoryTable = (props: Props) => {

    const navigate = useNavigate()

    //navigate to map page
    const navigateMap = (coordinates: [number, number]) => {
        navigate('/map', { state: { destination: coordinates.reverse() } })
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= props.pagination.totalPages) {
          props.setPagination((prev) => ({ ...prev, currentPage: newPage }));
        }
      };


    return (
        <div>
            <table className="table bg-seconday rounded-lg px-4 py-10 shadow-2xl w-4xl ">
                <thead className="h-15">
                    <tr className="border-b border-b-gray-500 opacity-50 px-6">
                        <th className="pl-6 p-3 text-left ">#</th>
                        <th className="p-3 text-left font-light">User Name</th>
                        <th className="p-3 text-left">Mobile</th>
                        <th className="p-3 text-left">ServiceType</th>
                        {props.type === 'all' && <th className="p-3 text-left">Status</th>}
                        <th className="p-3 text-left">Location</th>
                    </tr>
                </thead>
                <tbody className="">
                    {props.collectionHistory.map((req: pickupRequestType, index: number) => (
                        <tr key={req._id} className="border-t border-t-gray-500 px-6">
                            <td className="pl-6 pr-3">{index + 1}</td>
                            <td className="p-3">{req.name}</td>
                            <td className="p-3">{req.mobile}</td>
                            <td className="p-3">{req.type}</td>
                            {props.type === 'all' &&
                                <td className="p-3">{req.status}</td>
                            }
                            <td className="p-3">
                                <div className='flex items-center gap-5'>
                                    <div>{req.address.district + ' ' + req.address.city}</div>
                                    <button onClick={() => navigateMap(req.address.location.coordinates)} className='flex flex-col justify-center items-center gap-1 cursor-pointer'>
                                        <MdLocationOn className="text-red-600 text-2xl " />
                                        <span className="text-xs opacity">View Map</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <Pagination currentPage={ props.pagination.currentPage} totalPages={props.pagination.totalPages } onPageChange={ handlePageChange } />

        </div >
    )
}

export default CollectorRequestHistoryTable