import { JSX, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { IRootState } from "../redux/slices";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const accessToken = useSelector((state: IRootState) => state.auth.accessToken);
  const location = useLocation()
  
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }}  replace />;
  }
  
  return children;
};

export default ProtectedRoute