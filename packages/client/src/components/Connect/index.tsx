"use client";

import React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";

import { logout } from "@/actions/auth";

interface Link {
  title: string;
  icon: string;
  action?: () => void;
}

export interface ConnectProps {
  user?: User;
}

export const Connect: React.FC<ConnectProps> = () => {
  const { address } = useAccount();

  const profileLinks: Link[] = [
    { title: "endorsements", icon: "/icons/fire.svg" },
    { title: "settings", icon: "/icons/flag.svg" },
    { title: "logout", icon: "/icons/fire.svg", action: logout },
  ];

  return address ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-outline inline-flex w-32 items-center justify-center gap-2 border-2 border-sky-700 p-4 font-semibold text-slate-800 transition-colors duration-300 ease-in-out hover:bg-sky-700 hover:fill-white hover:text-white focus:bg-sky-700 focus:fill-white focus:text-white"
      >
        My Reef{" "}
        <svg width="13" height="8" viewBox="0 0 13 8">
          <path
            className="text-[#0E255D] hover:text-white"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.79289 1.29289C2.18342 0.902369 2.81658 0.902369 3.20711 1.29289L6.5 4.58579L9.79289 1.29289C10.1834 0.902369 10.8166 0.902369 11.2071 1.29289C11.5976 1.68342 11.5976 2.31658 11.2071 2.70711L7.20711 6.70711C6.81658 7.09763 6.18342 7.09763 5.79289 6.70711L1.79289 2.70711C1.40237 2.31658 1.40237 1.68342 1.79289 1.29289Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {profileLinks.map((link) => (
          <li key={link.title} className="font-semibold capitalize">
            {link?.action ? (
              <span onClick={link.action}>{link.title}</span>
            ) : (
              <Link
                href={`/profile/${link.title === "settings" ? "" : link.title}`}
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <w3m-button />
  );
};
