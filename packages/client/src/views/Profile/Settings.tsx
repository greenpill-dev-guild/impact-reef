"use client";

import React from "react";
import { User } from "next-auth";

export interface ProfileSettingsProps {
  user: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({}) => {
  return (
    <div className="flex gap-4">
      <div></div>
    </div>
  );
};

export default ProfileSettings;
