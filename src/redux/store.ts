import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import cartReducer from "./cartSlice";
// import createSagaMiddleware from 'redux-saga';
// import { apiDataReducer, watchFetchData } from './sagas';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // Optionally, whitelist or blacklist specific reducers
  // whitelist: ['reducer1'], // Only persist reducer1
  // blacklist: ['reducer2'], // Don't persist reducer2
}
 
const rootReducer = combineReducers({
  cart: persistReducer(persistConfig, cartReducer),
  // cartDatas: persistReducer(persistConfig, apiDataReducer),
})

// const sagaMiddleware = createSagaMiddleware();
 
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    // .concat(sagaMiddleware),
})

// sagaMiddleware.run(watchFetchData);
 
export const persistor = persistStore(store);

export default store;
