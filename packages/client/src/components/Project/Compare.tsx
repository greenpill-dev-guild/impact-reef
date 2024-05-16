import React from "react";

interface Metric {
  title: string;
  projects: { id: string; amount: number }[];
}

export interface ProjectCompareProps {
  category: string;
  grantTrack: string;
  project: { id: string; name: string; logo: string };
  similarProjects: { id: string; name: string; logo: string }[];
  metrics: Metric[];
  colorMap: Record<string, string>;
}

export const ProjectCompare: React.FC<ProjectCompareProps> = ({
  category,
  grantTrack,
  project,
  similarProjects,
  metrics,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p>
        16 other projects that are applied for <span>Onchain Builders</span> and
        also <span>Utility</span>
      </p>
      <div>
        <aside>
          <div>Protocol Guild</div>
          <ul className="flex flex-col gap-4"></ul>
        </aside>
      </div>
    </div>
  );
};
