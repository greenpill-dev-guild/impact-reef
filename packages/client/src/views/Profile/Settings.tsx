"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useAccount, useDisconnect } from "wagmi";

import { formatAddress } from "@/utils/text";

export interface ProfileSettingsProps {
  user?: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const { data: session } = useSession();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  function handleLogout() {
    disconnect();
  }

  return (
    <div className="flex flex-col gap-12">
      <h2 className="text-3xl font-bold leading-7">Settings</h2>
      <div className="border-b-2 border-slate-200 pb-8">
        <h4 className="mb-2">Wallet Address</h4>
        <p className="mb-4 font-light text-slate-600">
          Current wallet address connected to your account.
        </p>
        <span className="text-slate-600">{formatAddress(address!)}</span>
      </div>
      <div className="border-b-2 border-slate-200 pb-8">
        <h4 className="mb-2">Farcaster ID</h4>
        <p className="mb-4 font-light text-slate-600">
          Recommended for project builders to claim ownership to enable
          self-claim impact attestation.
        </p>
        <span className="">{session?.user.name}</span>
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
