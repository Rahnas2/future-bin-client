import MyEarningsComponent from '@/components/collectors/MyEarnings/MyEarningsComponent'
import React from 'react'

type Props = {}

const MyEarnings = (props: Props) => {
    return (
        <div className='flex min-h-screen'>
            <div className="bg-primary my-10 mr-5 rounded-t-2xl px-4 py-4 flex-1 ">

                <MyEarningsComponent />
            </div>
        </div>
    )
}

export default MyEarnings