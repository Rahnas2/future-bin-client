import OnDemandPickups from '@/components/collectors/On-demand/OnDemandPickups'
import CollectorActiveSubscriptions from '@/components/collectors/Subscription/CollectorActiveSubscriptions'
import React, { useState } from 'react'

type Props = {}

const CollectorPickups = (props: Props) => {

    const [tab, setTab] = useState<'on-demand' | 'subscription'>('on-demand')

    return (
        <div className='flex min-h-lvh'>
            {/* <SideBar role='collector' /> */}

            <div className="bg-primary mt-10 mr-5 rounded-t-2xl px-4 py-4 flex-1 ">

                {/* pickups nav  */}
                <div className='flex gap-10 justify-center my-6'>
                    <span onClick={() => setTab('on-demand')} className={`cursor-pointer ${tab === 'on-demand' ? 'border-b border-accent2 pb-1' : ''}`}>on-demand pickups</span>
                    <span onClick={() => setTab('subscription')} className={`cursor-pointer ${tab === 'subscription' ? 'border-b border-accent2 pb-1' : ''}`}>subscriptions</span>
                </div>

                {tab === 'on-demand' && <OnDemandPickups />}
                {tab === 'subscription' && <CollectorActiveSubscriptions /> }

            </div>

        </div>
    )
}

export default CollectorPickups