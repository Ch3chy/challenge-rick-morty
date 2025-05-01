import { FC } from "react";
import styles from "./mobile.module.scss";
import { Character } from "rickmortyapi";
import Image from "next/image";

type MobileLayoutProps = Readonly<{
  children?: React.ReactNode;
  characters: Character[];
}>;

const MobileLayout: FC<MobileLayoutProps> = async ({
  children,
  characters,
}) => {
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
      {children}
    </div>
  );
};

export default MobileLayout;
