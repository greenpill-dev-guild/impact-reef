import { NextPage } from "next";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";

const ProfileSettingView = dynamic(() => import("@/views/Profile/Settings"));

const ProfilePage: NextPage = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return <ProfileSettingView user={session.user} />;
};

export default ProfilePage;
