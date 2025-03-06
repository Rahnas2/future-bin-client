import { combineSlices } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import adminSlice from './adminSlice'
import userSlice from './userSlice'
import collectorslice from './collectorSlice'

export const rootReducer = combineSlices(authSlice, adminSlice, userSlice, collectorslice)

export type IRootState = ReturnType<typeof rootReducer>