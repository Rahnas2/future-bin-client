
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { initializeAuth } from '../utils/authUtils'

import PublicRoute from './PublicRoute'
import GuestOnlyRoute from './GuestOnlyRoute'
import ProtectedRoute from './ProtectedRoute'

//Auth pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import SelectRole from '../pages/auth/SelectRole'
import CompleteProfile from '../pages/auth/CompleteProfile'
import OtpVerfication from '../pages/auth/OtpVerfication'
import ResetPassword from '../pages/auth/ResetPassword'

//user pages
import LandingPage from '../pages/residents/LandingPage'
import Profile from '../pages/residents/Profile'
import AboutUs from '../components/Marketing/AboutUs'
import SubscriptionPlans from '../components/Marketing/SubscriptionPlans'
import UserPickupRequestHsitory from '../pages/residents/UserPickupRequestHsitory'
import SubscriptionManagementUser from '@/pages/residents/SubscriptionManagementUser'
import NotificationUser from '@/pages/residents/NotificationUser'
import UserFeedback from '@/pages/residents/UserFeedback'
import SinglePickupRequest from '@/pages/residents/SinglePickupRequest'
import UserPayments from '@/pages/residents/UserPayments'

//Admin pages
import SignIn from '../pages/admin/SignIn'
import AdmDash from '../pages/admin/AdmDash'
import UserManagement from '../pages/admin/UserManagement'
import ApprovedCollectors from '@/components/Admin/UserManagement.tsx/Collector/ApprovedCollectors'
import ApprovalRequests from '@/components/Admin/UserManagement.tsx/Collector/ApprovalRequests'
import CollectorManagement from '../pages/admin/CollectorManagement'
import CollectorDetails from '../pages/admin/CollectorDetails'
import WasteTypesManagement from '@/pages/admin/WasteTypesManagement'
import ChatUser from '@/pages/residents/ChatUser'
import SubscriptionManagemnt from '../pages/admin/SubscriptionManagemnt'
import PaymentAdmin from '@/pages/admin/PaymentAdmin'
import FeedbackAdmin from '@/pages/admin/FeedbackAdmin'

//Collector Pages
import CollectorDash from '../pages/collectors/CollectorDash'
import CollectorProfile from '../pages/collectors/CollectorProfile'
import CollectorCacelRequest from '@/pages/collectors/CollectorCacelRequest'
import CollectorOnDemandCompleted from '@/pages/collectors/CollectorOnDemandCompleted'
import CollectorNotifications from '@/pages/collectors/CollectorNotifications'
import CollectorPickups from '@/pages/collectors/CollectorPickups'
import MyEarnings from '@/pages/collectors/MyEarnings'
import CollectorRequests from '../pages/collectors/CollectorRequests'
import CollectorFeedback from '@/pages/collectors/CollectorFeedback'
import CollectorInbox from '@/pages/collectors/CollectorInbox'

//Common Pages
import PaymentStatus from '@/components/common/Payment/PaymentStatus'
import Map from '@/pages/common/Map'
import NotFound from '../pages/NotFound'


// Layouts 
import SideBarLayout from '@/components/Layout/SideBarLayout'
import ResidentNavLayout from '@/components/Layout/ResidentNavLayout'

//Loader 
import Loader from '@/components/common/Loader'


import { initiateSocket } from '../services/socket'
import PageWrapper from '@/components/common/PageWrapper'
import { AnimatePresence } from 'motion/react'



const AppRoutes = () => {
  const location = useLocation();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

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


  useEffect(() => {
    const initAuth = async () => {

      console.log('initializing auth ')
      await initializeAuth(); // Wait for token refresh
      await initiateSocket(); // Mark auth as initialized
      setIsAuthInitialized(true);
      console.log('inizilized auth  completed ')

    };
    initAuth();
  }, [location.pathname]);




  if (!isAuthInitialized) {
    return <Loader />
  }


  return (
    <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
      {/* auth routes */}
      <Route path='/login' element={
        <GuestOnlyRoute>
          <PageWrapper><Login /></PageWrapper>
        </GuestOnlyRoute>
      } />
      <Route path='/register' element={
        <GuestOnlyRoute>
          <PageWrapper>
            <Register />
          </PageWrapper>
        </GuestOnlyRoute>
      } />

      <Route path='/otp-verification' element={
        <PageWrapper><OtpVerfication /></PageWrapper>
      } />
      <Route path='/select-role' element={
        <GuestOnlyRoute>
          <PageWrapper><SelectRole /></PageWrapper>
        </GuestOnlyRoute>
      } />
      <Route path='/complete-profile' element={
        <GuestOnlyRoute>
          <PageWrapper><CompleteProfile /></PageWrapper>
        </GuestOnlyRoute>
      } />

      <Route path='/reset-password' element={
        <GuestOnlyRoute>
          <ResetPassword />
        </GuestOnlyRoute>
      } />


      {/* user routes */}

      <Route path='/' element={
        <PublicRoute>
          <PageWrapper><ResidentNavLayout><LandingPage /></ResidentNavLayout></PageWrapper>
        </PublicRoute>
      }
      />

      <Route path='/about-us' element={
        <PublicRoute>
          <PageWrapper>
            <ResidentNavLayout><AboutUs /></ResidentNavLayout>
          </PageWrapper>
        </PublicRoute>
      } />

      <Route path='/available-plans' element={
        <PublicRoute>
          <ResidentNavLayout><SubscriptionPlans /></ResidentNavLayout>
        </PublicRoute>
      } />

      <Route path='/notifications' element={
        <ProtectedRoute allowedRole="resident">
          <PageWrapper><NotificationUser /></PageWrapper>
        </ProtectedRoute>
      }>

      </Route>

      <Route path='/profile' element={
        <ProtectedRoute allowedRole="resident">
          <ResidentNavLayout><Profile /></ResidentNavLayout>
        </ProtectedRoute>
      } />

      <Route path='/subscription' element={
        <ProtectedRoute allowedRole="resident">
          <ResidentNavLayout><SubscriptionManagementUser /></ResidentNavLayout>
        </ProtectedRoute>
      } />

      <Route path='/pickup-requests' element={
        <ProtectedRoute allowedRole="resident">
          <ResidentNavLayout><UserPickupRequestHsitory /></ResidentNavLayout>
        </ProtectedRoute >
      } />

      <Route path='/pickup-reqeusts/:id' element={
        <ProtectedRoute allowedRole="resident">
          <PageWrapper><SinglePickupRequest /></PageWrapper>
        </ProtectedRoute>
      } />

      <Route path='/feedback' element={
        <ProtectedRoute allowedRole="resident">
          <ResidentNavLayout><UserFeedback /></ResidentNavLayout>
        </ProtectedRoute >
      }
      />

      <Route path='/transactions' element={
        <ProtectedRoute allowedRole="resident">
          <ResidentNavLayout><UserPayments /></ResidentNavLayout>
        </ProtectedRoute >
      } />


      <Route path='/payment-status' element={
        <PublicRoute>
          <PaymentStatus />
        </PublicRoute>
      } />

      <Route path='/chat' element={
        <ProtectedRoute allowedRole="resident">
          <PageWrapper><ChatUser /></PageWrapper>
        </ProtectedRoute >
      } />

      <Route path="/collector" element={<SideBarLayout />}>
        {/* colllector routes */}
        <Route path='profile' element={
          <ProtectedRoute allowedRole="collector">
            <PageWrapper><CollectorProfile /></PageWrapper>
          </ProtectedRoute>

        } />

        <Route path='dashboard' element={
          <ProtectedRoute allowedRole="collector">
            <PageWrapper><CollectorDash /></PageWrapper>
          </ProtectedRoute>

        } />


        <Route path='requests' element={
          <ProtectedRoute allowedRole="collector">
            <PageWrapper><CollectorRequests /></PageWrapper>
          </ProtectedRoute>
        }
        />
        <Route path="pickups" element={
          <ProtectedRoute allowedRole="collector">
            <CollectorPickups />
          </ProtectedRoute>
        } />

        <Route path='earnings' element={
          <ProtectedRoute allowedRole="collector">
            <MyEarnings />
          </ProtectedRoute>
        } />

        <Route path='feedbacks' element={
          <ProtectedRoute allowedRole="collector">
            <CollectorFeedback />
          </ProtectedRoute>
        } />

        <Route path='notifications' element={
          <ProtectedRoute allowedRole="collector">
            <PageWrapper><CollectorNotifications /></PageWrapper>
          </ProtectedRoute>
        } />

      </Route>

      <Route path='/collector/request/cancel' element={
        <ProtectedRoute allowedRole="collector">
          <CollectorCacelRequest />
        </ProtectedRoute>
      } />

      <Route path='/collector/request/on-demand/complete' element={
        <ProtectedRoute allowedRole="collector">
          <CollectorOnDemandCompleted />
        </ProtectedRoute>
      } />

      <Route path='/collector/inbox' element={
        <ProtectedRoute allowedRole="collector">
          <CollectorInbox />
        </ProtectedRoute>
      } />

      <Route path="/collector/*" element={<NotFound />} />

      {/* admin routes */}
      <Route
        path="admin/login"
        element={
          <GuestOnlyRoute>
            <PageWrapper><SignIn /></PageWrapper>
          </GuestOnlyRoute>
        }
      />


      <Route path="/admin" element={<SideBarLayout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <PageWrapper><AdmDash /></PageWrapper>
            </ProtectedRoute >
          }
        />

        <Route
          path="collectors"
          element={
            <ProtectedRoute allowedRole="admin">
              <CollectorManagement />
            </ProtectedRoute>
          }
        >
          <Route path="approved" element={<ApprovedCollectors />} />
          <Route path="requests" element={<ApprovalRequests />} />
        </Route>

        <Route
          path="users"
          element={
            <ProtectedRoute allowedRole="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path='subscriptions'
          element={
            <ProtectedRoute allowedRole="admin">
              <SubscriptionManagemnt />
            </ProtectedRoute>
          }></Route>

        <Route
          path="waste-types"
          element={
            <ProtectedRoute allowedRole="admin">
              <WasteTypesManagement />
            </ProtectedRoute>
          } />

        <Route path='payments' element={
          <ProtectedRoute allowedRole="admin">
            <PaymentAdmin />
          </ProtectedRoute>
        } />

        <Route path='feedbacks' element={
          <ProtectedRoute allowedRole="admin">
            <FeedbackAdmin />
          </ProtectedRoute>
        } />

      </Route>

      <Route
        path="/admin/collectors/:name"
        element={
          <ProtectedRoute allowedRole="admin">
            <CollectorDetails />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/*" element={<NotFound />} />

      <Route path='/map' element={
        <ProtectedRoute allowedRole="collector">
          <Map />
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes >
    </AnimatePresence>
  )
}

export default AppRoutes