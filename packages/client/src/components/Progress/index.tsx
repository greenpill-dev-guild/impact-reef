import React from "react";

export interface ProgressProps {
  value: number;
  max: number;
  color?: string;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max,
  color,
  className,
}) => {
  return (
    <progress
      value={value}
      max={max}
      color={color}
      className={`h-4 progress ${className}`}
    />
  );
};
