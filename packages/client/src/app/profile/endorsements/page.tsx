import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";

import { getUserEndorsements } from "@/actions/endorsements";

const EndorsementsView = dynamic(() => import("@/views/Profile/Endorsements"));

const ProfileEndorsementsPage: NextPage = async () => {
  const session = await getSession();

  const endorsements = await getUserEndorsements(session?.user.address);

  return <EndorsementsView endorsements={endorsements} />;
};

export default ProfileEndorsementsPage;
