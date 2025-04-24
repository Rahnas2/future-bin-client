
import CollectorActiveSubscriptions from '@/components/collectors/Subscription/CollectorActiveSubscriptions'


type Props = {}

const CollectorSubscriptions = (props: Props) => {
  return (
    <div className='flex min-h-screen'>
      {/* <SideBar role='collector' /> */}

      <div className="bg-primary my-10 mr-5 rounded-t-2xl px-4 py-4 flex-1 ">
        <div className="border-b border-gray-700 p-6 mb-5">
          <h2 className='text-lg font-semibold '>Active Subscriptions</h2>
        </div>
        <CollectorActiveSubscriptions />
      </div>


    </div>
  )
}

export default CollectorSubscriptions