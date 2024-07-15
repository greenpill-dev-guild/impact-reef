"use client";

import React from "react";
import { useAccount } from "wagmi";

export interface ProfileSettingsProps {
  user?: User;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const { address } = useAccount();

  console.log("User Address", address, user);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <button className="text-gray-600 hover:text-gray-900">Logout</button>
      </div>

      <div className="mt-4 bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Wallet address
          </label>
          <div className="mt-1 flex items-center">
            <span className="text-gray-600">0x1234....1234</span>
            <button className="ml-4 bg-blue-500 text-white py-1 px-3 rounded">
              Disconnect
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Connect wallet for attestation submission
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Farcaster ID
          </label>
          <div className="mt-1">
            <span className="text-gray-600">@Chiali</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Recommended for project builders to claim ownership to enable
            self-claim impact attestation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
