import CollectorNav from '@/components/collectors/CollectorNav'
import CollectorActiveSubscriptions from '@/components/collectors/Subscription/CollectorActiveSubscriptions'
import React from 'react'

type Props = {}

const CollectorSubscriptions = (props: Props) => {
  return (
    <div className='flex'>
      <CollectorNav />

      <div className="bg-primary my-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">
        <div className="border-b border-gray-700 p-6 mb-5">
          <h2 className='text-lg font-semibold '>Active Subscriptions</h2>
        </div>
        <CollectorActiveSubscriptions />
      </div>


    </div>
  )
}

export default CollectorSubscriptions