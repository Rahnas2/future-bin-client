import { useEffect } from 'react';
import SidebarItem from '../SidebarItem';
import {
    User,
    LayoutDashboard,
    RefreshCcw,
    Layers,
    TrendingUp,
    MessageSquare,
    Bell
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getSocket } from '@/services/socket';
import { incrementChat, incrementNotification, setCounts } from '@/redux/slices/countSlice';
import { fetchOverviewCountsApi } from '@/api/overviewService';
import { Badge } from '@mui/material';
import { IRootState } from '@/redux/slices';

const CollectorSidebarItems = () => {

    const socket = getSocket()

    const dispatch = useDispatch<AppDispatch>()

    const { unreadNotificationCount, unreadChatCount } = useSelector((state: IRootState) => state.overview);


    // Fetch notification counts
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const result = await fetchOverviewCountsApi();
                dispatch(setCounts({
                    unreadNotificationCount: result.counts.unreadNotifications,
                    unreadChatCount: result.counts.unreadChats
                }));
            } catch (error) {
                console.error('error fetching unread counts ', error);
            }
        };
        fetchCounts();
    }, [dispatch]);

    useEffect(() => {
        socket.on('new-notification', () => {
            dispatch(incrementNotification());
        });

        socket.on('new-chat', () => {
            dispatch(incrementChat());
        });

        return () => {
            socket.off('new-notification');
            socket.off('new-chat');
        };
    }, [dispatch]);


    return (
        <>
            <SidebarItem
                to="/collector/profile"
                icon={<User size={20} />}
                label="Profile"
            />

            <SidebarItem
                to="/collector/dashboard"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
            />

            <SidebarItem
                to="/collector/requests"
                icon={<RefreshCcw size={20} />}
                label="Requests"
            />

            <SidebarItem
                to="/collector/pickups"
                icon={<Layers size={20} />}
                label="Pickups"
            />

            <SidebarItem
                to="/collector/earnings"
                icon={<TrendingUp size={20} />}
                label="My Earnings"
            />

            <SidebarItem
                to="/collector/inbox"
                icon={<Badge badgeContent={unreadChatCount} color="error">
                    <MessageSquare size={20} /> 
                </Badge>}
                label="Inbox"
            />

            <SidebarItem
                to="/collector/feedbacks"
                icon={<Bell size={20} />}
                label="Feedbacks"
            />

            <SidebarItem
                to="/collector/notifications"
                icon={<Badge badgeContent={unreadNotificationCount} color="error">
                   <Bell size={20} />
                </Badge>}
                label="Notifications"
            />
        </>
    );

}

export default CollectorSidebarItems