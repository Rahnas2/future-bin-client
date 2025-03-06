import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../types/UserType";
import { fetchUserProfileApi } from "../../api/userService";



export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await fetchUserProfileApi()
        return response
    } catch (error: any) {
        console.log('api service -> fetch user profile ', error)
        return rejectWithValue(error?.response?.message || 'something went wrong')
    }
})
interface userState {
    user: null | Partial<UserType>,
}

const initialState: userState = {
    user: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload.user
        })
    }
})

export default userSlice