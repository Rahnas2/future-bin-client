
import { cn } from '@/utils/cn';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

type Props = {
    to: string
    icon: React.ReactNode;
    label: string;
    isExpanded: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
}

const SidebarItem: React.FC<Props> = ({
    to,
    icon,
    label,
    isExpanded,
    disabled,
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = Boolean(children);

    const handleToggle = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            {hasChildren ? (
                <div
                    onClick={handleToggle}
                    className={cn(
                        'flex items-center p-2 my-1 rounded-lg transition-all duration-200 group relative',
                        isExpanded ? 'ml-2 mr-1' : 'mx-auto justify-center',
                        'cursor-pointer',
                        isOpen ? 'bg-primary' : '',
                        'opacity-50 hover:text-accent3 hover:opacity-100'
                    )}
                >
                    <span className="flex-shrink-0">{icon}</span>

                    {isExpanded && (
                        <span className="ml-2  overflow-hidden text-ellipsis">
                            {label}
                        </span>
                    )}


                    {!isExpanded && (
                        <span className="absolute left-full ml-4 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                            {label}
                        </span>
                    )}
                </div>
            ) : (
                <NavLink
                    to={to}
                    className={({ isActive }: { isActive?: boolean }) =>
                        cn(
                            'transition-all duration-200 group relative',
                            isExpanded ? 'ml-2 mr-1' : 'mx-auto justify-center',
                            isActive ? 'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100',
                            disabled ? 'bg-transparent text-white opacity-50' : ''
                        )
                    }
                >
                    <span className="flex-shrink-0">{icon}</span>

                    {isExpanded && (
                        <span className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                            {label}
                        </span>
                    )}

                    {!isExpanded && (
                        <span className="absolute left-full ml-4 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                            {label}
                        </span>
                    )}
                </NavLink>
            )}

            {hasChildren && isOpen && isExpanded && (
                <div className="ml-6  pl-2 flex flex-col">
                    {children}
                </div>
            )}
        </>
        
    );

};


export default SidebarItem