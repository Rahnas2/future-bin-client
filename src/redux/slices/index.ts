import {  AnyAction, combineSlices } from '@reduxjs/toolkit'

import authSlice, { logOut } from './authSlice'
import adminSlice from './adminSlice'
import userSlice from './userSlice'
import collectorslice from './collectorSlice'
import wasteTypeSlice from './wasteTypesSlice'

const combinedReducer  = combineSlices(authSlice, adminSlice, userSlice, collectorslice, wasteTypeSlice)

export const rootReducer = (state: ReturnType<typeof combinedReducer> | undefined, action: AnyAction) => {
    if(action.type === logOut.fulfilled.type){
        state = undefined
    }
    return combinedReducer(state, action)
}

export type IRootState = ReturnType<typeof rootReducer>