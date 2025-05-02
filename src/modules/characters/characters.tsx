import { FC } from "react";
import styles from "./characters.module.scss";
import { isMobileDevice } from "@/config/utils/device-ssr.utils";
import { MobileLayout } from "./layouts/mobile";
import { DesktopLayout } from "./layouts/desktop";
import { getCharacters } from "rickmortyapi";
import { Character } from "./types/characters.types";
import { Detail } from "./views/detail";
import { SearchParams, UrlParams } from "@/config/types/urls.types";

const Characters: FC<
  Readonly<{
    params: Promise<UrlParams>;
    searchParams: Promise<SearchParams>;
  }>
> = async (props) => {
  const { params, searchParams } = props;
  const isMobile = await isMobileDevice();
  const { s } = await searchParams;

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  const charactersResponse = await getCharacters({
    page: 1,
    ...(s && { name: s }),
  });
  const characters = (charactersResponse.data.results || []) as Character[];

  return (
    <section className={styles.page}>
      <Layout characters={characters}>
        <Detail params={params} />
      </Layout>
    </section>
  );
};

export default Characters;
