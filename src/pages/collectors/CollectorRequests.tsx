import { useEffect, useState } from 'react'
import CollectorNav from '../../components/collectors/CollectorNav'
import { getSocket } from '../../services/socket'
import toast from 'react-hot-toast'
import { OnDemandPickupRequestType, SubscriptionPickupRequestType } from '../../types/PickupRequest'
import { fetchNearbyRequestsApi } from '../../api/collectorServices'


import OnDemandRequests from '../../components/collectors/OnDemandRequests'
import SubscriptionRequests from '../../components/collectors/SubscriptionRequests'
import { fetchPickupRequestById } from '@/api/pickupRequest'


type Props = {}

const CollectorRequests = (props: Props) => {

  const [tab, setTab] = useState<'on-demand' | 'subscription'>('on-demand')

  const socket = getSocket()
  const [onDemandRequests, setOnDemandRequests] = useState<OnDemandPickupRequestType[] | []>([])
  const [subscriptionRequests, setSubscriptionRequests] = useState<SubscriptionPickupRequestType[] | []>([])

  const [declinedIds, setDeclineIds] = useState<string[]>(
    JSON.parse(localStorage.getItem('pickupRequestDeclineIds') || '[]')
  )

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = await fetchNearbyRequestsApi()

        if(!result.requests.length) return 

        setOnDemandRequests(result.requests.filter((req: OnDemandPickupRequestType) => req.type === 'on-demand' && !declinedIds.includes(req._id as string)))
        setSubscriptionRequests(result.requests.filter((req: SubscriptionPickupRequestType) => req.type === 'subscription' && !declinedIds.includes(req._id as string)))
      } catch (error) {
        console.log('error in collector request page ', error)
      }
    }
    fetchRequests()
  }, [])

  useEffect(() => {

    socket.on('new-request', async (id) => {
      try {

        const result = await fetchPickupRequestById(id)

        const type = result.request.type
        if (type === 'on-demand') {
          setOnDemandRequests([result.request, ...onDemandRequests])
        } else {
          setSubscriptionRequests([result.request, ...subscriptionRequests])
        }

        toast.success(`new pickp request ${id}`)

      } catch (error) {
        console.log('error fetching socket request details')
      }

    })
    return () => { socket.off('new-request'); }

  }, [socket])

  return (
    <div className='flex'>
      <CollectorNav />
      <div className="bg-primary my-10 mr-10 rounded-t-2xl px-4 py-4 flex-1 ">

        {/* collector requests nav */}
        <div className='flex gap-10 justify-center mt-6'>
          <span onClick={() => setTab('on-demand')} className={`cursor-pointer ${tab === 'on-demand' ? 'border-b border-accent2 pb-1' : ''}`}>on-demand pickups</span>
          <span onClick={() => setTab('subscription')} className={`cursor-pointer ${tab === 'subscription' ? 'border-b border-accent2 pb-1' : ''}`}>subscriptions</span>
        </div>

        <div className='mt-20  px-4 py-4 rounded-lg'>
          <div>Pending Requests</div>

          {tab === 'on-demand' && <OnDemandRequests
            requests={onDemandRequests}
            setRequests={setOnDemandRequests}
            setDeclineIds={setDeclineIds}
          />}
          {tab === 'subscription' && <SubscriptionRequests
            requests={subscriptionRequests}
            setRequests={setSubscriptionRequests}
            setDeclineIds={setDeclineIds}
          />}


        </div>

      </div>
    </div>
  )
}

export default CollectorRequests