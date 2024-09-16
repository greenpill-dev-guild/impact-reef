"use client";

import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";

import { getUserEndorsements } from "@/actions/endorsements";

export interface ProfileEndorsementsProps {}

const ProfileEndorsementsView: React.FC<ProfileEndorsementsProps> = () => {
  const account = useAccount();

  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [endorsement, setEndorsement] = useState<Endorsement>();

  useEffect(() => {
    const updateEndorsements = async () => {
      const updatedEndorsements = await getUserEndorsements(account.address);
      setEndorsements(updatedEndorsements);
    };
    updateEndorsements();
  }, []);

  return (
    <div className="flex max-w-xl flex-col gap-4">
      <h2 className="text-3xl font-bold leading-7">Endorsements</h2>
      <ul>
        {endorsements.map((endorsement) => (
          <li key={endorsement.id} className="flex flex-col gap-2">
            {/* <span className="text-slate-600">{endorsement.project}</span>
            <span className="text-slate-600">{endorsement.endorser}</span>
            <span className="text-slate-600">{endorsement.endorsement}</span> */}
          </li>
        ))}
      </ul>
      <dialog id="endorsement-dialog" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProfileEndorsementsView;
