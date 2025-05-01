import { roleType } from '@/types/roleType';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import React from 'react'
import SidebarLogo from './SidebarLogo';
import CollectorSidebarItems from './Items/CollectorSidebarItems';
import AdminSidebaritems from './Items/AdminSidebaritems';
import LogoutButton from './SidebarLogout';

type Props = {
    role: roleType
    isExpanded?: boolean
    onToggle?: () => void
}

const SideBar: React.FC<Props> = ({ role, isExpanded, onToggle }) => {

    return (
        <div
            className={`
            h-screen  flex flex-col px-8
            transition-all duration-300 ease-in-out
            ${isExpanded ? '' : 'w-20'}
          `}
        >
            {/* Logo and toggle button */}
            <div className="">
                <SidebarLogo />
            </div>

            {/* Sidebar items based on role */}
            <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                <div className="flex flex-col gap-6 text-lg [&>*]:flex [&>*]:gap-3 [&>*]:items-center [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-2xl  [&>*]:cursor-pointer">
                    <div className="px-3 opacity-50">
                        {isExpanded ? 'Menu' : 'Menu'}
                    </div>

                    {/* {role === 'resident' && <UserSidebarItems isExpanded={isExpanded} />} */}
                    {role === 'collector' && <CollectorSidebarItems isExpanded={true} />}
                    {role === 'admin' && <AdminSidebaritems isExpanded={true} />}

                </div>
            </div>

            {role === 'collector' && (
                <div className="py-4 border-t">
                    <LogoutButton isExpanded={isExpanded} />
                </div>
            )}


        </div>
    );
}

export default SideBar