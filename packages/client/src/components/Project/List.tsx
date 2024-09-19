import React, { Suspense } from "react";

import { getProjects } from "@/actions/projects";

import { Loader } from "../Loader";
import { ProjectProjectListItem } from "./ListItem";

export interface ProjectListProps {
  query: string;
  page: number;
  columns: { size: number; title: string }[];
}

type ColumnValue =
  | "item"
  | "category"
  | "largest-transaction-counts"
  | "attestation-counts"
  | "last-updated";

export const ProjectList: React.FC<ProjectListProps> = async ({
  query,
  page,
  columns,
}) => {
  const items = await getProjects(query, page);

  return (
    <div role="table" className="mb-4 flex w-full flex-col gap-2">
      <ul
        role="columnheader"
        className="flex w-full gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm capitalize leading-tight shadow-sm"
      >
        {columns.map((column) => (
          <li
            style={{
              flex: column.size,
            }}
            key={column.title}
            className={`flex-[${column.size}]`}
          >
            <span>{column.title}</span>
          </li>
        ))}
      </ul>
      <ul role="rowgroup" className="flex w-full flex-1 flex-col gap-2">
        <Suspense
          key={query + page}
          fallback={
            <div className="grid place-items-center py-12">
              <Loader />
            </div>
          }
        >
          {items?.map((item) => (
            <ProjectProjectListItem {...item} key={item.id} />
          ))}
        </Suspense>
      </ul>
    </div>
  );
};
