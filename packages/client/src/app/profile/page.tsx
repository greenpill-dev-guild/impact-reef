import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getUser } from "@/actions/auth";

const ProfileSettingView = dynamic(() => import("@/views/Profile/Settings"));

const ProfilePage: NextPage = async () => {
  const user = await getUser();

  return <ProfileSettingView user={user} />;
};

export default ProfilePage;
