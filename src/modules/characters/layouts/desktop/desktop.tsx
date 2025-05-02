import { FC } from "react";
import styles from "./desktop.module.scss";
import { Character } from "../../types/characters.types";
import { arrayToGroups } from "@/config/utils/arrays.utils";
import { List } from "../../components/list";
import { SearchCharacter } from "../../components/search-character";
import { Favorites } from "../../components/favorites";
import { CarouselMobile } from "../../components/carousel-mobile";

type DesktopLayoutProps = Readonly<{
  children?: React.ReactNode;
  characters: Character[];
}>;

const DesktopLayout: FC<DesktopLayoutProps> = ({ children, characters }) => {
  const charactersGroups = arrayToGroups(characters, 4);

  return (
    <div className={styles.layout}>
      <div className={styles.detail}>{children}</div>
      <div className={styles.data}>
        <SearchCharacter
          characters={charactersGroups}
          className={styles.search}
        />
        <CarouselMobile characters={characters}>
          <List characters={charactersGroups} className={styles.list} />
        </CarouselMobile>
        <div className={styles.favorites}>
          <Favorites />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
