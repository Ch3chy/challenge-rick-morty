import "@styles/globals.scss";
import { robotoCondensed } from "@/config/ui/font.ui";
import type { Metadata } from "next";
import styles from "@styles/layouts/principal-layout.module.scss";
import Image from "next/image";
import ReduxStateProvider from "@/config/providers/redux-state.provider";
import { isMobileDevice } from "@/config/utils/device-ssr.utils";

export const metadata: Metadata = {
  title: "Rick & Morty",
  description: "Rick & Morty - The best series of the moment",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = await isMobileDevice();

  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.className} ${robotoCondensed.variable} ${styles.appBody}`}
      >
        <ReduxStateProvider isMobile={isMobile}>
          <div className={styles.background}>
            <Image
              src="/assets/images/background.webp"
              alt="background-rick-and-morty"
              width={1920}
              height={1080}
              priority
              className={styles.backgroundImage}
            />
          </div>
          <div className={styles.appContainer}>{children}</div>
        </ReduxStateProvider>
      </body>
    </html>
  );
}
