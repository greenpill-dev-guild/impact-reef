"use client";

import React from "react";
import { User } from "next-auth";

export interface ProfileViewProps {
  user: User;
}

const ProfileView: React.FC<ProfileViewProps> = ({}) => {
  return <div className="flex gap-4"></div>;
};

export default ProfileView;
