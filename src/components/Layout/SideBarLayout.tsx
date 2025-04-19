// import { roleType } from '@/types/roleType';
// import { Menu } from 'lucide-react';
// import React, { useState } from 'react'
// import { Outlet } from 'react-router-dom';
// import SideBar from '../Sidebar/SideBar';

// type Props = {
//     role: roleType
// }

// const SideBarLayout: React.FC<Props> = ({role}) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     return (
//         <div className="flex h-screen">
//             {/* Mobile menu toggle */}
//             <button
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 className="fixed top-4 left-4 z-50 md:hidden  p-2 rounded-md shadow-md"
//             >
//                 <Menu size={20} />
//             </button>

//             {/* Sidebar */}
//             <div
//                 className={`
//             fixed inset-y-0 left-0 z-40 
//             transform transition-transform duration-300 ease-in-out
//             md:translate-x-0 md:relative md:flex
//             ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
//             ${isSidebarOpen ? 'shadow-xl md:shadow-none' : ''}
//           `}
//             >
//                 <SideBar
//                     role={role}
//                     isExpanded={isSidebarOpen}
//                     onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
//                 />
//             </div>

//             {/* Overlay for mobile when sidebar is open */}
//             {isSidebarOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//                     onClick={() => setIsSidebarOpen(false)}
//                 />
//             )}

//             {/* Main content area */}
//             <div className="flex-1 overflow-auto p-4 md:p-8">
//                 <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SideBarLayout