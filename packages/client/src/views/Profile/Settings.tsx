"use client";

import React from "react";
// import { signOut } from "next-auth/react";
import { useAccount, useDisconnect } from "wagmi";
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
    // signOut({
    //   callbackUrl: "/",
    //   redirect: true,
    // });
    disconnect();
  }

  // const address = user?.address;

  return (
    <div className="mt-4 flex flex-col gap-12">
      <div className="border-b-2 border-slate-200 pb-8">
        <h4 className="mb-2">Wallet Address</h4>
        <p className="mb-4 font-light">
          Current wallet address connected to your account.
        </p>
        <span className="">{address ? formatAddress(address) : ""}</span>
      </div>
      <div className="border-b-2 border-slate-200 pb-8">
        <h4 className="mb-2">Farcaster ID</h4>
        <p className="mb-4 font-light">
          Recommended for project builders to claim ownership to enable
          self-claim impact attestation.
        </p>
        <span className="">{walletInfo?.name ?? ""}</span>
      </div>
      <div>
        {address && (
          <button onClick={handleLogout} className="button-secondary">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
