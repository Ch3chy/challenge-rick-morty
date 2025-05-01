import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalReducer from "./slices";
import charactersReducer from "@/modules/characters/store/slices";

const persistConfig = {
  key: "root-state",
  storage,
  whitelist: ["characters"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    global: globalReducer,
    characters: charactersReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
