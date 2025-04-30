export interface GlobalUiState {
  isMobile: boolean;
}

export interface GlobalState {
  ui: GlobalUiState;
}

export const initialState: GlobalState = {
  ui: {
    isMobile: false,
  },
};
