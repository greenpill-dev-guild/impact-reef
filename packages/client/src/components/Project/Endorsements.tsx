"use client";

import Image from "next/image";
import React from "react";

export interface ProjectEndorsementsProps {
  banner: string;
  endorsements: Endorsement[];
}

export interface ProjectEndorsementCardProps {
  endorsement: Endorsement;
}

const ProjectEndorsementCard: React.FC<ProjectEndorsementCardProps> = ({
  endorsement,
}) => {
  return (
    <li
      key={endorsement.id}
      className="p-3 bg-neutral-100 rounded-md shadow-sm flex flex-col justify-between gap-6"
    >
      <p className="">{endorsement.description}</p>
      <div>
        <p className="line-clamp-1 font-semibold">by {endorsement.attester}</p>
        <span>{new Date(Date.parse(endorsement.updated_at)).getUTCDate()}</span>
      </div>
    </li>
  );
};

const ProjectEndorsements: React.FC<ProjectEndorsementsProps> = ({
  banner,
  endorsements,
}) => {
  return (
    <section
      id="project-endorsements"
      className="w-full min-h-screen max-w-screen-xl mx-auto flex flex-col items-center gap-12 py-12"
    >
      <Image
        src={banner}
        alt="project banner"
        className="w-full aspect-[16/6] rounded-md"
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
        <h2 className="font-semibold text-3xl">Endorsements</h2>
      </div>
      <ul className="grid grid-cols-4 grid-rows-auto gap-4 w-full">
        {endorsements.length ? (
          endorsements.map((endorsement) => (
            <ProjectEndorsementCard endorsement={endorsement} />
          ))
        ) : (
          <div></div>
        )}
      </ul>
    </section>
  );
};

export default ProjectEndorsements;
