import React from 'react'
import SidebarItem from '../SidebarItem'
import { Banknote, BarChart, Layers, LayoutDashboard, MessageSquare, Truck, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

type Props = {
    isExpanded: boolean
}

const AdminSidebaritems: React.FC<Props> = ({ isExpanded }) => {
    return (
        <>
            <SidebarItem
                to="/admin/dashboard"
                icon={<LayoutDashboard size={20} />}
                label="Dashboard"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="#"
                icon={<Truck size={20} />}
                label="Collector Management"
                isExpanded={isExpanded}
            >
                <NavLink
                    to="/admin/collectors/approved"
                    className={({ isActive }) => cn(
                        "block py-2 px-3 -mt-4 rounded-lg ",
                        isActive ? 'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100'
                    )}
                >
                    Approved Collectors
                </NavLink>
                <NavLink
                    to="/admin/collectors/requests"
                    className={({ isActive }) => cn(
                        "block py-2 px-3 -mb-4 rounded-lg ",
                        isActive ? 'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100'
                    )}
                >
                    Approval Requests
                </NavLink>
            </SidebarItem>

            <SidebarItem
                to="/admin/users"
                icon={<Users size={20} />}
                label="User Management"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/admin/subscriptions"
                icon={<Layers size={20} />}
                label="Subscription Plans"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/admin/waste-types"
                icon={<BarChart size={20} />}
                label="Waste Types"
                isExpanded={isExpanded}
            />

            <SidebarItem
                to="/admin/payments"
                icon={<Banknote size={20} />}
                label="Payments"
                isExpanded={isExpanded}
                disabled={true}
            />

            <SidebarItem
                to="/admin/feedbacks"
                icon={<MessageSquare size={20} />}
                label="Feedback"
                isExpanded={isExpanded}
                disabled={true}
            />
        </>
    )
}

export default AdminSidebaritems