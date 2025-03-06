import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { IRootState } from "../redux/slices";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { accessToken, role } = useSelector((state: IRootState) => state.auth);
    const location = useLocation();
   console.log('admin route')
    if (!accessToken) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    if(role !== 'admin') {
        return <Navigate to="/login" replace/>
    }

    return children;
};

export default AdminRoute