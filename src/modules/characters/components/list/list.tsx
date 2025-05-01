"use client";

import { FC, useMemo } from "react";
import { Character } from "../../types/characters.types";
import { useParams } from "next/navigation";
import { CharacterCard } from "../character-card";
import styles from "./list.module.scss";

type ListProps = Readonly<{
  characters: Character[][];
  className?: string;
}>;

const List: FC<ListProps> = ({ characters, className }) => {
  const { characterId } = useParams();

  const currentCharacter = useMemo(
    () =>
      characters.find((group) =>
        group.some((character) => String(character.id) === characterId)
      ) || characters[0],
    [characters, characterId]
  );

  return (
    <section className={`${styles.list} ${className || ""}`}>
      {currentCharacter.map((character) => (
        <CharacterCard
          key={`character-card-${character.id}`}
          character={character}
          isActive={String(character.id) === characterId}
        />
      ))}
    </section>
  );
};

export default List;
