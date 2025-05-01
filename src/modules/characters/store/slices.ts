import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { Character } from "../types/characters.types";

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Character>) => {
      state.data.favorites = [...state.data.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<Character>) => {
      state.data.favorites = state.data.favorites.filter(
        (favorite) => favorite.id !== action.payload.id
      );
    },
  },
});

export const actions = charactersSlice.actions;
export default charactersSlice.reducer;
