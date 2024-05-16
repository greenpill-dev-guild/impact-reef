import React from "react";

export interface ProjectListProps {
  projects: Project[];
}

type ColumnValue =
  | "project"
  | "category"
  | "largest-transaction-counts"
  | "attestation-counts"
  | "last-updated";

interface Column {
  value: ColumnValue;
  title: string;
}

const columns = ["project", "category", ""];

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4"></ul>
    </div>
  );
};
