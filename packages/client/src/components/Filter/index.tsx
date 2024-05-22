"use-client";

import React from "react";
import Image from "next/image";

import { Loader } from "@/components/Loader";

export interface Filter {
  title: string;
  count: number | null;
  active: boolean;
  onFilterChange: () => void;
  disabled?: boolean;
  icon?: string;
}

export interface Sort {
  label: string;
  value: string;
}

export interface FiltersProps {
  filters: Filter[];
  activeSort: string;
  sorts: Sort[];
  refreshing: boolean;
  onRefresh: () => void;
  onSortChange: (sort: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  sorts,
  activeSort,
  refreshing,
  onSortChange,
  onRefresh,
}) => {
  return (
    <div className="w-full flex gap-2 flex-wrap text-lg text-zinc-800 font-light leading-6">
      {filters.map(({ count, active, title, onFilterChange, disabled }) => (
        <button
          onClick={onFilterChange}
          disabled={disabled}
          className={`${active ? "bg-blue-900 text-white" : disabled ? "backdrop-blur-sm" : "bg-slate-100 hover:bg-blue-100"} shadow-sm flex gap-2 px-3 py-2 items-center rounded-lg transition-colors ease-in-out duration-200`}
        >
          {title}
          <span className="rounded-full grid place-items-center w-8 h-8 bg-white text-black text-base font-medium">
            {count && !disabled ? count : "-"}
          </span>
        </button>
      ))}
      <button
        className="py-2 px-3 shadow-sm grid place-items-center rounded-lg bg-slate-100 hover:bg-blue-100"
        disabled={refreshing}
        onClick={onRefresh}
      >
        {refreshing ? (
          <svg
            className="animate-spin fill-black text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <Image
            alt="Filter refresh button"
            src="/icons/refresh.svg"
            unoptimized
            width={20}
            height={20}
          />
        )}
      </button>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          role="button"
          className="capitalize h-full px-3 py-2 flex gap-2 items-center rounded-lg transition-colors ease-in-out duration-200 bg-slate-100 shadow-sm hover:bg-blue-100"
        >
          <Image
            alt="Sort button"
            src="/icons/switch-vertical.svg"
            unoptimized
            width={24}
            height={24}
          />
          {sorts.find((sort) => sort.value === activeSort)?.label ?? ""}
        </button>
        <ul
          tabIndex={0}
          style={{
            padding: 0,
          }}
          className="mt-3 z-[1] shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          {sorts.map((sort) => (
            <li key={sort.value} className="capitalize">
              <button onClick={() => onSortChange(sort.value)}>
                {sort.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
