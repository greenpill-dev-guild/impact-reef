import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
// import { getSession } from "next-auth/react";

const EndorsementsView = dynamic(() => import("@/views/Profile/Endorsements"));

const ProfileEndorsementsPage: NextPage = async () => {
  // const session = await getSession();

  return <EndorsementsView endorsements={[]} />;
};

export default ProfileEndorsementsPage;
