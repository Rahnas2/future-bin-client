import { useLocation } from "react-router-dom";
import UserNav from "../UserNav";
import SideNav from "../UserDash/SideNav";
import { JSX } from "react/jsx-runtime";


const ResidentNavLayout = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();

    const isDashboardRoute = location.pathname.includes('/profile') ||
        location.pathname.includes('/subscription') ||
        location.pathname.includes('/pickup-requests') ||
        location.pathname.includes('/feedback') ||
        location.pathname.includes('/transactions');

    // Only render the SideNav on desktop viewports
    return (
        <div>
            <UserNav />

            <div className={`${isDashboardRoute ? 'px-4 md:px-8': 'px-8'} flex gap-10`}>
                {isDashboardRoute && <div className="hidden  lg:block">
                    <SideNav />
                </div>}

                {/* Main content */}
                <div className="flex-1 rounded-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ResidentNavLayout