import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './cartSlice'

const rootReducer= combineReducers({
  reducer: reducer
})

const persistConfig={
  key: "root",
  storage,
  whitelist:['reducer']
}
const persistedReducer=persistReducer(persistConfig, rootReducer )
export const store = configureStore({
  reducer: persistedReducer,
})
export const  persistor = persistStore(store)