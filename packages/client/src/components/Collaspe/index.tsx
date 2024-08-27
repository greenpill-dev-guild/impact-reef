"use client";

import React from "react";

export interface CollaspeProps {
  title: string;
  children?: React.ReactNode;
}

export const Collaspe: React.FC<CollaspeProps> = ({ title, children }) => {
  return (
    <div className="collapse bg-cyan-50 rounded-lg shadow-md">
      <input type="checkbox" defaultValue={""} />
      <h3 className="collapse-title text-lg font-medium">{title}</h3>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
