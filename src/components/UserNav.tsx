
// UserNav.jsx - Updated with responsive mobile menu
import { useState, useEffect } from "react";
import { MdOutlineMessage, MdNotificationsNone, MdMenu, MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { MdOutlineSubscriptions, MdFeedback, MdOutlinePayments, MdLogout } from "react-icons/md";
import brand from '../assets/logo (1).png';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/slices";
import { incrementChat, incrementNotification, setCounts } from "@/redux/slices/countSlice";
import { getSocket } from "@/services/socket";
import { fetchOverviewCountsApi } from "@/api/overviewService";
import { logOut } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { ArrowBigDownDash } from "lucide-react";

const UserNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardSubmenuOpen, setDashboardSubmenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const socket = getSocket();

  const { accessToken } = useSelector((state: IRootState) => state.auth)

  const { unreadNotificationCount, unreadChatCount } = useSelector((state: IRootState) => state.overview);

  // Check if current route is a dashboard route
  const isDashboardRoute =
    location.pathname === '/profile' ||
    location.pathname === '/subscription' ||
    location.pathname === '/pickup-requests' ||
    location.pathname === '/feedback' ||
    location.pathname === '/transactions';

  // Auto-open dashboard submenu if we're on a dashboard page on mobile
  useEffect(() => {
    if (isDashboardRoute && window.innerWidth < 1024) {
      setDashboardSubmenuOpen(true);
    }
  }, [location.pathname, isDashboardRoute]);

  // Fetch notification counts
  useEffect(() => {
    if (!accessToken) return
    const fetchCounts = async () => {
      try {
        const result = await fetchOverviewCountsApi();
        dispatch(setCounts({
          unreadNotificationCount: result.counts.unreadNotifications,
          unreadChatCount: result.counts.unreadChats
        }));
      } catch (error) {
        console.error('error fetching unread counts ', error);
      }
    };
    fetchCounts();
  }, [dispatch]);

  // Socket listeners for notifications
  useEffect(() => {
    if (!accessToken) return;

    const socketInstance = getSocket();

    socketInstance.on('new-notification', () => {
      dispatch(incrementNotification());
    });

    socketInstance.on('new-chat', () => {
      dispatch(incrementChat());
    });

    return () => {
      socketInstance.off('new-notification');
      socketInstance.off('new-chat');
    };
  }, [accessToken, dispatch]);

  // useEffect(() => {
  //   socket.on('new-notification', () => {
  //     dispatch(incrementNotification());
  //   });

  //   socket.on('new-chat', () => {
  //     dispatch(incrementChat());
  //   });

  //   return () => {
  //     socket.off('new-notification');
  //     socket.off('new-chat');
  //   };
  // }, [socket, dispatch]);

  // Handle logout
  const handleLogOut = async () => {
    try {
      await dispatch(logOut()).unwrap();
      navigate('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.log('log out error ', error);
    }
  };

  // Close menu after navigation
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Toggle dashboard submenu
  const toggleDashboardSubmenu = (e: any) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      setDashboardSubmenuOpen(!dashboardSubmenuOpen);
    }
  };

  return (
    <nav className="relative z-50">
      {/* Main Nav Bar */}
      <div className="flex items-center justify-evenly lg:justify-around ">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-1 opacity-50 hover:opacity-100 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>

        {/* Logo */}
        <div>
          <img className="w-34 md:w-40 f" src={brand} alt="Logo" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-10 font-medium ">
          <NavLink to="/" className={({ isActive }) => isActive ? "border-b border-b-accent2 pb-1" : "hover:text-accent3"}>
            <span>Home</span>
          </NavLink>

          {accessToken ? <NavLink
            to="/profile"
            className={({ isActive }) => `${(isActive || isDashboardRoute) ? "border-b border-b-accent2 pb-1" : "hover:text-accent3"}`}
          >
            <span>Dashboard</span>
          </NavLink> : <></>
          }

          <NavLink to="/about-us" className={({ isActive }) => isActive ? "border-b border-b-accent2  pb-1" : "hover:text-accent3"}>
            <span>About us</span>
          </NavLink>

          <NavLink to="/available-plans" className={({ isActive }) => isActive ? "border-b border-b-accent2  pb-1" : "hover:text-accent3"}>
            <span>Subscription plans</span>
          </NavLink>
        </div>

        {/* Notification Icons (visible on all screens) & Mobile menu toggle */}
        {accessToken ? <div className="flex gap-6 items-center text-2xl">
          <NavLink to="/chat">
            <Badge badgeContent={unreadChatCount} color="error">
              <MdOutlineMessage className="inline" />
            </Badge>
          </NavLink>
          <NavLink to="/notifications">
            <Badge badgeContent={unreadNotificationCount} color="error">
              <MdNotificationsNone className="inline" />
            </Badge>
          </NavLink>

        </div> :
          <div>
            <button onClick={() => navigate('/login')} className="bg-accent2 rounded-sm text-sm font-semibold text-primary px-4 py-1 cursor-pointer transform duration-300 ease-in-out hover:scale-105">Login</button>
          </div>
        }


      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 shadow-md z-50 py-4 px-6 flex flex-col gap-4 items-center justify-evenly  bg-seconday border-gray-200 ">
          <NavLink
            to="/"
            className={({ isActive }) => `py-2 ${isActive ? "text-accent2 font-semibold" : "hover:text-accent3"}`}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

          {/* Dashboard with submenu */}
          {accessToken ? <div className="flex flex-col">
            <div
              className={`py-2 flex justify-between items-center cursor-pointer ${isDashboardRoute ? "text-accent2 font-semibold" : "hover:text-accent3"}`}
              onClick={toggleDashboardSubmenu}
            >
              <span>Dashboard</span>
              <span className="transform transition-transform duration-200" style={{ transform: dashboardSubmenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
              <ArrowBigDownDash className="w-4 h-4 ml-2" />
              </span>
            </div>

            {/* Dashboard submenu */}
            {dashboardSubmenuOpen && (
              <div className="ml-4 flex flex-col gap-3 mt-2 border-l-2 border-gray-700 pl-4">
                <NavLink
                  to="/profile"
                  className={({ isActive }) => `py-1 flex items-center gap-2 ${isActive ? "text-accent3 font-semibold" : "hover:text-accent3"}`}
                  onClick={closeMobileMenu}
                >
                  <FaUserCircle />
                  <span>Profile</span>
                </NavLink>

                <NavLink
                  to="/subscription"
                  className={({ isActive }) => `py-1 flex items-center gap-2 ${isActive ? "text-accent3 font-semibold" : "hover:text-accent3"}`}
                  onClick={closeMobileMenu}
                >
                  <MdOutlineSubscriptions />
                  <span>Subscription</span>
                </NavLink>

                <NavLink
                  to="/pickup-requests"
                  className={({ isActive }) => `py-1 flex items-center gap-2 ${isActive ? "text-accent3 font-semibold" : "hover:text-accent3"}`}
                  onClick={closeMobileMenu}
                >
                  <FaCodePullRequest />
                  <span>Request</span>
                </NavLink>

                <NavLink
                  to="/feedback"
                  className={({ isActive }) => `py-1 flex items-center gap-2 ${isActive ? "text-accent3 font-semibold" : "hover:text-accent3"}`}
                  onClick={closeMobileMenu}
                >
                  <MdFeedback />
                  <span>Feedback</span>
                </NavLink>

                <NavLink
                  to="/transactions"
                  className={({ isActive }) => `py-1 flex items-center gap-2 ${isActive ? "text-accent3 font-semibold" : "hover:text-accent3"}`}
                  onClick={closeMobileMenu}
                >
                  <MdOutlinePayments />
                  <span>Transactions</span>
                </NavLink>
              </div>
            )}
          </div> : <></>}

          <NavLink
            to="/about-us"
            className={({ isActive }) => `py-2 ${isActive ? "text-accent2 font-semibold" : "hover:text-accent3"}`}
            onClick={closeMobileMenu}
          >
            About us
          </NavLink>

          <NavLink
            to="/available-plans"
            className={({ isActive }) => `py-2 ${isActive ? "text-accent2 font-semibold" : "hover:text-accent3"}`}
            onClick={closeMobileMenu}
          >
            Subscription plans
          </NavLink>

          {accessToken ? <div
            className="py-2 flex items-center gap-2 cursor-pointer hover:text-accent3"
            onClick={handleLogOut}
          >
            <MdLogout />
            <span>Logout</span>
          </div> : <></>}
          
        </div>
      )}
    </nav>
  );
};

export default UserNav;