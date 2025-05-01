import { TransactionType } from '@/types/transaction';
import React, { useState } from 'react'
import Pagination from '../Pagination';

import ComponentSpinner from '../ComponentSpinner';
import { fetchTransactiosHistory } from '@/api/transactionsService';



const Transactions = () => {

    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useState(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true)
                const result = await fetchTransactiosHistory(currentPage, 10)
                setTransactions(result.transactions)
            } catch (error) {
                console.error('error fetching transactins ', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTransactions()
    })

    if (isLoading) return <ComponentSpinner />

    if (!transactions.length) return <div className='flex w-full items-center justify-center opacity-50'>Not Transactions Found</div>

    return (
        <>
            <div className='rounded-md border border-gray-500 mb-5 shadow-2xl'>
                <table className="table px-4 py-8 w-full min-w-[600px]">
                    <thead className="h-15">
                        <tr className="border-b border-b-gray-500 opacity-50 px-6">
                            <th className="hidden md:block pl-6 p-3 text-left ">#</th>
                            <th className="p-3 text-left font-light">Transaction ID</th>
                            <th className="p-2 md:p-3 text-left font-light ">Date</th>
                            <th className="md:p-3 text-left font-light">Amount</th>
                            <th className="md:p-3 text-left font-light">Type</th>
                            <th className="md:p-3 text-left font-light">Status</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {transactions.map((req: TransactionType, index: number) => (
                            <tr key={req.paymentId} className="border-t border-t-gray-500 px-6">
                                <td className="hidden md:block md:pl-6 md:p-3">{index + 1}</td>
                                <td className="p-3">
                                    <span className="hidden md:inline">{req.paymentId}</span>
                                    <span className="md:hidden">
                                        {req.paymentId.slice(0, 6)}...{req.paymentId.slice(-4)}
                                    </span>
                                </td>
                                <td className="p-2  md:p-3">
                                    <span className='hidden md:inline'>{new Date(req.createdAt).toDateString()}</span>
                                    <span className='md:hidden'>{new Date(req.createdAt).toLocaleDateString()}</span>
                                </td>
                                <td className="p-2 md:p-3">{req.amount}</td>
                                <td className="p-2 md:p-3">{req.type}</td>
                                <td className="p-2 md:p-3">{req.paymentStatus}</td>

                            </tr>
                        ))}
                    </tbody>
                </table >

            </div >

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
    )
}

export default Transactions