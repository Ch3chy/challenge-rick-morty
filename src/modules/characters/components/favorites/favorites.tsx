"use client";

import { FC, useCallback, useRef, useState } from "react";
import styles from "./favorites.module.scss";
import { useSelector } from "react-redux";
import { favoritesSelector } from "../../store/selectors";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useAppDispatch } from "@/config/store";
import { actions } from "../../store";
import { Character } from "../../types/characters.types";

type FavoritesProps = Readonly<{
  className?: string;
}>;

const Favorites: FC<FavoritesProps> = ({ className }) => {
  const favorites = useSelector(favoritesSelector);
  const dispatch = useAppDispatch();

  const listRef = useRef<HTMLDivElement>(null);
  const [openList, setOpenList] = useState(false);

  const handleRemoveFavorite = (character: Character) => {
    dispatch(actions.removeFavorite(character));
  };

  const handleCloseOptions = useCallback((event?: Event) => {
    if (!event || !listRef.current?.contains(event.target as Node)) {
      setOpenList(false);
      document.removeEventListener("mousedown", handleCloseOptions, false);
    }
  }, []);

  const handleClick = () => {
    setOpenList(!openList);
    document.addEventListener("mousedown", handleCloseOptions, false);
  };

  return (
    <div className={`${styles.favorites} ${className || ""}`} ref={listRef}>
      {!openList && (
        <button
          className={`${styles.button} ${styles.item}`}
          onClick={handleClick}
        >
          Favs
        </button>
      )}
      {openList && (
        <ul className={styles.list}>
          {favorites.map((favorite) => (
            <li className={styles.item} key={`favorite-${favorite.id}`}>
              <span className={styles.name}>{favorite.name}</span>
              <button
                className={styles.remove}
                onClick={() => handleRemoveFavorite(favorite)}
              >
                <Trash />
              </button>
            </li>
          ))}
          {favorites.length === 0 && (
            <li className={styles.item}>
              <span className={styles.name}>No favorites</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
