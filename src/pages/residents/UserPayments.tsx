import Transactions from '@/components/common/Payment/Transactions'
import SideNav from '@/components/UserDash/SideNav'
import { IRootState } from '@/redux/slices'
import { stat } from 'fs'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const UserPayments = (props: Props) => {

    const { role } = useSelector((state: IRootState) => state.auth)
    return (
            <div className="flex-1 py-15 px-8 bg-seconday rounded-lg shadow-sm">

                <div>
                    <h2 className='font-medium text-lg mb-6'>Transactions</h2>
                    <Transactions />
                </div>
            </div>
    )
}

export default UserPayments