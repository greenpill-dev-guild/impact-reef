"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

import { determineSocialMedia } from "@/utils/text";

export interface ProjectOverviewProps {
  avatar_image: string;
  title: string;
  description: string;
  grant_track: GrantTrack;
  category: ProjectCategory;
  socials: string[];
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  avatar_image,
  title,
  description,
  grant_track,
  category,
  socials,
}) => {
  return (
    <div className="flex items-center gap-4 px-8 py-6 bg-zinc-50 shadow-md rounded-md">
      <Image
        className="aspect-square"
        alt="porject logo/avatar"
        src={avatar_image}
        width={120}
        height={120}
      />
      <div className="flex-1">
        <h1 className="font-semibold text-5xl">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="basis-72 flex flex-col h-full justify-between items-end gap-6">
        <ul className="flex gap-2">
          {socials.map((link) => {
            const social = determineSocialMedia(link);

            return (
              <li key={link} className="p-2 rounded-full bg-zinc-100">
                <Link href={link}>
                  <Image
                    alt={`${social.label} icon`}
                    src={social.icon}
                    width={24}
                    height={24}
                    unoptimized
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <div>
          <div className="flex gap-2 mb-2 justify-end">
            <h4 className="bg-violet-200 rounded-sm px-2 py-1 text-xl font-bold tracking-wide">
              {grant_track}
            </h4>
            <p className="bg-orange-300 rounded-sm px-2 py-1 text-lg font-light">
              {category}
            </p>
          </div>
          <p className="bg-zinc-200 rounded-sm px-2 py-1 text-sm">
            Base information from OP retro round #4
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
