import React from 'react'
import CollectorNav from '../../components/collectors/CollectorNav'
import CollectorDashComp from '@/components/collectors/Dash/CollectorDashComp'
import SideBar from '@/components/Sidebar/SideBar'

type Props = {}

const CollectorDash = (props: Props) => {
  return (
    <div className='flex'>
       <CollectorDashComp />  
    </div>
  )
}

export default CollectorDash