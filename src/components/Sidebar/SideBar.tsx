// import { roleType } from '@/types/roleType';
// import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
// import React from 'react'
// import SidebarLogo from './SidebarLogo';

// type Props = {
//     role: roleType
//     isExpanded: boolean
//     onToggle: () => void
// }

// const SideBar:React.FC<Props> = ({role, isExpanded, onToggle}) => {

//     const handleLogout = () => {

//     }

//     return (
//         <div
//             className={`
//             flex flex-col h-full bg-white text-gray-700 border-r border-gray-200
//             transition-all duration-300 ease-in-out
//             ${isExpanded ? 'w-64' : 'w-20'}
//           `}
//         >
//             {/* Logo and toggle button */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//                 <SidebarLogo isExpanded={isExpanded} />
//                 <button
//                     onClick={onToggle}
//                     className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//                     aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
//                 >
//                     {isExpanded ? (
//                         <ChevronLeft size={20} />
//                     ) : (
//                         <ChevronRight size={20} />
//                     )}
//                 </button>
//             </div>

//             {/* Sidebar items based on role */}
//             <div className="flex-1 overflow-y-auto py-4">
//                 <div className="px-4 mb-4 text-xs uppercase font-semibold text-gray-500">
//                     {isExpanded ? 'Menu' : ''}
//                 </div>

//                 {/* {role === 'resident' && <UserSidebarItems isExpanded={isExpanded} />} */}
//                 {role === 'collector' && <CollectorSidebarItems isExpanded={isExpanded} />}
//                 {role === 'admin' && <AdminSidebarItems isExpanded={isExpanded} />}
//             </div>

//             {/* Logout button */}
//             <div className="p-4">
//                 <button
//                     onClick={handleLogout}
//                     className={`
//                 flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-100
//                 transition-all duration-200 group
//                 ${isExpanded ? 'justify-start space-x-3' : 'justify-center'}
//               `}
//                 >
//                     <LogOut size={20} className="flex-shrink-0" />
//                     {isExpanded && <span>Logout</span>}
//                     {!isExpanded && (
//                         <span className="absolute left-full ml-4 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                             Logout
//                         </span>
//                     )}
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default SideBar