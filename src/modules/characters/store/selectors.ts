import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/config/store";
import { CharactersDataState } from "./state";

export const charactersDataSelector = (state: RootState) =>
  state.characters.data;

export const favoritesSelector = createSelector(
  charactersDataSelector,
  (state: CharactersDataState) => state.favorites
);
