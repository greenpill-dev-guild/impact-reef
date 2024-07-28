"use client";

import React from "react";
import Link from "next/link";
import { SiweMessage } from "siwe";
import { ConnectKitButton, useModal } from "connectkit";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

import { login, logout } from "@/actions/auth";

interface Link {
  title: string;
  icon: string;
  action?: () => void;
}

export interface ConnectProps {}

export const Connect: React.FC<ConnectProps> = () => {
  return <ConnectContent />;
};

export const ConnectContent: React.FC<ConnectProps> = () => {
  const { disconnect } = useDisconnect();
  const { chainId, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  async function handleConnect({
    address,
    connectorId,
  }: {
    address?: string;
    connectorId?: string;
  }) {
    // const nonce = await getCsrfToken();
    // console.log("Client Nonce", nonce);

    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in to Impact Reef",
      uri: window.location.origin,
      version: "1",
      chainId,
      // nonce,
    }).prepareMessage();

    const signature = await signMessageAsync({ message });

    login({ message, signature });
  }

  async function handleDisconnect() {
    logout();
  }

  const profileLinks: Link[] = [
    { title: "endorsements", icon: "/icons/fire.svg" },
    // { title: "metrics", icon: "/icons/flag.svg" },
    // { title: "criteria", icon: "/icons/newspaper.svg" },
    { title: "settings", icon: "/icons/flag.svg" },
    { title: "logout", icon: "/icons/fire.svg", action: disconnect },
  ];

  useModal({
    onConnect: handleConnect,
    onDisconnect: handleDisconnect,
  });

  return (
    <div className="basis-12 w-full">
      {address ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn inline-flex btn-outline border-bl justify-center items-center gap-2 w-32 p-4  text-zinc-800 font-semibold hover:fill-white hover:text-white"
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
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {profileLinks.map((link) => (
              <li key={link.title} className="capitalize font-semibold">
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
        <ConnectKitButton customTheme={""} />
      )}
    </div>
  );
};
