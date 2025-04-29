
import { FaUserCircle } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdOutlineSubscriptions, MdFeedback, MdOutlinePayments, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";

function SideNav() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const handleLogOut = async () => {
        try {
            await dispatch(logOut()).unwrap()
            navigate('/login')
        } catch (error) {
            console.log('log out errror ', error)
        }
    }
    return (
        <div className=" md:bg-seconday py-8 px-4 md:px-8 w-fit flex flex-col gap-10 text-lg md:text-2xl rounded-xl [&>*]:rounded-2xl [&>*]:cursor-pointer border md:border-0 border-gray-500">
            <NavLink to="/profile" className={({ isActive }) => `flex flex-col md:flex-row items-center px-4 py-2  gap-2 md:gap-5  ${isActive ?'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100'}`}>
                <span><FaUserCircle className="inline" /></span>
                <span className="">Profile</span>
            </NavLink>
            <NavLink to="/subscription" className={({ isActive }) => `flex flex-col md:flex-row items-center px-4 py-2  gap-2 md:gap-5  ${isActive ? 'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100'}`}>
                <span><MdOutlineSubscriptions className="inline" /></span>
                <span className="">Subscription</span>
            </NavLink>
            <NavLink to="/pickup-requests" className={({ isActive }) => `flex flex-col md:flex-row items-center px-4 py-2  gap-2 md:gap-5  ${isActive ? 'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100'}`}>
                <span><FaCodePullRequest className="inline" /></span>
                <span className="">Request</span>
            </NavLink>
            <NavLink to="/feedback" className={({ isActive }) => `flex flex-col md:flex-row items-center px-4 py-2 gap-2 md:gap-5  ${isActive ? 'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100'}`}>
                <span><MdFeedback className="inline" /></span>
                <span className="">Feedback</span>
            </NavLink>
            <NavLink to="/transactions" className={({ isActive }) => `flex flex-col md:flex-row items-center px-4 py-2 gap-2 md:gap-5  ${isActive ? 'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100'}`}>
                <span><MdOutlinePayments className="inline" /></span>
                <span className="">Transactions</span>
            </NavLink>
            <div onClick={handleLogOut} className="flex flex-col md:flex-row items-center px-4 py-2  gap-2 md:gap-5 opacity-50 hover:opacity-100 hover:text-accent3">
                <span><MdLogout className="inline" /></span>
                <span className="">Logout</span>
            </div>
        </div>
    )
}

export default SideNav