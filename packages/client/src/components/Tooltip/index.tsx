"use-client";

import React from "react";

export interface TooltipProps {
  title: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ title }) => {
  return (
    <div className="tooltip" data-tip={title}>
      <button className="btn">{title}</button>
    </div>
  );
};
