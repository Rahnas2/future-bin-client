
import axios from "axios";
import axiosInstance from "./axiosInstance";

export const sendOtpService = async (email: string) =>{
    const response = await axiosInstance.post('/resent-otp', {email})
    return response.data
}

export const verifyOtpService = async (email: string, otp: string) =>{
    const response = await axiosInstance.post('/register/verify-otp', {email, otp})
    console.log('response ', response)
    return response.data
}

export const basicInfoApi = async (userData: any) =>{
    const response = await axiosInstance.post('/register/basic-info', {userData})
    console.log('response ', response)
    return response.data
}

export const updateRoleApi = async (email: string, role: string) => {
    const response = await axiosInstance.post('/register/update-role', {email, role})
    console.log('respnse ', response)
    return response.data
}

export const completeProfileApi = async (formData: FormData) => {
    const response = await axiosInstance.post('/register/complete-profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
          },
    } )
    console.log('api service -> compleate profile', response)
    return response.data
}

export const loginApi = async(email: string, password: string) => {
    const response = await axiosInstance.post('/login', {email, password})
    console.log('reponse from api service ', response)
    return response.data
}


export const googleLoginApi = async(code:string) =>{
    const response = await axiosInstance.get(`/login/google?code=${code}`)
    return response.data
}

export const adminLoginApi = async (email: string, password: string, secret: string) => {
    const response = await axiosInstance.post('/admin/login', {email, password, secret})
    return response
}

export const refreshTokenApi = async () => {
    const response = await axiosInstance.get('/refresh-token')
    return response.data
}


export const logOutApi = async () => {
    const response = await axiosInstance.post('/logout')
    return response.data
}