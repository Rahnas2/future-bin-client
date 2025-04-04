import React from 'react'
import { GiNothingToSay } from "react-icons/gi";
type Props = {
    type: 'all' | 'pending' | 'completed' | 'cancelled'
}

const EmptyCollections = (props: Props) => {
  return (
    <div className='flex gap-8 h-100 w-4xl items-center justify-center bg-seconday rounded-2xl text-4xl text-accent2'>
        <GiNothingToSay className='inline text-8xl '/>
        <div>No {props.type !== 'all' ? props.type + ' works': "Collections" }</div>
    </div>
  )
}

export default EmptyCollections