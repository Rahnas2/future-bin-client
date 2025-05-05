import { roleType } from '@/types/roleType';
import { Menu } from 'lucide-react';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../Sidebar/SideBar';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux/slices';


const SideBarLayout = () => {
    const { role } = useSelector((state: IRootState) => state.auth)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Mobile menu toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-4 left-4 z-50 md:hidden rounded-md shadow-md"
            >
                <Menu size={20} />
            </button>

            {/* Sidebar */}
            <div
                className={`
            fixed inset-y-0 left-0 z-40 
            transform transition-transform duration-300 ease-in-out
            md:translate-x-0 md:relative md:flex
            ${isSidebarOpen ? 'translate-x-0 shadow-xl md:shadow-none' : '-translate-x-full'} 
          `}
            >
                <SideBar
                    role={role as roleType}
                    // onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-seconday bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main content area */}
            <div className="flex-1 overflow-auto">
                <div className={`transition-all duration-300 ${isSidebarOpen ? '' : ''}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SideBarLayout