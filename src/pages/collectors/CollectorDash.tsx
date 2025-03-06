import React from 'react'
import CollectorNav from '../../components/collectors/CollectorNav'

type Props = {}

const CollectorDash = (props: Props) => {
  return (
    <div className='flex'>
      <CollectorNav />
      <div>Dash board</div>
    </div>
  )
}

export default CollectorDash