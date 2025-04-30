import { createSelector } from "@reduxjs/toolkit";
import { GlobalUiState } from "./state";
import { RootState } from "./store";

export const globalUiSelector = createSelector(
  (state: RootState) => state.global.ui,
  (state: GlobalUiState) => state,
);

export const isMobileSelector = createSelector(
  globalUiSelector,
  (state: GlobalUiState) => state.isMobile,
);
