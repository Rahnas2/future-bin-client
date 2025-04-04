
import { MdOutlineMessage, MdNotificationsNone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import brand from '../assets/logo (1).png'
import { NavLink } from "react-router-dom";

const UserNav = () => {
  return (
    <div className="flex items-center justify-center gap-20 lg:justify-around ">
      <div>
        <img className="w-40" src={brand} alt="" />
      </div>

      <div className="hidden lg:flex  gap-10 font-medium ">
        <NavLink to="/" className={({ isActive }) => isActive ? "border-b border-b-accent2 pb-1" : ""} >
          <span>Home</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => isActive ? "border-b border-b-accent2 pb-1" : ""} >
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/about-us" className={({ isActive }) => isActive ? "border-b border-b-accent2 pb-1" : ""} >
          <span>Abount us</span>
        </NavLink>

        <NavLink to="/subscription-plans" className={({ isActive }) => isActive ? "border-b border-b-accent2 pb-1" : ""} >
        <span>Subscription plans</span>
        </NavLink>
      </div>

      <div className="flex gap-6 lg:gap-8 items-center  text-2xl">
        <NavLink to="/chat"><MdOutlineMessage className="inline" /></NavLink>
        <NavLink to="/notifications"><MdNotificationsNone className="inline" /></NavLink>
      </div>
    </div>
  )
}

export default UserNav