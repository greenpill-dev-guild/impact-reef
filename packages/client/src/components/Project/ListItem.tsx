"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { formatLastUpdated } from "@/utils/text";

export interface ProjectListItemProps {
  id: string;
  title: string;
  category: ProjectCategory;
  avatar_image: string;
  updated_at: string;
}

type ColumnValue =
  | "project"
  | "category"
  | "largest-transaction-counts"
  | "attestation-counts"
  | "last-updated";

interface Column {
  value: ColumnValue;
  title: string;
}

export const categories: Record<
  ProjectCategory,
  { label: string; color: string }
> = {
  cefi: {
    label: "CeFi",
    color: "#e0f2fe",
  },
  "cross-chain": {
    label: "Cross Chain",
    color: "#fd9393",
  },
  defi: {
    label: "DeFi",
    color: "#818cf8",
  },
  governance: {
    label: "Governance",
    color: "#6ee7b7",
  },
  nft: {
    label: "NFT",
    color: "#9bc1ff",
  },
  social: {
    label: "Social",
    color: "#fef08a",
  },
  utility: {
    label: "Utility",
    color: "#fdba74",
  },
};

export const ProjectListItem: React.FC<ProjectListItemProps> = ({
  id,
  title,
  avatar_image,
  category,
  updated_at,
  ...props
}) => {
  const { push } = useRouter();

  function handleClick() {
    push(`/projects/${id}`);
  }

  return (
    <li
      {...props}
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-light transition-all duration-300 ease-in-out hover:bg-slate-50 hover:shadow-sm"
    >
      <div className="flex flex-[4] items-center gap-2 text-lg font-semibold leading-7">
        <div className="aspect-square h-14 w-14 shrink-0 rounded-lg bg-slate-50">
          {avatar_image && (
            <Image
              src={avatar_image}
              alt="project image"
              className="aspect-square h-14 w-14 rounded-lg"
              width={56}
              height={56}
            />
          )}
        </div>
        <h4 className="line-clamp-2 capitalize">{title}</h4>
      </div>
      <div className={`flex-[2]`}>
        <span
          style={{
            background: categories[category].color,
          }}
          className="rounded-md p-2 text-sm leading-snug"
        >
          {categories[category].label}
        </span>
      </div>
      {/* <div className="flex-[3] leading-snug">
        {transactions_count.toLocaleString()}
      </div>
      <div className="flex-[3] leading-snug">
        {attestation_counts.toLocaleString()}
      </div> */}
      {/* <div className="flex-[2] capitalize leading-snug">
        {formatLastUpdated(updated_at)}
      </div> */}
    </li>
  );
};
