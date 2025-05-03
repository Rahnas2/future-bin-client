
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
import ApprovedCollectors from '@/components/Admin/UserManagement.tsx/Collector/ApprovedCollectors'
import ApprovalRequests from '@/components/Admin/UserManagement.tsx/Collector/ApprovalRequests'
import CollectorManagement from '../pages/admin/CollectorManagement'
import CollectorDetails from '../pages/admin/CollectorDetails'
import WasteTypesManagement from '@/pages/admin/WasteTypesManagement'


import PublicRoute from './PublicRoute'
import AdminRoute from './AdminRoute'
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
import CollectorCacelRequest from '@/pages/collectors/CollectorCacelRequest'
import CollectorOnDemandCompleted from '@/pages/collectors/CollectorOnDemandCompleted'
import UserFeedback from '@/pages/residents/UserFeedback'
import SinglePickupRequest from '@/pages/residents/SinglePickupRequest'
import CollectorSubscriptions from '@/pages/collectors/CollectorSubscriptions'
import UserPayments from '@/pages/residents/UserPayments'
import SideBarLayout from '@/components/Layout/SideBarLayout'
import CollectorNotifications from '@/pages/collectors/CollectorNotifications'
import CollectorPickups from '@/pages/collectors/CollectorPickups'
import MyEarnings from '@/pages/collectors/MyEarnings'
import PaymentAdmin from '@/pages/admin/PaymentAdmin'
import CollectorFeedback from '@/pages/collectors/CollectorFeedback'
import FeedbackAdmin from '@/pages/admin/FeedbackAdmin'
import ResidentNavLayout from '@/components/Layout/ResidentNavLayout'






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
      '/feedback',
      '/pickup-request/history',
      '/transactions',
      '/chat',
      '/pickup-requests',
      '/collector/inbox'
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
        // <PublicRoute>
        <OtpVerfication />
        // </PublicRoute>
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
          <ResidentNavLayout><LandingPage /></ResidentNavLayout>
        </UserRoute>}
      />

      <Route path='/about-us' element={
        <UserRoute>
          <ResidentNavLayout><AboutUs /></ResidentNavLayout>
        </UserRoute>
      } />

      <Route path='/available-plans' element={
        <UserRoute>
          <ResidentNavLayout><SubscriptionPlans /></ResidentNavLayout>
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
          <ResidentNavLayout><Profile /></ResidentNavLayout>
        </UserRoute>
      } />

      <Route path='/subscription' element={
        <UserRoute>
          <ResidentNavLayout><SubscriptionManagementUser /></ResidentNavLayout>
        </UserRoute>
      } />

      <Route path='/pickup-requests' element={
        <UserRoute>
          <ResidentNavLayout><UserPickupRequestHsitory /></ResidentNavLayout>
        </UserRoute>
      } />

      <Route path='/pickup-reqeusts/:id' element={
        <UserRoute>
          <SinglePickupRequest />
        </UserRoute>
      } />

      <Route path='/feedback' element={
        <UserRoute>
          <ResidentNavLayout><UserFeedback /></ResidentNavLayout>
        </UserRoute>
      }
      />

      <Route path='/transactions' element={
        <UserRoute>
          <ResidentNavLayout><UserPayments /></ResidentNavLayout>
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

      <Route path="/collector" element={<SideBarLayout />}>
        {/* colllector routes */}
        <Route path='profile' element={
          <CollectorRoute>
            <CollectorProfile />
          </CollectorRoute>
        } />

        <Route path='dashboard' element={
          <CollectorRoute>
            <CollectorDash />
          </CollectorRoute>
        } />


        <Route path='requests' element={
          <CollectorRoute>
            <CollectorRequests />
          </ CollectorRoute >
        }
        />
        <Route path="pickups" element={
          <CollectorRoute>
            <CollectorPickups />
          </CollectorRoute>
        } />

        <Route path='earnings' element={
          <CollectorRoute>
            <MyEarnings />
          </CollectorRoute>
        } />

        <Route path='feedbacks' element={
          <CollectorRoute>
            <CollectorFeedback />
          </CollectorRoute>
        } />

        <Route path='notifications' element={
          <CollectorRoute>
            <CollectorNotifications />
          </CollectorRoute>
        } />

      </Route>

      <Route path="/collector/*" element={<NotFound />} />

      <Route path='/collector/request/cancel' element={
        <CollectorRoute>
          <CollectorCacelRequest />
        </CollectorRoute>
      } />

      <Route path='/collector/request/on-demand/complete' element={
        <CollectorRoute>
          <CollectorOnDemandCompleted />
        </CollectorRoute>
      } />

      <Route path='/collector/inbox' element={
        <CollectorRoute>
          <CollectorInbox />
        </CollectorRoute>
      } />

      {/* admin routes */}
      <Route
        path="admin/login"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />


      <Route path="/admin" element={<SideBarLayout />}>
        <Route
          path="dashboard"
          element={
            <AdminRoute>
              <AdmDash />
            </AdminRoute>
          }
        />

        <Route
          path="collectors"
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
          path="users"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route
          path='subscriptions'
          element={
            <AdminRoute>
              <SubscriptionManagemnt />
            </AdminRoute>
          }></Route>

        <Route
          path="waste-types"
          element={
            <AdminRoute>
              <WasteTypesManagement />
            </AdminRoute>
          } />

        <Route path='payments' element={
          <AdminRoute>
            <PaymentAdmin />
          </AdminRoute>
        } />

        <Route path='feedbacks' element={
          <AdminRoute>
            <FeedbackAdmin />
          </AdminRoute>
        } />

      </Route>

      <Route
        path="/admin/collectors/:name"
        element={
          <AdminRoute>
            <CollectorDetails />
          </AdminRoute>
        }
      />
      <Route path="/admin/*" element={<NotFound />} />

      <Route path='/map' element={<Map />} />

      <Route path="*" element={<NotFound />} />
    </Routes >
  )
}

export default AppRoutes