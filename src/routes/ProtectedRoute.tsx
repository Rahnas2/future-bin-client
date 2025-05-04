import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { IRootState } from "../redux/slices";

const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: string }) => {
  const { accessToken, role } = useSelector((state: IRootState) => state.auth);
  console.log('access token ', accessToken)
  console.log('role ', role)
  const location = useLocation()
  
  if (!accessToken) return <Navigate to="/hello" state={{ from: location }} replace />

  if (allowedRole !== role ) return <Navigate to="/" replace />

  return children

};

export default ProtectedRoute