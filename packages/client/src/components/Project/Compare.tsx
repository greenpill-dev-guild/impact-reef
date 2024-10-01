"use client";

import React from "react";
import Image from "next/image";

import { categories } from "./ListItem";

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

export const grantTracks: Record<GrantTrack, { label: string; color: string }> =
  {
    "dev-tooling": {
      label: "Dev Tooling",
      color: "#e0f2fe",
    },
    governance: {
      label: "Governance",
      color: "#93c5fd",
    },
    "onchain-builders": {
      label: "Onchain Builders",
      color: "#DED0FF",
    },
    "op-stack": {
      label: "OP Stack",
      color: "#6ee7b7",
    },
  };

export const ProjectCompare: React.FC<ProjectCompareProps> = ({
  category,
  grantTrack,
  project,
  similarProjects,
  metrics,
  colorMap,
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-12">
      <p className="text-xl">
        <span className="font-bold">{similarProjects.length}</span> other
        projects that applied for{" "}
        <span
          className="rounded-md p-2 text-2xl font-semibold leading-snug"
          style={{
            background: grantTracks[grantTrack].color,
          }}
        >
          {grantTracks[grantTrack].label}
        </span>{" "}
        and also{" "}
        <span
          className="rounded-md p-2 py-3 text-xl leading-snug"
          style={{
            background: categories[category].color,
          }}
        >
          {categories[category].label}
        </span>
      </p>
      <div className="flex gap-8">
        <aside className="flex basis-96 flex-col gap-4">
          <ul className="flex flex-col rounded-lg border border-slate-400 text-lg font-semibold shadow-md">
            <li
              key={project.id}
              className="flex items-center gap-3 rounded-lg border-b border-slate-400 bg-white p-3"
            >
              <span
                className="h-4 w-4 rounded-full"
                style={{
                  background: colorMap.get(project.id),
                }}
              />
              <div className="relative aspect-square h-12 w-12 rounded-lg bg-cyan-900">
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
                className="flex items-center gap-3 border-b border-slate-400 p-3"
              >
                <span
                  className="h-4 w-4 rounded-full"
                  style={{
                    background: colorMap.get(project.id),
                  }}
                />
                <div className="relative aspect-square h-12 w-12 rounded-lg bg-cyan-900">
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
          <p className="text-">
            We have selected the projects that have most data to compare with.
            The default comparison dataset is set by the metric admin, let us
            know any questions!
          </p>
        </aside>
        <section className="flex-1">
          <ul className="flex w-full flex-col gap-8">
            {metrics.map((metric) => {
              const amounts = metric.projects.map((metric) => metric.amount);
              const max = Math.max(...amounts);
              // const min = Math.min(...amounts);

              return (
                <li key={metric.title} className="flex flex-col gap-2">
                  <h4 className="text-xl font-medium">{metric.title}</h4>
                  <ul className="flex w-full flex-col gap-0.5">
                    {metric.projects.map((project) => (
                      <li
                        key={`${metric.title}-${project.id}`}
                        className={`flex items-center gap-2 ${
                          project.amount === 0
                            ? "font-bold leading-none"
                            : "font-light"
                        }`}
                      >
                        <span
                          className="h-4 rounded-sm"
                          style={{
                            background: colorMap.get(project.id),
                            width: `${project.amount === 0 ? "2px" : `calc(${(project.amount / max) * 100}% - 24px)`}`,
                          }}
                        />
                        {project.amount || "-"}
                      </li>
                    ))}
                  </ul>
                  <span className="h-0.5 w-full bg-slate-300" />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};
