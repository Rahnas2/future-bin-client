import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { IRootState } from "../redux/slices";
import PageWrapper from "@/components/common/PageWrapper";

const ProtectedRoute = ({ children, allowedRole }: { children: JSX.Element, allowedRole: string }) => {
  const { accessToken, role } = useSelector((state: IRootState) => state.auth);
  const { collector } = useSelector((state: IRootState) => state.collector)

  const location = useLocation()

  if (!accessToken) return <Navigate to="/login" state={{ from: location }} replace />

  if (allowedRole != role) return <Navigate to="/" replace />

  if (allowedRole === 'collector') {
    const isProfilePage = location.pathname === '/collector/profile';

    // All pages except profile page are restricted if not approved or stripe is Not Enabled
    if (!isProfilePage && (collector?.details?.approvalStatus !== 'approved' || !collector.details.isStripeEnabled)) {
      return <Navigate to="/collector/profile" />;
    }

  }

  return <PageWrapper>{children}</PageWrapper>

};

export default ProtectedRoute