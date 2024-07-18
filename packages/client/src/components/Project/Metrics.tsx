"use client";

import Image from "next/image";
import React, { useState } from "react";

export interface ProjectMetricsProps {
  metrics: ProjectMetricItem[];
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics }) => {
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  const metricList = showAllMetrics ? metrics : metrics.slice(0, 6);

  function handleShowAllMetrics() {
    setShowAllMetrics(!showAllMetrics);
  }

  return (
    <section className="flex flex-col items-center flex-1 gap-8 bg-zinc-200 p-6 rounded-lg shadow-md">
      <div className="flex gap-2">
        <Image
          src="/icons/flag.svg"
          alt="flag icon to represent metrics"
          unoptimized
          width={32}
          height={32}
        />
        <h2 className="font-semibold text-3xl">Metrics</h2>
      </div>
      <ul className="grid grid-cols-2 grid-rows-auto gap-4 min-h-[794px]]">
        {metricList.map((metric) => (
          <li
            key={metric.name}
            className="w-72 card p-4 flex flex-col justify-between min-h-40 bg-white shadow-sm rounded-md"
          >
            <h3 className="text-sm font-light line-clamp-2">{metric.name}</h3>
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold">
                {metric.value ? metric.value.toLocaleString() : "-"}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <button
        disabled={metrics.length <= 6}
        onClick={handleShowAllMetrics}
        className="w-32 rounded-full bg-slate-400 text-center px-4 py-2 text-neutral-50 font-semibold leading-snug"
      >
        {showAllMetrics && metrics.length > 6 ? "View Less" : "Show All"}
      </button>
    </section>
  );
};
