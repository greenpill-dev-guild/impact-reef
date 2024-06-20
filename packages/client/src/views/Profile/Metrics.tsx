"use client";

import React from "react";
import { User } from "next-auth";

import { List } from "@/components/List";

export interface ProfileMetricsProps {
  user: User;
  metrics: Metric[];
}

const ProfileMetrics: React.FC<ProfileMetricsProps> = ({ user, metrics }) => {
  return (
    <div className="flex gap-4">
      <List columns={[]} items={[]} />
    </div>
  );
};

export default ProfileMetrics;
