import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CollectorType } from "../../types/CollectorType";
import { fetchCollectorProfileApi } from "../../api/collectorServices";

export const fetchCollectorProfile = createAsyncThunk('/collector/fetchCollectorProfile', async(_, {rejectWithValue}) => {
    try {
        const response = await fetchCollectorProfileApi()
        return response
    } catch (error: any) {
        console.error('slice fetch collector error ', error)
        return rejectWithValue(error?.response?.message || 'something went wrong')
    }
})

interface collectorState {
    collector: null | Partial<CollectorType>
}

const initialState: collectorState = {
    collector: null
}
const collectorslice = createSlice({
    name: 'collector',
    initialState,
    reducers: {
        changeWorkStatus: (state, action: PayloadAction<string>) => {
            if(!state.collector || !state.collector.details) return 

            state.collector.details.status = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCollectorProfile.fulfilled, (state, action) => {
            state.collector = action.payload.collector
        })

    }
})

export const { changeWorkStatus } = collectorslice.actions

export default collectorslice