import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCollectorsApi, fetchUsersApi } from "../../api/adminServices";



export const fetchUsers = createAsyncThunk('admin/fetchUsers', async (_, {rejectWithValue}) => {
    try {
        const response = await fetchUsersApi()
        return response
    } catch (error: any) {
        return rejectWithValue(error?.response)
    }
})

export const fetchCollectors = createAsyncThunk('admin/fetchCollectors', async(approvedStatus: string, {rejectWithValue}) => {
    try {
        const response = await fetchCollectorsApi(approvedStatus)
        return response
    } catch (error: any) {
        return rejectWithValue(error?.response)
    }
})

const initialState = {
    residents: [],
    collectors: []
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.residents = action.payload.users
        })

        .addCase(fetchCollectors.fulfilled, (state, action) => {
            state.collectors = action.payload.collectors
        })
    }

})


export default adminSlice