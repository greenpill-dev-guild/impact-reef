"use client";

import React from "react";

import { Stat } from "@/components/Stat";
import { Progress } from "@/components/Progress";

export interface ProjectAttestationsProps {}

const ProjectAttestations: React.FC<ProjectAttestationsProps> = ({}) => {
  return (
    <aside className="basis-72 flex flex-col gap-2">
      <Stat
        stats={[
          {
            title: "total attestations",
            value: 321,
          },
        ]}
      >
        {/* Todo Add Graph */}
      </Stat>
      <Stat
        stats={[
          {
            title: "Unique Attesters",
            value: 21,
          },
        ]}
      >
        <div className="flex flex-col mt-2">
          <Progress
            max={111}
            value={75}
            color="#ef4444"
            className="mb-2 progress-error"
          />
          <div className="flex gap-1 text-sm font-light items-center">
            <span className="rounded-full bg-red-500 h-2 w-2" />
            Badge holders {((75 / 111) * 100).toPrecision(2)}%
          </div>
          <div className="flex gap-1 text-sm font-light items-center">
            <span className="rounded-full bg-gray-500 h-2 w-2" />
            Others {((33 / 111) * 100).toPrecision(2)}%
          </div>
        </div>
      </Stat>
      <Stat
        stats={[
          {
            title: "Number of metrics attested",
            value: 12,
          },
          {
            title: "Number of endorsements",
            value: 12,
          },
          {
            title: "Last attest at",
            value: "4 days ago",
          },
        ]}
      />
    </aside>
  );
};

export default ProjectAttestations;
