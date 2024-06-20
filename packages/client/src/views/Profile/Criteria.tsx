"use client";

import React from "react";
import { User } from "next-auth";

import { List } from "@/components/List";

export interface ProfileCriteriaProps {
  user: User;
  criteria: Criteria[];
}

const ProfileCriteria: React.FC<ProfileCriteriaProps> = ({
  user,
  criteria,
}) => {
  return (
    <div>
      <List columns={[]} items={[]} />
    </div>
  );
};

export default ProfileCriteria;
