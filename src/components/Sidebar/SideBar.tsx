import { roleType } from '@/types/roleType';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import React from 'react'
import SidebarLogo from './SidebarLogo';
import CollectorSidebarItems from './Items/CollectorSidebarItems';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '@/redux/store';
import { logOut } from '@/redux/slices/authSlice';
import AdminSidebaritems from './Items/AdminSidebaritems';

type Props = {
    role: roleType
    isExpanded?: boolean
    onToggle?: () => void
}

const SideBar: React.FC<Props> = ({ role, isExpanded, onToggle }) => {

    return (
        <div
            className={`
            h-lvh w-fit px-8
            transition-all duration-300 ease-in-out
            ${isExpanded ? '' : 'w-20'}
          `}
        >
            {/* Logo and toggle button */}
            <div className="">
                <SidebarLogo />
                {/* <button
                    onClick={onToggle}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isExpanded ? (
                        <ChevronLeft size={20} />
                    ) : (
                        <ChevronRight size={20} />
                    )}
                </button> */}
            </div>

            {/* Sidebar items based on role */}
            <div className="flex flex-col gap-6 text-lg [&>*]:flex [&>*]:gap-3 [&>*]:items-center [&>*]:px-3 [&>*]:py-2 [&>*]:rounded-2xl  [&>*]:cursor-pointer">
                <div className="px-3 opacity-50">
                    {isExpanded ? 'Menu' : 'Menu'}
                </div>

                {/* {role === 'resident' && <UserSidebarItems isExpanded={isExpanded} />} */}
                {role === 'collector' && <CollectorSidebarItems isExpanded={true}/>}
                {role === 'admin' && <AdminSidebaritems isExpanded={true} />}

            </div>


        </div>
    );
}

export default SideBar