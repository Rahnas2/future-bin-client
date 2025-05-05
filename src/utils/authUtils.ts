
import { store } from '../redux/store';
import { refreshToken } from '../redux/slices/authSlice';
import { fetchUserProfile } from '../redux/slices/userSlice';
import { fetchCollectorProfile } from '../redux/slices/collectorSlice';

export const initializeAuth = async () => {
  try {
    const resultAction = await store.dispatch(refreshToken())
    console.log('result action ', resultAction)
    const role = resultAction.payload.role
    
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