"use client";

import React from "react";
import Link from "next/link";

export interface ProfileEndorsementsProps {
  endorsements: Endorsement[];
}

const ProfileEndorsementsView: React.FC<ProfileEndorsementsProps> = ({
  endorsements,
}) => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <h2 className="text-3xl font-bold leading-7">Endorsements</h2>
      <ul className="flex flex-col gap-2">
        {endorsements.map((endorsement) => (
          <li
            key={endorsement.id}
            className="flex flex-col items-center justify-between gap-8 rounded-xl border-slate-100 p-4 shadow-sm"
          >
            <p className="max-w-prose font-light leading-snug">
              {endorsement.description}
            </p>
            <div className="flex w-full justify-between">
              <span className="">{endorsement.created_at}</span>
              <Link
                href={`https://sepolia.easscan.org/${endorsement.id}`}
                target="_blank"
                className="button button-link"
              >
                View Attestation
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileEndorsementsView;
