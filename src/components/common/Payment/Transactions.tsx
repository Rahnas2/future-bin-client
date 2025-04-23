import { TransactionType } from '@/types/transaction';
import React, { useState } from 'react'
import Pagination from '../Pagination';
import { fetchTransactiosForUserApi } from '@/api/userService';
import ComponentSpinner from '../ComponentSpinner';

type Props = {
    role: string
}

const Transactions: React.FC<Props> = ({ role }) => {

    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useState(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true)
                const result = await fetchTransactiosForUserApi()
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
                <table className="table  px-4 py-8  w-full">
                    <thead className="h-15">
                        <tr className="border-b border-b-gray-500 opacity-50 px-6">
                            <th className="pl-6 p-3 text-left ">#</th>
                            <th className="p-3 text-left font-light">Transaction ID</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {transactions.map((req: TransactionType, index: number) => (
                            <tr key={req.paymentId} className="border-t border-t-gray-500 px-6">
                                <td className="pl-6 pr-3">{index + 1}</td>
                                <td className="p-3">{req.paymentId}</td>
                                <td className="p-3">{new Date(req.createdAt).toDateString()}</td>
                                <td className="p-3">{req.amount}</td>
                                <td className="p-3">{req.type}</td>
                                <td className="p-3">{req.paymentStatus}</td>

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