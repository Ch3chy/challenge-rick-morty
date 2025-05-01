import { redirect } from "next/navigation";
import { FC } from "react";

const Home: FC = () => {
  redirect("/characters/1");

  return null;
};

export default Home;
