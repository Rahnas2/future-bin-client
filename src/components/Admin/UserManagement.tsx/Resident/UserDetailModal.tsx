import React, { useState } from "react";
import { UserDetailModalProps } from "@/types/UserDetailModalProps";
import axiosInstance from "@/api/axiosInstance";

import { IoMdClose } from "react-icons/io";
import Address from "@/components/Address";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  const toggleUserStatus = async () => {
    try {
      await axiosInstance.patch('/admin/user/status', { userId: user._id })
      const message = user.isBlock ? 'ublocked' : 'blocked'
      toast.success('user ' + message + ' successfully')

      onClose()
    } catch (error) {
      console.log('toggle status error ', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-primary border border-gray-500  px-10 py-8 rounded-xl">

        <div onClick={onClose} className="font-bold text-end text-accent2 cursor-pointer"><IoMdClose className="inline" /></div>

        <div className="flex flex-col">

          {/* top */}
          <div className="flex gap-12 items-center justify-center mb-10">

            <div className="">
              {user.image ? <img className="w-42 h-42 rounded-full" src={user.image} alt="" />: <FaUserCircle className="w-42 h-42"/>}
            </div>

            <div>
              <div className="font-bold text-2xl mb-2">{user.firstName + '    ' + user.lastName}</div>
              <div className="mb-1 opacity-50">{user.email}</div>
              <div className="opacity-50">{user.mobile}</div>
            </div>
          </div>

          {/* middle */}
          <div className="flex gap-25">

            {/* left */}
            <div className="flex flex-col justify-evenly">
              <div className="border border-gray-600 px-4 py-10 rounded-lg ">
                <div className="mb-3"><span className="opacity-50">Active Subscription Plan :</span> <span className="text-white">Null</span> </div>
                <div className="mb-3"><span className="opacity-50">Last Payment Date :</span> <span>00/00/0000</span></div>
                <div><span className="opacity-50">Next Payment Date : </span>  <span>00/00/0000</span></div>
              </div>

              <div >
                <span className="font-bold">Total On-demand Pickups : </span>
                <span className="font-bold opacity-50">0</span>
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
          <button onClick={toggleUserStatus} className={` px-8 py-2 rounded-xl cursor-pointer ${user.isBlock ? 'bg-yellow-300 text-primary' : 'bg-red-700'}`}>{user.isBlock ? 'Unblock' : 'Block'}</button>
        </div>

      </div>
    </div>
  )
}

export default UserDetailModal;

