
import { store } from '../redux/store';
import { refreshToken } from '../redux/slices/authSlice';

export const initializeAuth = async () => {
  try {
    const resultAction = await store.dispatch(refreshToken());
    console.log('result action', resultAction)
    
    if (refreshToken.fulfilled.match(resultAction)) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to initialize authentication', error);
    return false;
  }
};