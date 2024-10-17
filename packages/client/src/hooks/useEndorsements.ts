import { z } from "zod";
import {
  SchemaEncoder,
  ZERO_ADDRESS,
} from "@ethereum-attestation-service/eas-sdk";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { EAS } from "@/constants";

import { getProjectEndorsements } from "@/actions/endorsements";

import { useEas } from "@/hooks/useEas";

const endorsementSchema = z.object({
  projectUID: z.string(),
  metricUID: z.string(),
  description: z.string(),
});

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export type CreateEndorsementParams = z.infer<typeof endorsementSchema>;

export const useEndorsements = (projectUID: string) => {
  const { eas } = useEas();
  const { data, refetch } = useQuery({
    queryKey: ["endorsements", projectUID],
    queryFn: () => getProjectEndorsements(projectUID),
    staleTime: 30000,
    refetchInterval: 120000,
  });

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

      await delay(2000);
      await refetch();

      toast.dismiss();
      toast.success("Endorsement successfully made!");

      return newAttestationUID;
    } catch (error) {
      console.error("Failed to make endorsement:", error);
      toast.dismiss();
      toast.error("Error endorsing project, please try again.");
    }
  };

  return { createEndorsement, endorsementList: data ?? [] };
};
