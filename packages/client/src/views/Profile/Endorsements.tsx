"use client"
import React, {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {getUserEndorsements} from "@/actions/endorsements";
import {List} from "@/components/List";

export interface ProfileEndorsementsProps {
}

const ProfileEndorsements: React.FC<ProfileEndorsementsProps> = () => {
    const account = useAccount();

    const [endorsements, setEndorsements] = useState<Endorsement[]>([])

    useEffect(() => {
        const updateEndorsements = async () => {
            const updatedEndorsements = await getUserEndorsements(account.address)
            setEndorsements(updatedEndorsements)
        }
        updateEndorsements()
    }, [])


    return (
        <div className="flex flex-col gap-4 max-w-xl">
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Endorsements</h2>
                <p className="text-sm font-light">Endorsements given to projects</p>
            </div>
            <List
                columns={[]}
                items={endorsements}
                onItemClick={(id) => {
                    // TODO: Open Dialog
                }}
            />
        </div>
    );
};

export default ProfileEndorsements;