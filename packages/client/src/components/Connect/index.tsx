"use client";

import React from "react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { signOut } from "next-auth/react";
import { FaChevronDown } from "react-icons/fa";

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
  const { disconnect } = useDisconnect();

  function handleLogout() {
    signOut({
      callbackUrl: "/",
    });
    disconnect();
  }

  const profileLinks: Link[] = [
    { title: "endorsements", icon: "/icons/fire.svg" },
    { title: "settings", icon: "/icons/flag.svg" },
    { title: "logout", icon: "/icons/fire.svg", action: handleLogout },
  ];

  return address ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-outline inline-flex w-32 items-center justify-center gap-2 border-2 border-sky-900 p-4 font-semibold transition-colors duration-300 ease-in-out hover:bg-sky-900 hover:fill-white hover:text-white focus:bg-sky-900 focus:fill-white focus:text-white"
      >
        My Reef <FaChevronDown className="h-3 w-3" />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 py-2 shadow"
      >
        {profileLinks.map((link) => (
          <li key={link.title} className="font-semibold capitalize">
            {link?.action ? (
              <span className="hover:text-sky-800" onClick={link.action}>
                {link.title}
              </span>
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
    <w3m-button label="Connect Wallet" loadingLabel="Connecting" />
  );
};
