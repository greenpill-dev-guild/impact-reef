"use-client";

import React from "react";

interface Stat {
  title: string;
  value: number | string;
}

export interface StatProps {
  stats: Stat[];
  children?: React.ReactNode;
}

export const Stat: React.FC<StatProps> = ({ stats, children }) => {
  return (
    <div className="bg-orange-50 rounded-lg p-4 w-full flex flex-col gap-2 shadow-md">
      {stats.map((stat) => (
        <div key={stat.title}>
          <h4 className="text-sm font-light capitalize mb-1">{stat.title}</h4>
          <span className="text-2xl font-semibold">
            {stat.value ? stat.value.toLocaleString() : "-"}
          </span>
        </div>
      ))}
      {children}
    </div>
  );
};
