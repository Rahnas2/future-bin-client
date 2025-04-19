// import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom';

// type Props = {
//   to: string
//   icon: React.ReactNode;
//   label: string;
//   isExpanded: boolean;
//   disabled?: boolean;
//   children?: React.ReactNode;
// }

// const SidebarItem: React.FC<Props> = ({
//     to,
//     icon,
//     label,
//     isExpanded,
//     disabled = false,
//     children
//   }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const hasChildren = Boolean(children);
  
//     const handleToggle = (e: React.MouseEvent) => {
//       if (hasChildren) {
//         e.preventDefault();
//         setIsOpen(!isOpen);
//       }
//     };
  
//     // Base component to render (either div for parent items with children, or NavLink for leaf items)
//     const Component = hasChildren ? 'div' : NavLink
    
//     return (
//       <>
//         <Component
//           to={hasChildren ? '#' : to}
//           onClick={hasChildren ? handleToggle : undefined}
//           className={({ isActive }: { isActive?: boolean }) => cn(
//             'flex items-center p-2 my-1 rounded-lg transition-all duration-200 group relative',
//             isExpanded ? 'mx-2' : 'mx-auto justify-center',
//             hasChildren ? 'cursor-pointer' : '',
//             disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100',
//             hasChildren && isOpen ? 'bg-gray-100' : '',
//             !hasChildren && isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-700',
//           )}
//         >
//           {/* Icon */}
//           <span className="flex-shrink-0">{icon}</span>
          
//           {/* Label - only show if expanded */}
//           {isExpanded && (
//             <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
//               {label}
//             </span>
//           )}
          
//           {/* Dropdown icon for parent items - only show if expanded */}
//           {hasChildren && isExpanded && (
//             <span className="ml-auto">
//               {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//             </span>
//           )}
          
//           {/* Tooltip for collapsed state */}
//           {!isExpanded && (
//             <span className="absolute left-full ml-4 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
//               {label}
//             </span>
//           )}
//         </Component>
  
//         {/* Children dropdown */}
//         {hasChildren && isOpen && isExpanded && (
//           <div className="ml-6 mt-1 pl-2 border-l border-gray-200">
//             {children}
//           </div>
//         )}
//       </>
//     );
//   };
  

// export default SidebarItem