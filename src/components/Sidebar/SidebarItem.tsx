
import { cn } from '@/utils/cn';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

type Props = {
    to: string
    icon: React.ReactNode;
    label: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

const SidebarItem: React.FC<Props> = ({
    to,
    icon,
    label,
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
                        'flex items-center p-2 my-1 rounded-lg transition-all duration-200 group relative ml-2 mr-1 cursor-pointer',
                        isOpen ? 'bg-primary' : '',
                        'opacity-50 hover:text-accent3 hover:opacity-100'
                    )}
                >
                    <span className="flex-shrink-0">{icon}</span>

                    <span className="ml-2  overflow-hidden text-ellipsis">
                        {label}
                    </span>
      
                </div>
            ) : (
                <NavLink
                    to={to}
                    className={({ isActive }: { isActive?: boolean }) =>
                        cn(
                            'transition-all duration-200 group relative ml-2 mr-1',
                            // isExpanded ? '' : 'mx-auto justify-center',
                            isActive ? 'bg-accent3 text-seconday' : 'opacity-50 hover:text-accent3 hover:opacity-100',
                            disabled ? 'bg-transparent text-white opacity-50' : ''
                        )
                    }
                >
                    <span className="flex-shrink-0">{icon}</span>
                    <span className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        {label}
                    </span>
                </NavLink>
            )}

            {hasChildren && isOpen && (
                <div className="ml-6  pl-2 flex flex-col">
                    {children}
                </div>
            )}
        </>

    );

};


export default SidebarItem