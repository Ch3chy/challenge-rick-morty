import { FC } from "react";
import { Character } from "../../types/characters.types";
import styles from "./character-card.module.scss";
import Image from "next/image";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type CharacterCardProps = Readonly<{
  character: Character;
  isActive?: boolean;
  isLiked?: boolean;
  onLikeClick?: () => void;
}>;

const CharacterCard: FC<CharacterCardProps> = ({
  character,
  isActive,
  isLiked,
  onLikeClick,
}) => {
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onLikeClick) {
      onLikeClick();
    }
  };

  return (
    <Link
      href={`/characters/${character.id}`}
      className={`${styles.card} ${isActive ? styles.active : ""}`}
    >
      <h3 className={styles.name}>{character.name}</h3>
      <figure className={styles.image}>
        <Image
          src={character.image}
          alt={character.name}
          width={100}
          height={100}
        />
      </figure>
      <button
        className={`${styles.like} ${isLiked ? styles.liked : ""}`}
        onClick={(e) => handleLike(e)}
      >
        <Heart className={styles.likeIcon} /> Like
      </button>
    </Link>
  );
};

export default CharacterCard;
