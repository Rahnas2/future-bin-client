import { withdrawBalanceCollectorApi } from '@/api/collectorServices'
import ButtonSpinner from '@/components/common/ButtonSpinner'
import { Eye, EyeOff, Rocket } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    balance: number,
    onBalanceChange: (balance: number) => void
}

const Wallet: React.FC<Props> = ({ balance, onBalanceChange }) => {

    const [showBalance, setShowBalance] = useState(false);
    const [withdrawing, setWithdrawing] = useState(false)

    const toggleBalance = () => {
        setShowBalance(!showBalance);
    };

    const handleWithdrawBalance = async () => {
        // if (balance < 100) return toast.error('minimum withdraw amount is 100')

        try {
            setWithdrawing(true)
            const result = await withdrawBalanceCollectorApi(balance)

            const payoutAmount = result.amount / 100
            const newBalance = balance - payoutAmount
            
            onBalanceChange(newBalance)
            toast.error('success')
        } catch (error: any) {
            console.error('error withdraw balance ', error)
            error?.response?.data.message ? toast.error(error.response.data.message) : toast.error('somethign went wrong')
        } finally {
            setWithdrawing(false)
        }
    }


    return (
        <div className='border border-gray-500 w-fit py-6 pl-5 pr-20 rounded-md shadow-sm '>
            <h5 className='mb-4'>Account Balance</h5>
            <div className='flex gap-3 mb-3'>
                <span>₹</span>
                <span>{showBalance ? balance.toLocaleString() : '*****'}</span>
                <div onClick={toggleBalance} className="cursor-pointer">
                    {showBalance ?
                        <EyeOff className='w-4 h-4' /> :
                        <Eye className='w-4 h-4' />
                    }
                </div>
            </div>

            <div>
                <button disabled={withdrawing} onClick={handleWithdrawBalance} className='flex items-center bg-accent2 text-seconday font-medium px-8 py-1 rounded-sm cursor-pointer'>
                    {withdrawing ? <ButtonSpinner/>: <><Rocket className='w-4 h-4 mr-2' /><span>Withdraw</span></> }
                   
                    </button>
            </div>
        </div>
    )
}

export default Wallet