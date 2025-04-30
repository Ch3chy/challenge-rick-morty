import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import globalReducer from "./slices";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
