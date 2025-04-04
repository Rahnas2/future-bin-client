import brand from '../../assets/logo (1).png'

//icons
import { MdDashboard, MdFeedback, MdLogout, MdNotifications } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { FaMoneyBillTrendUp, FaCodePullRequest } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";


import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/slices/authSlice';
type Props = {}

const CollectorNav = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await dispatch(logOut()).unwrap()
            navigate('/login')
        } catch (error) {
            console.log('log out errror ', error)
        }
    }

        return (
            <div className=" h-lvh w-fit gap-5 px-8">
                <div>
                    <img className='w-40' src={brand} alt="" />
                </div>

                <div className='flex flex-col gap-8 text-lg [&>*]:flex [&>*]:gap-3 [&>*]:items-center [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-2xl  [&>*]:cursor-pointer'>
                    <div className='px-3 opacity-50'>MENU</div>
                    <NavLink to="/collector/profile" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"} >
                        <span><FaUserCircle className='text-2xl' /></span>
                        <span>Profile</span>
                    </NavLink>

                    <NavLink to="/collector/dashboard" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"} >
                        <span><MdDashboard className='text-2xl' /></span>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink to="/collector/requests" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"} >
                        <span><FaCodePullRequest className='text-2xl' /></span>
                        <span>Requests</span>
                    </NavLink>

                    <div className='opacity-50'>
                        <span><ImBin2 className='text-2xl' /></span>
                        <span>My Collection</span>
                    </div>
                    <div className='opacity-50'>
                        <span><FaMoneyBillTrendUp className='text-2xl' /></span>
                        <span>My Earnings</span>
                    </div>
                    <NavLink to="/collector/inbox" className={({ isActive }) => isActive ? "bg-accent3 text-seconday" : "[&>*]:opacity-50"}>
                        <span><FiMessageSquare className='text-2xl' /></span>
                        <span>Inbox</span>
                    </NavLink>
                    <div className='opacity-50'>
                        <span><MdNotifications className='text-2xl' /></span>
                        <span>Notification</span>
                    </div>
                    <div onClick={handleLogOut} className="opacity-50 cursor-pointer">
                        <span><MdLogout className="inline" /></span>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        )
    }

    export default CollectorNav