import { FC } from "react";
import styles from "./mobile.module.scss";
import { Character } from "rickmortyapi";

type MobileLayoutProps = Readonly<{
  children?: React.ReactNode;
  characters: Character[];
}>;

const MobileLayout: FC<MobileLayoutProps> = async ({ children, characters }) => {
  return (
    <div className={styles.layout}>
      <h1>Mobile Layout ({characters.length})</h1>
      {children}
    </div>
  );
};

export default MobileLayout;
