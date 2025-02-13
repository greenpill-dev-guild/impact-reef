"use client";

import React from "react";
import Link from "next/link";

import { Collaspe } from "@/components/Collaspe";

export interface ProjectInfoProps {
  repositories: string[];
  contracts: Contract[];
  funding: ProjectGrant[];
}

const getBlockExplorerLink = ({
  contractAddress,
  chainId,
}: {
  contractAddress: string;
  chainId: number;
}) => {
  switch (chainId) {
    case 10:
      return `https://optimistic.etherscan.io/address/${contractAddress}`;
    default:
      return `https://etherscan.io/address/${contractAddress}`;
  }
};

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  repositories,
  contracts,
  funding,
}) => {
  return (
    <aside className="flex grow-0 basis-72 flex-col gap-2">
      <Collaspe title="Repository">
        <ul>
          {repositories?.map((repo) => (
            <li key={repo}>
              <Link target="_blank" href={repo}>
                {repo}
              </Link>
            </li>
          ))}
        </ul>
      </Collaspe>
      <Collaspe title="Contracts">
        <ul>
          {contracts?.map((contract) => {
            if (!contract) {
              return null;
            }

            const blockExplorerUrl = getBlockExplorerLink({
              contractAddress: contract.contractAddress,
              chainId: contract.chainId,
            });

            return (
              <li key={blockExplorerUrl}>
                <Link
                  target="_blank"
                  href={blockExplorerUrl}
                >{`${contract.chainId} - ${contract.contractAddress}`}</Link>
              </li>
            );
          })}
        </ul>
      </Collaspe>
      <Collaspe title="Funding">
        <ul className="flex flex-col gap-3">
          {funding &&
            funding.map((fund) => {
              if (!fund) {
                return null;
              }

              return (
                <li key={fund.title} className="flex flex-col">
                  <h5 className="text-lg font-bold capitalize">{fund.title}</h5>
                  <p className="text-xs font-light">
                    Date: {fund.date ?? "Unknown"}
                  </p>
                  <p className="mb-2 text-xs font-light">
                    Funds received: {fund.funds_received ?? "Unknown"}
                  </p>
                  <p className="mb-4 text-sm">{fund.description}</p>
                  {fund.link && (
                    <Link
                      className="font-bold"
                      href={fund.link}
                      target="_blank"
                    >
                      Learn More
                    </Link>
                  )}
                </li>
              );
            })}
        </ul>
      </Collaspe>
    </aside>
  );
};
