
import { persistStore, persistReducer } from 'redux-persist'
import  storage  from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './slices'


// const rootReducer = {
//     auth: authReducer
// }

// const persistConfig = {
//     key: 'root',
//     storage,
//     whiteList: ['auth']
// }

// const persistedReducer =  persistReducer(persistConfig, rootReducer)

export const store = configureStore( {
    reducer: rootReducer,
})

// export const persister = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
