"use client";

import { FC, useMemo } from "react";
import { Character } from "../../types/characters.types";
import { ArrowButton } from "../arrow-button";
import styles from "./carousel-mobile.module.scss";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

type CarouselMobileProps = Readonly<{
  children?: React.ReactNode;
  characters: Character[];
}>;

const CarouselMobile: FC<CarouselMobileProps> = ({ children, characters }) => {
  const { characterId } = useParams();
  const searchParams = useSearchParams();

  const currentCharacters = useMemo(
    () => characters.findIndex((item) => String(item.id) === characterId),
    [characterId, characters]
  );

  const previousCharacter = useMemo(
    () =>
      currentCharacters > 0 ? characters[currentCharacters - 1] : undefined,
    [currentCharacters, characters]
  );

  const nextCharacter = useMemo(
    () =>
      currentCharacters < characters.length - 1
        ? characters[currentCharacters + 1]
        : undefined,
    [currentCharacters, characters]
  );

  return (
    <div className={styles.carousel}>
      <Link
        className={styles.arrow}
        href={
          previousCharacter
            ? `/characters/${previousCharacter.id}?${searchParams.toString()}`
            : ""
        }
      >
        <ArrowButton className={styles.arrowLeft} />
      </Link>
      {children}
      <Link
        className={styles.arrow}
        href={
          nextCharacter
            ? `/characters/${nextCharacter.id}?${searchParams.toString()}`
            : ""
        }
      >
        <ArrowButton className={styles.arrowRight} />
      </Link>
    </div>
  );
};

export default CarouselMobile;
