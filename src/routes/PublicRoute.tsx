import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { IRootState } from "../redux/slices";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { accessToken, role } = useSelector((state: IRootState) => state.auth);
    const location = useLocation()

    if (accessToken) {
        if(role === 'admin') {
            return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
        }else if(role === 'collector'){
            return <Navigate to="/collector/dashboard" state={{from: location}} replace/>
        }   
    }

    return children;
};

export default PublicRoute