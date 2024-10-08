"use client";

import Link from "next/link";
import React from "react";

import { Collaspe } from "@/components/Collaspe";

export interface ProjectInfoProps {
  repositories: string[];
  contracts: Contract[];
  funding: ProjectGrant[];
}

// CONTRACTS:  [
//   {
//     id: '15310289-3b94-4a57-86f6-1306057fdae9',
//     contractAddress: '0x206e4410d2eBf14caB8E5C88432E954924073cEA',
//     deployerAddress: '0x4a6894Dd556fab996f8D50b521f900CAEedC168e',
//     deploymentHash: '0x79889c96bf14c91f547474b5919c27f212c7f570572e81bfd3291cdc1e226cf6',
//     chainId: 10
//   }
// ]
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
    <aside className="basis-72 flex flex-col gap-2">
      <Collaspe title="Repository">
        <ul>
          {repositories?.map((repo) => (
            <li key={repo}>
              <Link href={repo}>{repo}</Link>
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
        <ul className="flex flex-col gap-2">
          {funding &&
            funding.map((fund) => {
              if (!fund) {
                return null;
              }

              return (
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
              );
            })}
        </ul>
      </Collaspe>
    </aside>
  );
};
