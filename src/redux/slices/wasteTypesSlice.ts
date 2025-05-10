import { addWasteTypeApi, deleteWasteTypeApi, editWasteTypeApi, fetchAllWasteTypesApi } from "@/api/adminServices";
import { wasteType } from "@/types/wasteTyp";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch waste types (used in both admin and user sides)
export const fetchWasteTypes = createAsyncThunk("wasteTypes/fetch", async ({page, limit, search}: {page: number, limit: number, search: string}, { rejectWithValue }) => {
    try {
        const response = await fetchAllWasteTypesApi(page, limit, search)
        console.log('response in slice fetch waste types ', response)
        return response
    } catch (error: any) {
        console.log('error response in slice fetch waste types ', error)
        return rejectWithValue(error?.response?.data.message || 'something went wrong')
    }

});


export const addWasteType = createAsyncThunk("wasteTypes/add", async ({ name, price }: { name: string, price: number }, { rejectWithValue }) => {
    try {
        const response = await addWasteTypeApi(name, price)
        return response;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data.message || 'something went wrong')
    }
});

export const editWasteType = createAsyncThunk("wasteTypes/edit", async (data: Partial<wasteType>, { rejectWithValue }) => {
    try {
        const response = await editWasteTypeApi(data)
        return response;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data.message || 'something went wrong')
    }
});

export const deleteWasteType = createAsyncThunk("wasteTypes/delete", async (id: string, { rejectWithValue }) => {
    try {
        await deleteWasteTypeApi(id)
        return id;
    } catch (error: any) {
        return rejectWithValue(error?.response?.data.message || 'something went wrong')
    }
});

interface WasteTypeState {
    wasteTypes: wasteType[] | null;
    loading: boolean;
    initialized: boolean
}

const initialState: WasteTypeState = {
    wasteTypes: null,
    loading: false,
    initialized: false
};

const wasteTypeSlice = createSlice({
    name: "wasteTypes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Waste Types
            .addCase(fetchWasteTypes.pending, (state) => {
                console.log('fetching...')
                state.loading = true;
            })
            .addCase(fetchWasteTypes.fulfilled, (state, action) => {
                console.log('fetch success ')
                state.loading = false;
                state.initialized = true;
                state.wasteTypes = action.payload.wasteTypes;
            })
            .addCase(fetchWasteTypes.rejected, (state) => {
                console.log('fetch rejected')
                state.loading = false;
                state.initialized = true;
            })

            // Add Waste Type
            .addCase(addWasteType.fulfilled, (state, action) => {
                if (state.wasteTypes) {
                    state.wasteTypes.push(action.payload.wasteType);
                } else {
                    state.wasteTypes = [action.payload];
                }
            })

            // Edit Waste Type
            .addCase(editWasteType.fulfilled, (state, action) => {
                state.loading = false;
                if (state.wasteTypes) {
                    const index = state.wasteTypes.findIndex(
                        (wt) => wt._id === action.payload.updatedWasteType._id
                    );
                    if (index !== -1) {
                        state.wasteTypes[index] = action.payload;
                    }
                }
            })

            // Delete Waste Type
            .addCase(deleteWasteType.fulfilled, (state, action) => {
                state.loading = false;
                if (state.wasteTypes) {
                    state.wasteTypes = state.wasteTypes.filter(
                        (wt) => wt._id !== action.payload
                    );
                }
            })

    }
});


export default wasteTypeSlice