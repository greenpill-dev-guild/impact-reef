"use client";

import Link from "next/link";
import React from "react";

import { Collaspe } from "@/components/Collaspe";

export interface ProjectInfoProps {
  repositories: string[];
  contracts: string[];
  funding: ProjectGrant[];
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  repositories,
  contracts,
  funding,
}) => {
  return (
    <aside className="basis-72 flex flex-col gap-2">
      <Collaspe title="Repository">
        <ul>
          {repositories.map((repo) => (
            <li key={repo}>
              <Link href={repo}>{repo}</Link>
            </li>
          ))}
        </ul>
      </Collaspe>
      <Collaspe title="Contracts">
        <ul>
          {contracts.map((contract) => (
            <li key={contract}>
              <Link href={contract}>{contract}</Link>
            </li>
          ))}
        </ul>
      </Collaspe>
      <Collaspe title="Funding">
        <ul className="flex flex-col gap-2">
          {funding.map((fund) => (
            <li key={fund.title} className="flex flex-col gap-1">
              <h5 className="text-xl font-semibold">{fund.title}</h5>
              <div>
                <p className="text-xs font-light">Date: {fund.date}</p>
                <p className="text-xs font-light">
                  Funds received: {fund.funds_received}
                </p>
              </div>
              <p className="text-sm">{fund.description}</p>
              {fund.link && <Link href="link">{fund.link}</Link>}
            </li>
          ))}
        </ul>
      </Collaspe>
    </aside>
  );
};
