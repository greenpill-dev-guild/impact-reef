import { NextPage } from "next";
import dynamic from "next/dynamic";

const ProfileSettingView = dynamic(() => import("@/views/Profile/Settings"));

const ProfilePage: NextPage = async () => {

  return <ProfileSettingView />;
};

export default ProfilePage;
