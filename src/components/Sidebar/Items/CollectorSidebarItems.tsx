import React from 'react';
import SidebarItem from '../SidebarItem';
import {
    User,
    LayoutDashboard,
    RefreshCcw,
    Layers,
    TrendingUp,
    MessageSquare,
    Bell,
    LogOut
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { logOut } from '@/redux/slices/authSlice';

type Props = {
    isExpanded: boolean;
}

const CollectorSidebarItems: React.FC<Props> = ({ isExpanded }) => {

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
        <>
            <SidebarItem
                to="/collector/profile"
                icon={<User size={20} />}
                label="Profile"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/collector/dashboard"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/collector/requests"
                icon={<RefreshCcw size={20} />}
                label="Requests"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/collector/pickups"
                icon={<Layers size={20} />}
                label="Pickups"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/collector/earnings"
                icon={<TrendingUp size={20} />}
                label="My Earnings"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/collector/inbox"
                icon={<MessageSquare size={20} />}
                label="Inbox"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/collector/notifications"
                icon={<Bell size={20} />}
                label="Notifications"
                isExpanded={isExpanded}
            />

            <button onClick={handleLogOut} className='transition-all duration-200 group relative mx-2 my-0'>
                <span className="flex-shrink-0"><LogOut size={20} /></span>
                <span className='ml-2 whitespace-nowrap overflow-hidden text-ellipsis'>Logout</span>
            </button>
        </>
    );

}

export default CollectorSidebarItems