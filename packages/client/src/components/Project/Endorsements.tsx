"use client";

import React from "react";
import Image from "next/image";

import { formatAddress } from "@/utils/text";

export interface ProjectEndorsementsProps {
  banner: string;
  endorsements: Endorsement[];
}

export interface ProjectEndorsementCardProps {
  endorsement: Endorsement;
}

export const ProjectEndorsementCard: React.FC<ProjectEndorsementCardProps> = ({
  endorsement,
}) => {
  return (
    <li
      key={endorsement.id}
      className="flex h-[456px] flex-col justify-between gap-6 rounded-md border p-3 shadow-sm"
    >
      <p className="">{endorsement.description}</p>
      <div>
        <p className="font-semibold">
          by {formatAddress(endorsement.attester)}
        </p>
        <span>{new Date(endorsement.created_at).toLocaleString()}</span>
      </div>
    </li>
  );
};

export const ProjectEndorsements: React.FC<ProjectEndorsementsProps> = ({
  banner,
  endorsements,
}) => {
  return (
    <section
      id="project-endorsements"
      className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-12 py-12"
    >
      <Image
        src={banner}
        alt="project banner"
        className="aspect-[16/6] w-full rounded-md"
        width={1600}
        height={900}
      />
      <div className="flex gap-2">
        <Image
          src="/icons/chat-alt.svg"
          alt="flag icon to represent comparison"
          unoptimized
          width={32}
          height={32}
        />
        <h2 className="text-3xl font-semibold">Endorsements</h2>
      </div>
      {endorsements && endorsements.length ? (
        <ul className="grid-rows-auto grid w-full grid-cols-4 gap-4">
          {endorsements.map((endorsement) => (
            <ProjectEndorsementCard
              key={endorsement.id}
              endorsement={endorsement}
            />
          ))}
        </ul>
      ) : (
        <div className="grid place-items-center">
          <h3 className="text-xl font-semibold">No endorsements yet</h3>
          <p className="text-lg font-light">
            Be the first to endorse this project
          </p>
        </div>
      )}
    </section>
  );
};
