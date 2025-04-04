import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { pickupRequestType } from '@/types/PickupRequest'

type Props = {
    loading: boolean
    reqeustHistory: pickupRequestType[]
}

const UserRequestHistoryTable = (props: Props) => {
    return (
        <>
            {
                props.loading ? <div>loading...</div> :
                    <div className="rounded-lg  mt-8 shadow-2xl border border-gray-700 px-3 py-2">
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
                                    <TableRow className='h-15 hover:bg-primary'>
                                        <TableCell >{req._id?.slice(-5)}</TableCell >
                                        <TableCell >{req.type}</TableCell >
                                        <TableCell >
                                            <span className={`border rounded-full px-4 py-1 ${req.status === 'pending' ? 'text-blue-400 border-blue-400' : req.status === 'accepted' ? 'text-accent3 border-accent3' : ''}`} >{req.status}</span>
                                        </TableCell >
                                        <TableCell  >
                                            <span className={`border rounded-full px-4 py-1 ${req.paymentStatus === 'pending' ? 'text-blue-400 border-blue-400' : req.paymentStatus === 'success' ? 'text-accent2' : ''}`} >{req.paymentStatus}</span>
                                        </TableCell >
                                        <TableCell >{req.price}</TableCell >
                                    </TableRow>
                                ))
                                }
                            </TableBody>
                        </Table>
                    </div>
            }</>
    )
}

export default UserRequestHistoryTable