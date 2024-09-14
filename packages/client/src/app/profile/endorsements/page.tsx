import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const EndorsementsView = dynamic(() => import("@/views/Profile/Endorsements"));

const ProfileEndorsementsPage: NextPage = () => {
  return <EndorsementsView />;
};

export default ProfileEndorsementsPage;
