import React from "react";
import Image from "next/image";
import { Loader } from "../Loader";

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
  sorts: Sort[];
  refreshing: boolean;
  onRefresh: () => void;
  onSortChange: (sort: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, refreshing }) => {
  return (
    <div>
      {filters.map(({ count, active, title, onFilterChange, disabled }) => (
        <button
          onClick={onFilterChange}
          disabled={disabled}
          className={`${active ? "" : disabled ? "" : " "} px-3 py-2 rounded-lg`}
        >
          {title}
          <span>{count ?? "-"}</span>
        </button>
      ))}
      <button className="">
        {refreshing ? (
          <Loader size="sm" type="spinner" />
        ) : (
          <Image
            alt="Filter refresh button"
            src="/icons/refresh.svg"
            unoptimized
            width={32}
            height={32}
          />
        )}
      </button>
    </div>
  );
};
