"use client";

import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { signOut } from "next-auth/react";
import { useWalletInfo } from "@web3modal/wagmi/react";

import { formatAddress } from "@/utils/text";

export interface ProfileSettingsProps {
  user?: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { walletInfo } = useWalletInfo();

  function handleLogout() {
    signOut({
      callbackUrl: "/",
    });
    disconnect();
  }

  // const address = user?.address;

  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-3xl font-bold leading-7">Settings</h2>
      <div className="border-b-2 border-slate-200 pb-8">
        <h4 className="mb-2">Wallet Address</h4>
        <p className="mb-4 font-light">
          Current wallet address connected to your account.
        </p>
        <span className="">{formatAddress(address!)}</span>
      </div>
      <div className="border-b-2 border-slate-200 pb-8">
        <h4 className="mb-2">Farcaster ID</h4>
        <p className="mb-4 font-light">
          Recommended for project builders to claim ownership to enable
          self-claim impact attestation.
        </p>
        <span className="">{walletInfo?.name}</span>
      </div>
      <div>
        <button onClick={handleLogout} className="button-secondary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
