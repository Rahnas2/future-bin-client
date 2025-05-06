import React, { useState } from "react";
import { UserDetailModalProps } from "@/types/UserDetailModalProps";

import { IoMdClose } from "react-icons/io";
import Address from "@/components/Address";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { blockUserApi } from "@/api/adminServices";

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose, activeSubscription, totalOnDemandPickupsCount }) => {
  if (!user) return null;

  const toggleUserStatus = async () => {
    try {
      await blockUserApi(user._id)
      const message = user.isBlock ? 'ublocked' : 'blocked'
      toast.success('user ' + message + ' successfully')

      onClose()
    } catch (error) {
      console.log('toggle status error ', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-60">
      <div className="bg-primary border border-gray-500 px-5 md:px-10 py-8 md:rounded-xl max-w-[100%] max-h-[100vh] overflow-y-auto">

        <div onClick={onClose} className="font-bold text-end text-accent2 cursor-pointer"><IoMdClose className="inline" /></div>

        <div className="flex flex-col ">

          {/* top */}
          <div className="flex gap-3 md:gap-12 items-center justify-center mb-10">

            <div className="">
              {user.image ? <img className="w-22 md:w-42 h-22 md:h-42 rounded-full" src={user.image} alt="" />: <FaUserCircle className="w-32 md:w-42 h-32 md:h-42"/>}
            </div>

            <div>
              <div className="font-medium md:font-bold md:text-2xl mb-2">{user.firstName + '    ' + user.lastName}</div>
              <div className="mb-1 opacity-50">{user.email}</div>
              <div className="opacity-50">{user.mobile}</div>
            </div>
          </div>

          {/* middle */}
          <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-25">

            {/* left */}
            <div className="flex flex-col gap-4 md:gap-0 justify-evenly">
              <div className="border border-gray-600 px-4 py-10 rounded-lg shadow-2xs">
                <div className="mb-3"><span className="opacity-50">Active Subscription Plan :</span> <span className="text-white">{activeSubscription ? activeSubscription.name: 'null'}</span> </div>
                <div className="mb-3"><span className="opacity-50">Start Date :</span> <span>{activeSubscription && activeSubscription.startDate ? new Date(activeSubscription.startDate).toLocaleDateString() : '--'}</span></div>
                <div><span className="opacity-50">End Date : </span>  <span>{activeSubscription && activeSubscription.endDate  ? new Date(activeSubscription.endDate).toLocaleDateString() : '--'}</span></div>
              </div>

              <div >
                <span className="font-medium md:font-bold">Total On-demand Pickups : </span>
                <span className="md:font-bold opacity-50">{totalOnDemandPickupsCount}</span>
              </div>
            </div>

            {/* right */}
            <div>
              <Address address={user.address} />
            </div>
          </div>

        </div>

        {/* end */}
        <div className="flex justify-end">
          <button onClick={toggleUserStatus} className={`mt-5 md:mt-0 px-8 py-2 rounded-xl cursor-pointer ${user.isBlock ? 'bg-yellow-300 text-primary' : 'bg-red-700'}`}>{user.isBlock ? 'Unblock' : 'Block'}</button>
        </div>

      </div>
    </div>
  )
}

export default UserDetailModal;

