import { NextPage } from "next";
import dynamic from "next/dynamic";

import { getUser } from "@/actions/auth";
import { getUserEndorsements } from "@/actions/endorsements";
// import { Web3Provider } from "@/hooks/auth/Provider";

const ProfileView = dynamic(() => import("@/views/Profile/Endorsements"));

const ProfilePage: NextPage = async () => {
  const user = await getUser();

  const endorsements = await getUserEndorsements(user?.address);

  return <ProfileView user={user} endorsements={endorsements} />;
};

export default ProfilePage;
