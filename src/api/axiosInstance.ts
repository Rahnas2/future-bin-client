
import axios from 'axios'

import { store } from '../redux/store'
import { logOut, refreshToken } from '../redux/slices/authSlice'

const baseURL = import.meta.env.VITE_BACKEND_URI

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true
})


axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('response from interseptor ', error)

    //handling access token 
    if (error.response?.status === 401 && error.response.data.message === 'Unauthorized' && !originalRequest._retry) {
      console.log('hello ')
      originalRequest._retry = true;
      try {
        const response = await store.dispatch(refreshToken()).unwrap();
        const newToken = response.accessToken;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        await store.dispatch(logOut());
        const currentPath = window.location.pathname;
        const isAdminRoute = currentPath.startsWith('/admin');
        const redirectTo = isAdminRoute ? '/admin/login' : '/';
        window.localStorage.href = redirectTo
        return Promise.reject(refreshError)
      }
    }

    //handling blocked user
    if (error.response?.status === 403 && error.response.data.message === 'you are blocked by admin') {
      await store.dispatch(logOut())
      window.location.href = '/login'
    }

    return Promise.reject(error);
  }
);

export default axiosInstance