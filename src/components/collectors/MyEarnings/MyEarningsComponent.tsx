import React, { useEffect, useState } from 'react'

import { ArrowDownLeft, HandCoins, Podcast, Truck } from 'lucide-react'
import Wallet from './Wallet'
import Transactions from '@/components/common/Payment/Transactions'
import { collectorEarningsSummary } from '@/types/collectorEarningsSummary'
import { fetchCollectorEarningsSummaryApi } from '@/api/collectorServices'
import ComponentSpinner from '@/components/common/ComponentSpinner'
import PaymentSummaryCard from '@/components/common/Payment/PaymentSummaryCard'

type Props = {}

const MyEarningsComponent = (props: Props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [summary, setSummary] = useState<collectorEarningsSummary | null>(null)

    useEffect(() => {
        const fetchCollectorEarningsSummary = async () => {
            try {
                setIsLoading(true)
                const result = await fetchCollectorEarningsSummaryApi()
                setSummary(result.summary)
            } catch (error) {
                console.error('error fetching collector earnings ', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCollectorEarningsSummary()
    }, [])

    const handleBalanceChnage = (newBalance: number) => {
        setSummary(prev => {
            if (!prev) return prev;
            return { ...prev, walletBalance: newBalance };
        });
    }

    if (isLoading) return <ComponentSpinner />

    return (
        <div className=''>

            {/* Earnings summary */}
            <div className='flex gap-5 justify-between mb-20'>
                <PaymentSummaryCard Icon={HandCoins} text1='Total Earnings' text2={'$ ' + summary?.totalEarnings || '0'} />
                <PaymentSummaryCard Icon={Truck} text1='On-demand Earnings' text2={'$ ' + summary?.onDemandEarnings || '0'} />
                <PaymentSummaryCard Icon={Podcast} text1='Subscription Earnings' text2={'$ ' + summary?.subscriptionEarnings || '0'} />
                <PaymentSummaryCard Icon={ArrowDownLeft} text1='Last Payment Received' text2={summary?.totalEarnings ? new Date(summary.totalEarnings).toDateString() : '--'} />
            </div>

            <div className='flex justify-around'>
                {/* wallet  */}
                <Wallet balance={summary?.walletBalance || 0} onBalanceChange={handleBalanceChnage} />

                {/* transactions hitory */}
                <div>
                    <h2 className='font-medium text-lg mb-3 -mt-2'>Transactions</h2>
                    <Transactions />
                </div>

            </div>

        </div>

    )
}

export default MyEarningsComponent