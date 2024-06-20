"use-client";

import { formatLastUpdated } from "@/utils/text";
import Image from "next/image";
import React from "react";

export interface ListItemProps {
  id: string;
  title: string;
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
    color: "#93c5fd",
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
    color: "#3b82f6",
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

export const ListItem: React.FC<ListItemProps> = ({
  id,
  title,
  avatar_image,
  // category,
  // transactions_count,
  // attestation_counts,
  updated_at,
  ...props
}) => {
  return (
    <li
      {...props}
      className="cursor-pointer hover:bg-slate-50 hover:shadow-sm flex gap-2 items-center w-full font-light border border-zinc-300 rounded-lg px-4 py-3 transition-all ease-in-out duration-300"
    >
      <div className="flex gap-2 items-center flex-[4] text-lg font-semibold leading-7">
        <div className="aspect-square w-14 h-14 relative bg-cyan-900 rounded-lg">
          {avatar_image && (
            <Image
              src={avatar_image}
              alt="project image"
              className="aspect-square w-14 h-14"
              width={56}
              height={56}
            />
          )}
        </div>
        <h4 className="line-clamp-2">{title}</h4>
      </div>
      <div className={`flex-[2]`}>
        {/* <span
          style={{
            background: categories[category].color,
          }}
          className="rounded-md text-sm text-zinc-800 p-2 leading-snug"
        >
          {categories[category].label}
        </span> */}
      </div>
      <div className="flex-[3] leading-snug">
        {/* {transactions_count.toLocaleString()} */}
      </div>
      <div className="flex-[3] leading-snug">
        {/* {attestation_counts.toLocaleString()} */}
      </div>
      <div className="flex-[2] leading-snug capitalize">
        {formatLastUpdated(updated_at)}
      </div>
    </li>
  );
};
