import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { adminLoginApi, basicInfoApi, completeProfileApi, facebookLoginApi, fbRegisterApi, googleLoginApi, googleRegisterApi, loginApi, logOutApi, refreshTokenApi, sendOtpService as sendOtpApi, updateRoleApi } from "../../api/authService";
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

export const googleRegister = createAsyncThunk('auth/googleRegister', async (code: string, {rejectWithValue}) => {
    try {
        const response = await googleRegisterApi(code)
        return response
    } catch (error: any) {
        console.error('error google register from slice', error)
        return rejectWithValue(error.response.data || 'something went wrong')
    }
})

export const fbRegister = createAsyncThunk('auth/fbRegister', async({userId, accessToken}: {userId: string, accessToken: string}, {rejectWithValue} ) => {
    try {
        const response = await fbRegisterApi(userId, accessToken)
        return response
    } catch (error: any) {
        return rejectWithValue(error.response.data || {message:'something went wrong'})
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
        return rejectWithValue(error?.response?.data || 'someting went wrong') 
    }
})

export const googleLogin = createAsyncThunk('/auth/googleLogin', async (code: string, { rejectWithValue }) => {
    try {
        const response = await googleLoginApi(code)
        console.log('response ', response)
        return response
    } catch (error: any) {
        console.log('the error ', error)
        return rejectWithValue(error?.response?.data || 'someting went wrong')
    }
})

export const facebookLogin = createAsyncThunk('/auth/facebookLogin', async({userId, accessToken}: {userId: string, accessToken: string}, {rejectWithValue}) => {
    try {
        console.log('user id ', userId)
        console.log('acccess token ', accessToken)
        const response = await facebookLoginApi(userId, accessToken)
        return response
    } catch (error: any) {
        console.log('error from slice facebook login', error)
        return rejectWithValue(error.response.data || {message: 'somthing went wrong'})
    }
})

export const adminLogin = createAsyncThunk('/auth/adminLogin', async ({ email, password, secret }: { email: string, password: string, secret: string }, { rejectWithValue }) => {
    try {
        const response = await adminLoginApi(email, password, secret)
        return response
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

            .addCase(googleRegister.fulfilled, (state, action) => {
                state.email = action.payload.email
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
                state.isLoading = false
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true
            })

            .addCase(login.rejected, (state) => {
                state.isLoading = false
            })


            //google login
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.role = action.payload.role
            })

            //facebook login
            .addCase(facebookLogin.fulfilled, (state, action) => {
                console.log('fullfilled facebook login ', action)
                state.accessToken = action.payload.accessToken
                state.role = action.payload.role
            })

            .addCase(completeProfile.pending, (state) => {
                state.isLoading = true
            })

            //completeProfile 
            .addCase(completeProfile.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.role = action.payload.role
                state.isLoading = false
            })

            .addCase(completeProfile.rejected, (state) => {
                state.isLoading = false
            })

            //admin login
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken
                state.role = action.payload.role
            })

            .addCase(refreshToken.fulfilled, (state, action) => {
                console.log('action', action)
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