import { FC } from "react";
import styles from "./characters.module.scss";
import { isMobileDevice } from "@/config/utils/device-ssr.utils";
import { MobileLayout } from "./layouts/mobile";
import { DesktopLayout } from "./layouts/desktop";
import { getCharacters } from "rickmortyapi";

const Characters: FC<
  Readonly<{
    children?: React.ReactNode;
  }>
> = async ({ children }) => {
  const isMobile = await isMobileDevice();
  const charactersResponse = await getCharacters({ page: 1 });

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  const characters = charactersResponse.data.results || [];

  return (
    <section className={styles.page}>
      <Layout characters={characters}>{children}</Layout>
    </section>
  );
};

export default Characters;
