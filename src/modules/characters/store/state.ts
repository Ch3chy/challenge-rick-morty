import { Character } from "../types/characters.types";

export interface CharactersDataState {
  favorites: Character[];
}

export interface CharactersState {
  data: CharactersDataState;
}

export const initialState: CharactersState = {
  data: {
    favorites: [],
  },
};
