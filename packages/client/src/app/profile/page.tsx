import { NextPage } from "next";
import dynamic from "next/dynamic";

import { auth } from "@/modules/auth";

const ProfileView = dynamic(() => import("@/views/Profile"));

const ProfilePage: NextPage = async () => {
  // const session = await auth();

  // if (!session) return null;

  return <div />;

  // return <ProfileView user={session?.user!} />;
};

export default ProfilePage;
