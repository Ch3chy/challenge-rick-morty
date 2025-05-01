import { FC } from "react";
import styles from "./mobile.module.scss";
import Image from "next/image";
import { CarouselMobile } from "../../components/carousel-mobile";
import { Character } from "../../types/characters.types";
import { List } from "../../components/list";
import { arrayToGroups } from "@/config/utils/arrays.utils";
import { Favorites } from "../../components/favorites";

type MobileLayoutProps = Readonly<{
  children?: React.ReactNode;
  characters: Character[];
}>;

const MobileLayout: FC<MobileLayoutProps> = async ({
  children,
  characters,
}) => {
  const charactersGroups = arrayToGroups(characters, 2);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Rick & Morty
          <Image
            src="/assets/images/title.webp"
            alt="Rick & Morty"
            width={100}
            height={100}
          />
        </h1>
      </header>
      <h1>Mobile Layout ({characters.length})</h1>
      <List characters={charactersGroups} className={styles.list} />
      <CarouselMobile characters={characters}>{children}</CarouselMobile>
      <div className={styles.favorites}>
        <Favorites />
      </div>
    </div>
  );
};

export default MobileLayout;
