import { IRootState } from "@/redux/slices"
import { JSX } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
    const { accessToken, role } = useSelector((state: IRootState) => state.auth)
    const location = useLocation()
    console.log('guest only route... ')

    if (accessToken) {
        if (role === 'admin') {
            return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
        } else if (role === 'collector') {
            return <Navigate to="/collector/profile" state={{ from: location }} replace />
        } else {
            return <Navigate to="/"  replace />;
        }
    }

    return children
}

export default GuestOnlyRoute