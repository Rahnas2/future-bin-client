import React from 'react'
import SideNav from '../../components/UserDash/SideNav'
import UserPickupRequestComp from '../../components/User/Requests/UserPickupRequestComp'

type Props = {}

const UserPickupRequestHsitory = (props: Props) => {
  return (
    <div className="md:bg-seconday flex justify-center md:block flex-1 md:py-15 md:px-8  rounded-md">
        <UserPickupRequestComp />
    </div>
  )
}

export default UserPickupRequestHsitory