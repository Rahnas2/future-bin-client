import {jwtDecode} from 'jwt-decode';
import { extendedJwt } from '../interfaces/extendedJwt';

export const getUserId = (token: string) => {
    const decode: extendedJwt = jwtDecode(token)
    return decode._id
}