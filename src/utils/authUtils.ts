
import { store } from '../redux/store';
import { refreshToken } from '../redux/slices/authSlice';
import { fetchUserProfile } from '../redux/slices/userSlice';
import { fetchCollectorProfile } from '../redux/slices/collectorSlice';

export const initializeAuth = async () => {
  try {
    const resultAction = await store.dispatch(refreshToken());
    const role = resultAction.payload.role
    console.log('access token ', resultAction.payload.accessToken)
    
    if (refreshToken.fulfilled.match(resultAction)) {

      if(role === 'resident'){
        await store.dispatch(fetchUserProfile())
      }else if(role === 'collector'){
        await store.dispatch(fetchCollectorProfile())
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to initialize authentication', error);
    return false;
  }
};