"use client";

import React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";

import { getUserEndorsements } from "@/actions/endorsements";

export interface ProfileEndorsementsProps {
  endorsements: Endorsement[];
}

const ProfileEndorsementsView: React.FC<ProfileEndorsementsProps> = () => {
  const { address } = useAccount();

  const { data: endorsements } = useQuery({
    queryKey: ["endorsements", address],
    queryFn: () => getUserEndorsements(address),
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold leading-7">Endorsements</h2>
      <div className="w-full flex-1">
        {endorsements?.length ? (
          <ul className="flex max-w-xl flex-col gap-2">
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
        ) : (
          <p className="grid h-full w-full place-items-center py-12 text-center text-lg font-light">
            No endorsements made yet, go support your favorite projects!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileEndorsementsView;
