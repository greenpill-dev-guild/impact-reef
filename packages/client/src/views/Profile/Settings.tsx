"use client";

import React from "react";
import { useAccount } from "wagmi";

export interface ProfileSettingsProps {
  user?: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const { address } = useAccount();

  console.log("User Address", address, user);

  return (
    <div className="flex gap-4">
      <div></div>
    </div>
  );
};

export default ProfileSettings;
