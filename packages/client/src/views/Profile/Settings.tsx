"use client";

import React from "react";

export interface ProfileSettingsProps {
  user?: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  return (
    <div className="flex gap-4">
      <div></div>
    </div>
  );
};

export default ProfileSettings;
