"use client";

import React from "react";

import { Stat } from "@/components/Stat";
import { Progress } from "@/components/Progress";

import { formatLastUpdated } from "@/utils/text";

export interface ProjectAttestationsProps {
  badgeholders: Map<string, string>;
  endorsements: Endorsement[];
}

export const ProjectAttestations: React.FC<ProjectAttestationsProps> = ({
  badgeholders,
  endorsements,
}) => {
  const endorsers = [
    ...new Set(endorsements.map((endorsement) => endorsement.attester)),
  ];
  const badgeholderEndorsers = [
    ...new Set(endorsers.filter((endorser) => badgeholders.has(endorser))),
  ];

  return (
    <aside className="flex grow-0 basis-72 flex-col gap-2">
      {/* <Stat
        stats={[
          {
            title: "total endorsements",
            value: 321,
          },
        ]}
      /> */}
      <Stat
        stats={[
          {
            title: "Unique Endorsers",
            value: endorsers.length,
          },
        ]}
      >
        <div className="mt-2 flex flex-col">
          <Progress
            max={endorsers.length}
            value={badgeholderEndorsers.length}
            color="#ef4444"
            className="progress-error mb-2"
          />
          <div className="flex items-center gap-1 text-sm font-light">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Badge holders{" "}
            {badgeholderEndorsers.length
              ? (
                  (badgeholderEndorsers.length / endorsers.length) *
                  100
                ).toPrecision(2)
              : 0}
            %
          </div>
        </div>
      </Stat>
      <Stat
        stats={[
          // {
          //   title: "Number of metrics attested",
          //   value: 12,
          // },
          {
            title: "Number of Endorsements",
            value: endorsements.length,
          },
          {
            title: "Last endorsement",
            value: endorsements.length
              ? formatLastUpdated(endorsements[0].created_at)
              : "N/A",
          },
        ]}
      />
    </aside>
  );
};
