import { useSelector } from "react-redux"
import { IRootState } from "../redux/slices"
import { Navigate, useLocation } from "react-router-dom"
import { JSX } from "react";



const UserRoute = ({ children }: { children: JSX.Element }) => {
    const {accessToken, role} = useSelector((state: IRootState) => state.auth)
    const location = useLocation();
    if(!accessToken) {
        return <Navigate to="/login" state={{ from: location }} replace/>
    }

    if(role !== 'resident'){
        return <Navigate to="/login" replace/>
    }

    return children;
}

export default UserRoute