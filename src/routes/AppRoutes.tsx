
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useState } from 'react'
import { initializeAuth } from '../utils/authUtils'

//Auth pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import SelectRole from '../pages/auth/SelectRole'
import CompleteProfile from '../pages/auth/CompleteProfile'
import OtpVerfication from '../pages/auth/OtpVerfication'

//user pages
import LandingPage from '../pages/residents/LandingPage'
import Profile from '../pages/residents/Profile'

//Admin pages
import SignIn from '../pages/admin/SignIn'
import AdmDash from '../pages/admin/AdmDash'
import UserManagement from '../pages/admin/UserManagement'
import ApprovedCollectors from '../components/Admin/ApprovedCollectors'
import ApprovalRequests from '../components/Admin/ApprovalRequests'
import CollectorManagement from '../pages/admin/CollectorManagement'
import CollectorDetails from '../pages/admin/CollectorDetails'
import WasteTypesManagement from '@/pages/admin/WasteTypesManagement'


import PublicRoute from './PublicRoute'
import AdminRoute from './AdminRoute'
import ProtectedRoute from './ProtectedRoute'
import CollectorDash from '../pages/collectors/CollectorDash'
import CollectorProfile from '../pages/collectors/CollectorProfile'
import UserRoute from './UserRoute'
import CollectorRoute from './CollectorRoute'
import SubscriptionManagemnt from '../pages/admin/SubscriptionManagemnt'
import ResetPassword from '../pages/auth/ResetPassword'
import NotFound from '../pages/NotFound'
import AboutUs from '../components/Marketing/AboutUs'
import AdminNav from '../components/Admin/AdminNav'
import UserNav from '../components/UserNav'
import SubscriptionPlans from '../components/Marketing/SubscriptionPlans'
import CollectorRequests from '../pages/collectors/CollectorRequests'
import { getSocket, initiateSocket } from '../services/socket'
import UserPickupRequestHsitory from '../pages/residents/UserPickupRequestHsitory'
import Loader from '@/components/common/Loader'
import SubscriptionManagementUser from '@/pages/residents/SubscriptionManagementUser'
import NotificationUser from '@/pages/residents/NotificationUser'
import PaymentStatus from '@/components/common/Payment/PaymentStatus'
import ChatUser from '@/pages/residents/ChatUser'
import CollectorInbox from '@/pages/collectors/CollectorInbox'
import Map from '@/pages/common/Map'






const AppRoutes = () => {
  const location = useLocation();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);


  useEffect(() => {
    const initAuth = async () => {
      await initializeAuth(); // Wait for token refresh
      setIsAuthInitialized(true); // Mark auth as initialized
      initiateSocket()
    };
    initAuth();
  }, []);


  useEffect(() => {
    // Define auth-related routes
    const authRoutes = [
      '/',
      '/login',
      '/register',
      '/otp-verification',
      '/select-role',
      '/complete-profile',
      '/reset-password',
      '/admin/login',
      '/profile',
      '/subscription',
      '/pickup-request/history',
      '/chat'
    ];

    // Get the root element
    const rootElement = document.getElementById('root');

    if (rootElement) {
      // Check if current path is an auth route
      const isAuthRoute = authRoutes.some(route => location.pathname === route);

      // Apply the background color directly based on route type
      rootElement.style.backgroundColor = isAuthRoute
        ? '#0D2D2E' /* Use exact color for auth routes */
        : '#152526'; /* Use exact color for other routes */

      // Make sure the root element takes up full height
      rootElement.style.minHeight = '100vh';
    }

    // Cleanup function
    return () => {
      if (rootElement) {
        rootElement.style.backgroundColor = '';
        rootElement.style.minHeight = '';
      }
    };
  }, [location.pathname]);

  if (!isAuthInitialized) {
    return <Loader />
  }




  return (
    <Routes>

      {/* auth routes */}

      <Route path='/login' element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path='/register' element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      <Route path='/otp-verification' element={
        <PublicRoute>
          <OtpVerfication />
        </PublicRoute>
      } />
      <Route path='/select-role' element={
        <PublicRoute>
          <SelectRole />
        </PublicRoute>
      } />
      <Route path='/complete-profile' element={
        <PublicRoute>
          <CompleteProfile />
        </PublicRoute>
      } />

      <Route path='/reset-password' element={
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      } />


      {/* user routes */}
      <Route path='/' element={
        <UserRoute>
          <LandingPage />
        </UserRoute>}
      />

      <Route path='/about-us' element={
        <UserRoute>
          <>
            <UserNav />
            <AboutUs />
          </>
        </UserRoute>
      } />

      <Route path='/subscription-plans' element={
        <UserRoute>
          <>
            <UserNav />
            <SubscriptionPlans />
          </>
        </UserRoute>
      } />

      <Route path='/notifications' element={
        <UserRoute>
          <NotificationUser />
        </UserRoute>
      }>

      </Route>

      <Route path='/profile' element={
        <UserRoute>
          <Profile />
        </UserRoute>
      } />

      <Route path='/subscription' element={
        <UserRoute>
          <>
            <UserNav />
            <SubscriptionManagementUser />
          </>
        </UserRoute>
      } />

      <Route path='/pickup-request/history' element={
        <UserRoute>
          <>
            <UserNav />
            <UserPickupRequestHsitory />
          </>
        </UserRoute>
      } />

      <Route path='/payment-status' element={
        <UserRoute>
          <PaymentStatus />
        </UserRoute>
      } />

      <Route path='/chat' element={
        <UserRoute>
          <ChatUser />
        </UserRoute>
      } />

      {/* colllector routes */}
      <Route path='/collector/dashboard' element={
        <CollectorRoute>
          <CollectorDash />
        </CollectorRoute>
      } />
      <Route path='/collector/profile' element={
        <CollectorRoute>
          <CollectorProfile />
        </CollectorRoute>
      } />

      <Route path='/collector/requests' element={
        <CollectorRoute>
          <CollectorRequests />
        </ CollectorRoute >
      }
      />

      <Route path='/collector/inbox' element={
        <CollectorRoute>
          <CollectorInbox />
        </CollectorRoute>
      } />

      {/* admin routes */}
      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdmDash />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        }
      />
      <Route
        path='/admin/subscriptions'
        element={
          <AdminRoute>
            <SubscriptionManagemnt />
          </AdminRoute>
        }></Route>


      <Route
        path="/admin/collectors"
        element={
          <AdminRoute>
            <CollectorManagement />
          </AdminRoute>
        }
      >
        <Route path="approved" element={<ApprovedCollectors />} />
        <Route path="requests" element={<ApprovalRequests />} />
      </Route>

      <Route
        path="/admin/collectors/:name"
        element={
          <AdminRoute>
            <CollectorDetails />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/waste-types"
        element={
          <AdminRoute>
            <WasteTypesManagement />
          </AdminRoute>
        } />


      <Route path='/map' element={<Map />}/>
      
      <Route path="*" element={<NotFound />} />
    </Routes >
  )
}

export default AppRoutes