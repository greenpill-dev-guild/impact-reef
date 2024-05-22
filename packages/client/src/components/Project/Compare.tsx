"use-client";

import Image from "next/image";
import React from "react";

interface Metric {
  title: string;
  projects: { id: string; amount: number }[];
}

export interface ProjectCompareProps {
  category: ProjectCategory;
  grantTrack: GrantTrack;
  project: { id: string; name: string; logo: string };
  similarProjects: { id: string; name: string; logo: string }[];
  metrics: Metric[];
  colorMap: Map<string, string>;
}

export const ProjectCompare: React.FC<ProjectCompareProps> = ({
  category,
  grantTrack,
  project,
  similarProjects,
  metrics,
  colorMap,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p>
        {similarProjects.length} other projects that applied for
        <span>{grantTrack}</span> and also <span>{category}</span>
      </p>
      <div className="flex gap-4">
        <aside>
          <ul className="flex flex-col shadow-md rounded-md border border-zinc-400 text-lg font-semibold">
            <li
              key={project.id}
              className="flex items-center gap-3 p-3 bg-white border-b border-zinc-400"
            >
              <span
                className="w-4 h-4 rounded-full"
                style={{
                  background: colorMap.get(project.id),
                }}
              />
              <div className="aspect-square w-12 h-12 relative bg-cyan-900 rounded-lg">
                {project.logo && (
                  <Image
                    src={project.logo}
                    alt="project image"
                    className="aspect-square"
                    width={48}
                    height={48}
                  />
                )}
              </div>
              <p className="line-clamp-1">{project.name}</p>
            </li>
            {similarProjects.map((project) => (
              <li
                key={project.id}
                className="flex gap-3 items-center p-3 border-b border-zinc-400"
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: colorMap.get(project.id),
                  }}
                />
                <div className="aspect-square w-12 h-12 relative bg-cyan-900 rounded-lg">
                  {project.logo && (
                    <Image
                      src={project.logo}
                      alt="project image"
                      className="aspect-square"
                      width={48}
                      height={48}
                    />
                  )}
                </div>
                <p className="line-clamp-1">{project.name}</p>
              </li>
            ))}
          </ul>
        </aside>
        <section className="flex-1">
          <ul>
            {metrics.map((metric) => (
              <li key={metric.title}>
                <h4>{metric.title}</h4>
                <ul>
                  {metric.projects.map((project) => (
                    <li key={`${metric.title}-${project.id}`}></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
