import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { pickupRequestType } from '@/types/PickupRequest'
import { useNavigate } from 'react-router-dom'

type Props = {
    loading: boolean
    reqeustHistory: pickupRequestType[]
}

const UserRequestHistoryTable = (props: Props) => {


    const navigate = useNavigate()
    const handleNavigation = (id: string) => {
        return navigate(`/pickup-reqeusts/${id}`)
    }


    if (props.loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent2"></div>
        </div>
    )

    if (!props.reqeustHistory.length) return (
        <div>No History</div>
    )

    return (
        <>
            <div className="rounded-md  mt-8 shadow-xl border border-gray-700 px-3 py-2 h-78">
                <Table className=''>
                    <TableHeader className='h-15 font-bold '>
                        <TableRow className='hover:bg-primary '>
                            <TableHead>ReqeustId</TableHead>
                            <TableHead>Service Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>
                        {props.reqeustHistory.map(req => (
                            <TableRow onClick={() => handleNavigation(req._id as string)} className='h-15 hover:bg-primary'>
                                <TableCell >{req._id?.slice(-5)}</TableCell >
                                <TableCell >{req.type}</TableCell >
                                <TableCell >
                                    <span className={`border rounded-full px-4 py-1 ${req.status === 'pending' ? 'text-blue-400 border-blue-400' : req.status === 'accepted' ? 'text-accent3 border-accent3' : ''}`} >{req.status}</span>
                                </TableCell >
                                <TableCell  >
                                    <span className={`border rounded-full px-4 py-1 ${req.paymentStatus === 'pending' ? 'text-blue-400 border-blue-400' : req.paymentStatus === 'success' ? 'text-accent2' : ''}`} >{req.paymentStatus}</span>
                                </TableCell >
                                <TableCell >{req.totalAmount}</TableCell >
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>

            </div>
        </>
    )
}

export default UserRequestHistoryTable