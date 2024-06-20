"use-client";

import React from "react";

import { ListItem } from "./Item";

export interface ListProps {
  items: any[];
  columns: { size: number; title: string }[];
}

type ColumnValue =
  | "item"
  | "category"
  | "largest-transaction-counts"
  | "attestation-counts"
  | "last-updated";

interface Column {
  value: ColumnValue;
  title: string;
}

export const List: React.FC<ListProps> = ({ items, columns }) => {
  return (
    <div role="table" className="w-full h-full flex flex-col gap-2">
      <ul
        role="columnheader"
        className="flex w-full gap-2 capitalize border border-zinc-300 shadow-sm rounded-lg px-4 py-2 text-sm text-gray-500 leading-tight"
      >
        {columns.map((column) => (
          <li
            style={{
              flex: column.size,
            }}
            key={column.title}
            className={`flex-[${column.size}]`}
          >
            {column.title}
          </li>
        ))}
      </ul>
      <ul
        role="rowgroup"
        className="w-full max-h-[60vh] flex flex-col gap-1 flex-1 overflow-scroll"
      >
        {items?.map((item) => <ListItem key={item.id} {...item} />)}
      </ul>
    </div>
  );
};
