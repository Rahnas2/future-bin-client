import React from 'react'
import CollectorNav from '../../components/collectors/CollectorNav'
import CollectorDashComp from '@/components/collectors/Dash/CollectorDashComp'

type Props = {}

const CollectorDash = (props: Props) => {
  return (
    <div className='flex'>
      <CollectorNav />

       <CollectorDashComp />
       
    </div>
  )
}

export default CollectorDash