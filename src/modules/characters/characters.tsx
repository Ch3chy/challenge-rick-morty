import { FC } from "react";
import styles from "./characters.module.scss";
import { isMobileDevice } from "@/config/utils/device-ssr.utils";
import { MobileLayout } from "./layouts/mobile";
import { DesktopLayout } from "./layouts/desktop";

const Characters: FC = async () => {
  const isMobile = await isMobileDevice();

  return (
    <div className={styles.page}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
};

export default Characters;
