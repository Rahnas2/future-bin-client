import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { adminLoginApi, basicInfoApi, completeProfileApi, googleLoginApi, loginApi, logOutApi, refreshTokenApi, sendOtpService as sendOtpApi, updateRoleApi } from "../../api/authService";
import { verifyOtpService as verifyOtpApi } from "../../api/authService";


export const sendOtp = createAsyncThunk('auth/sendOtp', async (email: string, { rejectWithValue }) => {
    try {
        const response = await sendOtpApi(email)
        return response
    } catch (error: any) {
        console.log('something went wrong ayittund ', error)
        return rejectWithValue(error.message)
    }
})

export const verifyOtp = createAsyncThunk('auth/verifyOtp', async (
    { email, otp }: { email: string, otp: string },
    { rejectWithValue }
) => {
    try {
        const response = await verifyOtpApi(email, otp)
        console.log('response ', response)
        return response
    } catch (error: any) {
        console.error('error ', error)
        return rejectWithValue(error.response.data)
    }
})


export const basicInfo = createAsyncThunk('auth/basicInfo', async (userData: any, { rejectWithValue }) => {
    try {
        const response = await basicInfoApi(userData)
        console.log('the baseic info response')
        return response
    } catch (error: any) {
        console.error(error)
        return rejectWithValue(error.response.data)
    }
})

export const updateRole = createAsyncThunk('/auth/updateRole', async ({ email, role }: { email: string, role: string }, { rejectWithValue }) => {
    try {
        console.log('email and role ', email, role)
        const response = await updateRoleApi(email, role)
        return response
    } catch (error: any) {
        console.error('error ', error)
        return rejectWithValue(error.respnse.data)
    }
})

export const completeProfile = createAsyncThunk('/auth/completeProfile', async (formData: FormData, { rejectWithValue }) => {
    try {
        const response = await completeProfileApi(formData)
        console.log('response from slice ', response)
        return response
    } catch (error: any) {
        console.log('complete profile slice error ', error)
        return rejectWithValue(error?.response?.data || 'someting went wrong' )
    }
})

export const login = createAsyncThunk('/auth/login', async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await loginApi(email, password)
        console.log('response from slice login', response)
        return response
    } catch (error: any) {
        console.log('error response form slice ', error)
        return rejectWithValue(error.response.data)
    }
})

export const googleLogin = createAsyncThunk('/auth/googleLogin', async (code: string, { rejectWithValue }) => {
    try {
        const response = await googleLoginApi(code)
        console.log('response ', response)
        return response
    } catch (error: any) {
        console.log('the error ', error)
        return rejectWithValue(error.response.data)
    }
})

export const adminLogin = createAsyncThunk('/auth/adminLogin', async ({ email, password, secret }: { email: string, password: string, secret: string }, { rejectWithValue }) => {
    try {
        const response = await adminLoginApi(email, password, secret)
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

export const refreshToken = createAsyncThunk('/auth/refreshToken', async (_, { rejectWithValue }) => {
    try {
        const response = await refreshTokenApi();
        console.log('response datra ', response)
        return response
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to refresh token');
    }
});

export const logOut = createAsyncThunk('/auth/logOut', async(_, {rejectWithValue}) => {
    try {
        const response = await logOutApi()
        return response
    } catch (error: any) {
        return rejectWithValue(error.response.data || 'error')
    }
})

interface authState {
    accessToken: null | string,
    email: null | string
    role: string | null
    isLoading: boolean
}

const initialState: authState = {
    accessToken: null,
    email: null,
    role: null,
    isLoading: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(basicInfo.pending, state => {
                state.isLoading = true
            })
            .addCase(basicInfo.fulfilled, (state, action) => {
                state.email = action.payload.email
                state.isLoading = false
            })
            .addCase(basicInfo.rejected, state => {
                state.isLoading = false
            })

            //verify otp 
            .addCase(verifyOtp.pending, state => {
                state.isLoading = true
            })

            .addCase(verifyOtp.fulfilled, state => {
                state.isLoading = false
            })

            .addCase(verifyOtp.rejected, (state) => {
                state.isLoading = false
            })

            //login
            .addCase(login.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.role = action.payload.role
            })

            //completeProfile 
            .addCase(completeProfile.fulfilled, (state, action) => {
                console.log('complete profile action ', action)
                state.accessToken = action.payload.accessToken
                state.role = action.payload.role
            })

            //admin login
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.role = action.payload.role
            })

            .addCase(refreshToken.fulfilled, (state, action) => {
                console.log('actoin', action)
                state.accessToken = action.payload.accessToken;
                state.role = action.payload.role
            })

            .addCase(refreshToken.rejected, (state) => {
                state.accessToken = null;
                state.role = null
            })

            //logout
            .addCase(logOut.fulfilled, state => {
                state.accessToken = null
                state.role = null
            })
    }
})


export default authSlice