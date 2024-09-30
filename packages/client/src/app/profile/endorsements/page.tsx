import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

// import { getUserEndorsements } from "@/actions/endorsements";

const EndorsementsView = dynamic(() => import("@/views/Profile/Endorsements"));

const ProfileEndorsementsPage: NextPage = async () => {

  // const endorsements = await getUserEndorsements(session?.address);

  return <EndorsementsView endorsements={[]} />;
};

export default ProfileEndorsementsPage;
