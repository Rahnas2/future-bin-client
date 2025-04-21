import { useSelector } from "react-redux"
import { IRootState } from "../redux/slices"
import { Navigate, useLocation } from "react-router-dom"
import { JSX } from "react";



const CollectorRoute = ({ children }: { children: JSX.Element }) => {
    const { accessToken, role } = useSelector((state: IRootState) => state.auth)
    const { collector } = useSelector((state: IRootState) => state.collector)
    const location = useLocation();

    const isProfilePage = location.pathname === '/collector/profile';

    //If Collector Not Logged in 
    if (!accessToken) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    //If role is Not Collector 
    if (role !== 'collector') {
        return <Navigate to="/login" replace />
    }

    // All pages except profile page are restricted if not approved or stripe is Not Enabled
    if ( !isProfilePage &&  (collector?.details?.approvalStatus !== 'approved' || !collector.details.isStripeEnabled) ) {
        return <Navigate to="/collector/profile" />;
    }

    return children;
}

export default CollectorRoute