import { NextPage } from "next";
import dynamic from "next/dynamic";

const HomeView = dynamic(() => import("@/views/Home"));

const Home: NextPage = () => {
  return <HomeView />;
};

export default Home;
