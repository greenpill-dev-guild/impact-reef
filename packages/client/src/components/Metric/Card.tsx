"use client";

import React from "react";

export interface MetricCardProps {
  title: string;
  value: number | null;
  onAttest: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  onAttest,
}) => {
  return (
    <div className="card">
      <h4 className="">{title}</h4>
      <span className="">{value ?? "-"}</span>
      <button onClick={onAttest}>{/* <Image /> Add an attestation */}</button>
    </div>
  );
};
