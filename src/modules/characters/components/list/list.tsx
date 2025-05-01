"use client";

import { FC, useCallback, useMemo } from "react";
import { Character } from "../../types/characters.types";
import { useParams } from "next/navigation";
import { CharacterCard } from "../character-card";
import styles from "./list.module.scss";
import { actions } from "../../store/slices";
import { useAppDispatch } from "@/config/store";
import { useSelector } from "react-redux";
import { favoritesSelector } from "../../store/selectors";

type ListProps = Readonly<{
  characters: Character[][];
  className?: string;
}>;

const List: FC<ListProps> = ({ characters, className }) => {
  const { characterId } = useParams();
  const dispatch = useAppDispatch();
  const favorites = useSelector(favoritesSelector);

  const currentCharacter = useMemo(
    () =>
      characters.find((group) =>
        group.some((character) => String(character.id) === characterId)
      ) || characters[0],
    [characters, characterId]
  );

  const isFavorite = useCallback(
    (character: Character) =>
      favorites.some((favorite) => favorite.id === character.id),
    [favorites]
  );

  const handleLike = (character: Character) => {
    if (isFavorite(character)) {
      dispatch(actions.removeFavorite(character));
    } else {
      dispatch(actions.addFavorite(character));
    }
  };

  return (
    <section className={`${styles.list} ${className || ""}`}>
      {currentCharacter.map((character) => (
        <CharacterCard
          key={`character-card-${character.id}`}
          character={character}
          isActive={String(character.id) === characterId}
          isLiked={isFavorite(character)}
          onLikeClick={() => handleLike(character)}
        />
      ))}
    </section>
  );
};

export default List;
