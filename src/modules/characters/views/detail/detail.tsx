import { UrlParams } from "@/config/types/urls.types";
import { FC } from "react";
import { getCharacter } from "rickmortyapi";
import styles from "./detail.module.scss";
import Image from "next/image";

export type DetailProps = {
  params: UrlParams;
};

const Detail: FC<DetailProps> = async ({ params }) => {
  const { characterId } = await params;
  const characterResponse = await getCharacter(Number(characterId));
  const character = characterResponse.data;

  return (
    <article className={styles.detail}>
      <div className={`${styles.status} detail-status__${character.status}`}>
        {character.status}
      </div>
      <figure className={styles.image}>
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
        />
      </figure>
      <div className={styles.info}>
        <h2 className={styles.name}>{character.name}</h2>
        <p className={styles.species}>{character.species}</p>
        <div className={styles.data}>
          <p>
            <span>Origin</span>
            {character.origin.name}
          </p>
          <p>
            <span>Location</span>
            {character.location.name}
          </p>
          <p>
            <span>Gender</span>
            {character.gender}
          </p>
          <p>
            <span>Episodes</span>
            {character.episode.length}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Detail;
