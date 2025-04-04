import React from 'react'
import SideNav from '../../components/UserDash/SideNav'
import UserPickupRequestComp from '../../components/User/Requests/UserPickupRequestComp'

type Props = {}

const UserPickupRequestHsitory = (props: Props) => {
  return (
   <div className="flex gap-4 px-10">
    <SideNav /> 
    <div className="bg-seconday flex-1 py-15 px-8  rounded-md">
        <UserPickupRequestComp />
    </div>
   </div>
  )
}

export default UserPickupRequestHsitory