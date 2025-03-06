
import { MdOutlineMessage, MdNotificationsNone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import brand from '../assets/logo (1).png'
import { NavLink } from "react-router-dom";

const UserNav = () => {
  return (
    <div className="flex items-center justify-around">
      <div>
        <img className="w-40" src={brand} alt="" />
      </div>

      <div className="flex gap-10 font-medium">
        <NavLink to="/" className={({ isActive }) => isActive ? "border-b border-b-accent2 pb-1" : ""} >
          <span>Home</span>
        </NavLink>
        
        <NavLink to="/profile" className={({ isActive }) => isActive ? "border-b border-b-accent2 pb-1" : ""} >
          <span>Dashboard</span>
        </NavLink>
        <span>Abount us</span>
        <span>Subscription plans</span>
      </div>

      <div className="flex gap-8 items-center text-2xl">
        <span><MdOutlineMessage className="inline" /></span>
        <span><MdNotificationsNone className="inline" /></span>
        <span className="ml-8"><FaUserCircle className="inline" /></span>
      </div>
    </div>
  )
}

export default UserNav