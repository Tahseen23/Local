import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import slice from './slice.js';

const persistConfig = {
  key: 'root',
  storage,
};

const reducer=combineReducers({
  sliceData:slice
})


const persistedReducer=persistReducer(persistConfig,reducer)


export const store = configureStore({
  reducer: persistedReducer
})



