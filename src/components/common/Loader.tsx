import React from 'react'


import SyncLoader from "react-spinners/SyncLoader";

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='h-lvh flex items-center justify-center'>
    <SyncLoader
        color='#5EEB5B'
        // loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loader