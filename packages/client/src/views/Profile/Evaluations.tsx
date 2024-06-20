"use client";

import React from "react";
import { User } from "next-auth";

import { List } from "@/components/List";

export interface ProfileEvaluationsProps {
  user: User;
  evaluations: Evaluation[];
}

const ProfileEvaluations: React.FC<ProfileEvaluationsProps> = ({
  user,
  evaluations,
}) => {
  return (
    <div className="flex gap-4">
      <List columns={[]} items={[]} />
    </div>
  );
};

export default ProfileEvaluations;
