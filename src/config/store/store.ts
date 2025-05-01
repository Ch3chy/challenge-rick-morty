import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import globalReducer from "./slices";
import charactersReducer from "@/modules/characters/store/slices";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    characters: charactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
