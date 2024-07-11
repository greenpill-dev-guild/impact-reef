"use client";

import React from "react";
import { User } from "next-auth";

import { List } from "@/components/List";

export interface ProfileEndorsementsProps {
  user: User;
  endorsements: Endorsement[];
}

const ProfileEndorsements: React.FC<ProfileEndorsementsProps> = ({
  user,
  endorsements,
}) => {
  return (
    <div className="flex gap-4">
      <List columns={[]} items={[]} />
    </div>
  );
};

export default ProfileEndorsements;
