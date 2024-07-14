import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getUser } from "@/actions/auth";
// import { Web3Provider } from "@/hooks/auth/Provider";

const ProfileView = dynamic(() => import("@/views/Profile/Settings"));

const ProfilePage: NextPage = async () => {
  const user = await getUser();

  return <ProfileView user={user} />;
};

export default ProfilePage;
