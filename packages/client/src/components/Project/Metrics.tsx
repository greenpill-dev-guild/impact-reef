"use client";

import Image from "next/image";
import React, { useState } from "react";

export interface ProjectMetricsProps {
  metrics: ProjectMetricItem[];
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics }) => {
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const metricList = showAllMetrics ? metrics : metrics?.slice(0, 6) || [];

  function handleShowAllMetrics() {
    setShowAllMetrics(!showAllMetrics);
  }

  return (
    <section className="flex flex-1 flex-col items-center gap-8 rounded-lg bg-slate-200 p-6 shadow-md">
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
        <ul className="grid-rows-auto min-h-[800px]] grid grid-cols-2 gap-4">
          {metricList.map((metric) => (
            <li
              key={metric.metricUID}
              className="card flex min-h-40 w-72 flex-col justify-between rounded-md bg-white p-4 shadow-sm"
            >
              <h3 className="line-clamp-2 text-sm font-light">
                {metric.metricUID}
              </h3>
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-bold">
                  {metric.value ? metric.value.toLocaleString() : "-"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid place-items-center">
          <h3 className="text-xl font-semibold">No metrics yet</h3>
          <p className="text-lg font-light">
            Add metrics to track your project's progress
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
