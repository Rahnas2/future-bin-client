import { JwtPayload } from "jwt-decode";

export interface extendedJwt extends JwtPayload {
    _id: string; 
    role: string
  }