
import { FaUserCircle } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdOutlineSubscriptions, MdFeedback, MdOutlinePayments, MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
        <div className="bg-seconday py-8 px-8 w-fit flex flex-col gap-10 text-2xl rounded-xl [&>*]:cursor-pointer">
            <div className="flex items-center  px-4 py-2 rounded-2xl gap-5 bg-accent2">
                <span><FaUserCircle className="inline" /></span>
                <span>Profile</span>
            </div>
            <div className="flex items-center px-4 py-2  rounded-2xl gap-5">
                <span><MdOutlineSubscriptions className="inline" /></span>
                <span>Subscription</span>
            </div>
            <div className="flex items-center px-4 py-2  gap-5">
                <span><FaCodePullRequest className="inline" /></span>
                <span>Request</span>
            </div>
            <div className="flex items-center px-4 py-2  gap-5">
                <span><MdFeedback className="inline" /></span>
                <span>Feedback</span>
            </div>
            <div className="flex items-center px-4 py-2  gap-5">
                <span><MdOutlinePayments className="inline" /></span>
                <span>Payment</span>
            </div>
            <div onClick={handleLogOut} className="flex items-center px-4 py-2  gap-5">
                <span><MdLogout className="inline" /></span>
                <span>Logout</span>
            </div>
        </div>
    )
}

export default SideNav