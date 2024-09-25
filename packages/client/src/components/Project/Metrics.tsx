"use client";

import { ProjectMetric } from "@/types/projects";
import Image from "next/image";
import React, { useState } from "react";

export interface ProjectMetricsProps {
  metrics: ProjectMetric[];
}

// Metrics in getProject [
//   {
//     source: 'Open Source Observer',
//     projectUID: '0x0403926badb0cd173b98ea187d30423bfbd1d8a7c9c6ba5e874d0ed3872b58c7',
//     activeDeveloperCount6Months: 5,
//     artifactId: 'jhIwTQdo0tGk4ulakRdSq8eJza_ik3rSgyePN2WJr4c=',
//     artifactName: 'nim-libp2p',
//     artifactNamespace: 'vacp2p',
//     closedIssueCount6Months: 15,
//     commitCount6Months: 24,
//     contributorCount: 59,
//     contributorCount6Months: 14,
//     eventSource: 'GITHUB',
//     firstCommitDate: '2018-11-19 02:04:57',
//     forkCount: '53',
//     fulltimeDeveloperAverage6Months: 0,
//     lastCommitDate: '2024-08-12 17:21:17',
//     mergedPullRequestCount6Months: 64,
//     newContributorCount6Months: 2,
//     openedIssueCount6Months: 30,
//     openedPullRequestCount6Months: 105,
//     starCount: '243',
//     __typename: 'Oso_CodeMetricsByArtifactV0'
//   }
// ]

const osoMetricsToDisplay = [
  "activeDeveloperCount6Months",
  "closedIssueCount6Months",
  "commitCount6Months",
  "contributorCount",
  "contributorCount6Months",
  "mergedPullRequestCount6Months",
  "newContributorCount6Months",
  "openedIssueCount6Months",
  "openedPullRequestCount6Months",
  "forkCount",
  "starCount"
];

const metricsDisplayTitles = {
  "activeDeveloperCount6Months": "Active Developers (6 Months)",
  "closedIssueCount6Months": "Closed Issues (6 Months)",
  "commitCount6Months": "Commits (6 Months)",
  "contributorCount": "Contributors",
  "contributorCount6Months": "Contributors (6 Months)",
  "mergedPullRequestCount6Months": "Merged Pull Requests (6 Months)",
  "newContributorCount6Months": "New Contributors (6 Months)",
  "openedIssueCount6Months": "Opened Issues (6 Months)",
  "openedPullRequestCount6Months": "Opened Pull Requests (6 Months)",
  "forkCount": "Forks",
  "starCount": "Stars"
}



const renderOsoMetrics = (metrics: ProjectMetric[]) => {
  const osoMetrics = metrics.find((metric) => metric.source === "Open Source Observer");

  if (!osoMetrics) return null;

  const osoValues = Object.entries(osoMetrics).filter(([key, value]) => osoMetricsToDisplay.includes(key));

  return (
    <div>
    <ul className="grid-rows-auto grid min-h-96 grid-cols-2 gap-4">
      {osoValues.map(([key, value], index) => (
        <li key={index} className="card flex min-h-40 w-72 flex-col justify-between rounded-md bg-white p-4 shadow-sm">
          <h3 className="line-clamp-2 text-sm font-light">{metricsDisplayTitles[key as keyof typeof metricsDisplayTitles]}</h3>
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-bold">{value ? value.toLocaleString() : "-"}</span>
          </div>
        </li>
      ))}
    </ul>
    <p className="text-sm font-light"> Metrics provided by <a href="https://www.opensource.observer/" target="_blank" rel="noopener noreferrer">Open Source Observer</a></p>
    </div>
  );
};


export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics }) => {
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const metricList = showAllMetrics ? metrics : metrics?.slice(0, 6) || [];

  function handleShowAllMetrics() {
    setShowAllMetrics(!showAllMetrics);
  }

  return (
    <section className="flex flex-1 flex-col items-center gap-8 rounded-lg bg-slate-100 p-6 shadow-sm">
      <div className="flex gap-2">
        <Image
          src="/icons/flag.svg"
          alt="flag icon to represent metrics"
          unoptimized
          width={32}
          height={32}
        />
        <h2 className="text-3xl font-semibold">Metrics</h2>
      </div>
      {metricList.length ? (
        renderOsoMetrics(metricList)
      ) : (
        <div className="flex min-h-96 flex-col items-center justify-center gap-4">
          <h3 className="text-xl font-semibold">No Metrics Found</h3>
          <p className="max-w-sm text-center text-lg font-light">
            We fetch metrics from Open Source Observer connect your project to
            view.
          </p>
        </div>
      )}
      {metrics.length > 6 && (
        <button
          onClick={handleShowAllMetrics}
          className="button button-neutral text-center"
        >
          {showAllMetrics && metrics.length > 6 ? "View Less" : "Show All"}
        </button>
      )}
    </section>
  );
};
