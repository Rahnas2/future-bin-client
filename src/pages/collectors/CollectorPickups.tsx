import OnDemandPickups from '@/components/collectors/On-demand/OnDemandPickups'
import CollectorActiveSubscriptions from '@/components/collectors/Subscription/CollectorActiveSubscriptions'
import { useState } from 'react'


const CollectorPickups = () => {

    const [tab, setTab] = useState<'on-demand' | 'subscription'>('on-demand')

    return (
        <div className='flex min-h-lvh'>
            {/* <SideBar role='collector' /> */}

            <div className="bg-primary md:mt-10 md:mr-5 px-4 py-10 md:py-5 rounded-t-2xl flex-1 ">

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