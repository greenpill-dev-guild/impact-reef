import { z } from "zod";
import { useState } from "react";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import {
  SchemaEncoder,
  ZERO_ADDRESS,
} from "@ethereum-attestation-service/eas-sdk";

import { EAS } from "@/constants";

import { getProjectEndorsements } from "@/actions/endorsements";

import { useEas } from "@/hooks/useEas";

const endorsementSchema = z.object({
  projectUID: z.string(),
  metricUID: z.string(),
  description: z.string(),
});

export type CreateEndorsementParams = z.infer<typeof endorsementSchema>;

export const useEndorsements = (endorsements: Endorsement[]) => {
  const { eas } = useEas();
  const { address } = useAccount();
  const [endorsementList, setEndorsementList] =
    useState<Endorsement[]>(endorsements);

  const createEndorsement = async (params: CreateEndorsementParams) => {
    const { projectUID, metricUID, description } =
      endorsementSchema.parse(params);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(EAS[10].ENDORSEMENTS.schema);

    const encodedData = schemaEncoder.encodeData([
      { name: "projectUID", value: projectUID, type: "bytes32" },
      { name: "metricUID", value: metricUID, type: "bytes32" },
      { name: "description", value: description, type: "string" },
    ]);

    try {
      const attestDialog = document.getElementById(
        "attest-drawer",
      ) as HTMLInputElement;
      attestDialog.checked = false;

      toast.loading("Submitting your endorsement onchain.");

      const transaction = await eas.attest({
        schema: EAS[10].ENDORSEMENTS.uid,
        data: {
          recipient: ZERO_ADDRESS,
          expirationTime: BigInt(0),
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });

      const newAttestationUID = await transaction.wait();

      const fetchedEndorsements = await getProjectEndorsements(projectUID);

      if (!fetchedEndorsements.find((e) => e.id === newAttestationUID)) {
        fetchedEndorsements.push({
          id: newAttestationUID,
          attester: address ?? "",
          projectUID,
          metricUID,
          description,
          created_at: new Date().toLocaleString(),
        });
      }

      setEndorsementList(fetchedEndorsements);

      toast.dismiss();
      toast.success("Endorsement successfully made!");

      return newAttestationUID;
    } catch (error) {
      console.error("Failed to make endorsement:", error);
      toast.dismiss();
      toast.error("Error endorsing project, please try again.");
    }
  };

  return { createEndorsement, endorsementList };
};
