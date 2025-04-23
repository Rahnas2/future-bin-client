import React from 'react'
import MyEarningsSummary from './MyEarningsSummary'
import { ArrowDownLeft, HandCoins, Podcast, Truck } from 'lucide-react'
import Wallet from './Wallet'
import Transactions from '@/components/common/Payment/Transactions'

type Props = {}

const MyEarningsComponent = (props: Props) => {
    return (
        <div className=''>

            {/* Earnings summary */}
            <div className='flex gap-5 justify-between mb-20'>
                <MyEarningsSummary Icon={HandCoins} text1='Total Earnings' text2={'8'} />
                <MyEarningsSummary Icon={Truck} text1='On-demand Earnings' text2={'3'} />
                <MyEarningsSummary Icon={Podcast} text1='Subscription Earnings' text2={'7'} />
                <MyEarningsSummary Icon={ArrowDownLeft} text1='Last Payment Received' text2={'89/89/89'} />
            </div>

            <div className='flex gap-5'>
                {/* wallet  */}
                <Wallet />

                {/* transactions hitory */}
                <Transactions role='collector' />
            </div>

        </div>

    )
}

export default MyEarningsComponent