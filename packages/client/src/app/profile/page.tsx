import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getUser } from "@/actions/auth";

const ProfileView = dynamic(() => import("@/views/Profile"));

const ProfilePage: NextPage = async () => {
  const user = await getUser();

  return <ProfileView user={user!} />;
};

export default ProfilePage;
