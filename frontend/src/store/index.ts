import { configureStore } from "@reduxjs/toolkit"
import knnReducer from './knnSlise'

export const store = configureStore({
  reducer: {
    knnSlice: knnReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;