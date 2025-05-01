import { logOut } from "@/redux/slices/authSlice"
import { AppDispatch } from "@/redux/store"
import { LogOut } from "lucide-react"
import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

type Props = {
    isExpanded?: boolean
}

const LogoutButton: React.FC<Props> = ({ isExpanded }) => {
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
        <button 
            onClick={handleLogOut} 
            className='transition-all duration-200 group relative w-full flex items-center gap-3 px-3 py-2 rounded-2xl'
        >
            <span className="flex-shrink-0"><LogOut size={20} /></span>
            {isExpanded && <span className='whitespace-nowrap overflow-hidden text-ellipsis'>Logout</span>}
        </button>
    );
}

export default LogoutButton