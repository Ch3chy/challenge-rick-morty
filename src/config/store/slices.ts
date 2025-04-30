import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.ui.isMobile = action.payload;
    },
  },
});

export const actions = globalSlice.actions;
export default globalSlice.reducer;
