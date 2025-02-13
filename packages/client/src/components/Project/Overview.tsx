"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { determineSocialMedia } from "@/utils/text";

import { categories } from "./ListItem";

export interface ProjectOverviewProps {
  avatar_image: string;
  title: string;
  description: string;
  grant_track: GrantTrack;
  category: ProjectCategory;
  socials: string[];
}

export const grantTracks: Record<GrantTrack, { label: string; color: string }> =
  {
    "dev-tooling": {
      label: "Dev Tooling",
      color: "#e0f2fe",
    },
    governance: {
      label: "Governance",
      color: "#93c5fd",
    },
    "onchain-builders": {
      label: "Onchain Builders",
      color: "#DED0FF",
    },
    "op-stack": {
      label: "OP Stack",
      color: "#6ee7b7",
    },
  };

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  avatar_image,
  title,
  description,
  grant_track,
  category,
  socials,
}) => {
  return (
    <div className="flex w-full items-center gap-4 rounded-md border border-slate-100 px-8 py-6 shadow-sm">
      <Image
        className="aspect-square rounded-lg"
        alt="porject logo/avatar"
        src={avatar_image}
        width={120}
        height={120}
      />
      <div className="flex-1">
        <h1 className="line-clamp-2 text-5xl font-semibold">{title}</h1>
        <p className="line-clamp-6">{description}</p>
      </div>
      <div className="flex h-full basis-72 flex-col items-end justify-between gap-6">
        <ul className="flex gap-2">
          {socials &&
            socials.map((link) => {
              const social = determineSocialMedia(link);

              return (
                <li key={link} className="button-icon">
                  <Link target="_blank" href={link}>
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
          <div className="mb-2 flex justify-end gap-2">
            <h4
              style={{
                backgroundColor: grantTracks[grant_track].color,
              }}
              className="rounded-sm bg-violet-200 px-2 py-1 text-xl font-bold tracking-wide"
            >
              {grantTracks[grant_track].label}
            </h4>
            <p
              style={{
                backgroundColor: categories[category].color,
              }}
              className={"rounded-sm px-2 py-1 text-lg font-light"}
            >
              {categories[category].label}
            </p>
          </div>
          <p className="rounded-sm bg-slate-200 px-2 py-1 text-sm">
            Base information from OP retro round #5
          </p>
        </div>
      </div>
    </div>
  );
};
