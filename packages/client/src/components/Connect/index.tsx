"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import React, { useRef } from "react";
import { ConnectKitButton } from "connectkit";

import { Web3Provider } from "@/hooks/auth/Provider";

interface Link {
  title: string;
  icon: string;
  action?: () => void;
}

export interface ConnectProps {}

export const Connect: React.FC<ConnectProps> = () => {
  return (
    <Web3Provider>
      <ConnectContent />
    </Web3Provider>
  );
};

export const ConnectContent: React.FC<ConnectProps> = () => {
  // const {
  //   isAuthenticated,
  //   // profile,
  //   // handleNonce,
  //   handleConnect,
  //   handleLogout,
  //   handleError,
  // } = useAuth();

  // const getNonce = useCallback(async () => {
  //   const nonce = await getCsrfToken();
  //   if (!nonce) throw new Error("Unable to generate nonce");
  //   return nonce;
  // }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const profileLinks: Link[] = [
    { title: "endorsements", icon: "/icons/fire.svg" },
    { title: "metrics", icon: "/icons/flag.svg" },
    { title: "criteria", icon: "/icons/newspaper.svg" },
    { title: "settings", icon: "/icons/flag.svg" },
    // { title: "logout", icon: "/icons/fire.svg", action: handleLogout },
  ];

  async function handleConnectClick() {
    try {
      // await connect();
      // signIn();

      dialogRef.current?.showModal();
    } catch (error) {
      toast("Error starting sign in");
    }
  }

  return (
    <div className="">
      {true ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {/* <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              /> */}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {profileLinks.map((link) => (
              <li key={link.title} className="capitalize font-semibold">
                {link?.action ? (
                  <button onClick={link.action}>{link.title}</button>
                ) : (
                  <Link href={`/profile/${link.title}`}>{link.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ConnectKitButton />
      )}
    </div>
  );
};
