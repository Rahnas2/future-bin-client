import brand from '../../assets/logo (1).png'

import { MdDashboard, MdSubscriptions, MdFeedback } from "react-icons/md";
import { FaTruckMoving, FaLocationDot } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { TbLayersDifference } from "react-icons/tb";

import { NavLink } from 'react-router-dom';
import { isPending } from '@reduxjs/toolkit';
import { useState } from 'react';
function AdminNav() {

    const [isCollectorOpen, setIsCollectorOpen] = useState(false);

    return (
        <div className=" h-lvh w-fit gap-5 px-8">
            <div>
                <img className='w-40' src={brand} alt="" />
            </div>

            <div className='flex flex-col gap-8 text-lg [&>*]:flex [&>*]:gap-3 [&>*]:items-center [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-2xl  [&>*]:cursor-pointer'>
                <div className='px-3 opacity-50'>MENU</div>
                <NavLink to="/admin/dashboard" className={({ isActive, isPending }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"} >
                    <span><MdDashboard className='text-2xl' /></span>
                    <span>Dashboard</span>
                </NavLink>
                {/* <NavLink to="/admin/collectors" onClick={() => setIsCollectorOpen(!isCollectorOpen)} className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"}>
                    <span><FaTruckMoving className='text-2xl' /></span>
                    <span>Collector Management</span>
                </NavLink> */}

                <div onClick={() => setIsCollectorOpen(!isCollectorOpen)} className={isCollectorOpen ? "bg-accent3 text-primary" : "[&>*]:opacity-50"}>
                <span><FaTruckMoving className='text-2xl' /></span>
                <span>Collector Management</span> 
                </div>

                {isCollectorOpen && (
                    <div  className="-my-4 flex flex-col opacity-50 [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-2xl">
                        <NavLink to="/admin/collectors/approved" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "" }>
                            Approved Collectors
                        </NavLink>
                        <NavLink to="/admin/collectors/requests" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "" }>
                            Approval Requests
                        </NavLink>
                    </div>
                )}

                <NavLink to="/admin/users" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"}>
                    <span><FaUserFriends className='text-2xl' /></span>
                    <span>User Management</span>
                </NavLink>
                <div className=''>
                    <span><BsBank className='text-2xl' /></span>
                    <span>Payment Management</span>
                </div>
                <div className=''>
                    <span><FaLocationDot className='text-2xl' /></span>
                    <span>Service Locations</span>
                </div>
                <NavLink to="/admin/subscriptions" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"}>
                    <span><MdSubscriptions className='text-2xl' /></span>
                    <span>Subscription Plans</span>
                </NavLink>
                <NavLink to="/admin/waste-types" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"}>
                    <span><TbLayersDifference className='text-2xl' /></span>
                    <span>Waste Types</span>
                </NavLink>
                <div className=''>
                    <span><MdFeedback className='text-2xl' /></span>
                    <span>FeedBack</span>
                </div>
            </div>
        </div>
    )
}

export default AdminNav


