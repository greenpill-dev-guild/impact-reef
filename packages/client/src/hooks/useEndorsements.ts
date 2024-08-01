import { z } from "zod";
import toast from "react-hot-toast";
import {
  SchemaEncoder,
  ZERO_ADDRESS,
} from "@ethereum-attestation-service/eas-sdk";

import { EAS } from "@/constants";

import { useEas } from "@/hooks/useEas";

const endorsementSchema = z.object({
  projectUID: z.string(),
  metricUID: z.string(),
  description: z.string(),
});

export type CreateEndorsementParams = z.infer<typeof endorsementSchema>;

export const useEndorsements = () => {
  const { eas } = useEas();

  const createEndorsement = async (params: CreateEndorsementParams) => {
    const { projectUID, metricUID, description } =
      endorsementSchema.parse(params);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(EAS[11155111].ENDORSEMENTS.schema);

    const encodedData = schemaEncoder.encodeData([
      { name: "projectUID", value: projectUID, type: "bytes32" },
      { name: "metricUID", value: metricUID, type: "bytes32" },
      { name: "description", value: description, type: "string" },
    ]);

    try {
      toast.loading("Making endorsement...");

      const transaction = await eas.attest({
        schema: EAS[11155111].ENDORSEMENTS.uid,
        data: {
          recipient: ZERO_ADDRESS,
          expirationTime: BigInt(0),
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });

      const newAttestationUID = await transaction.wait();

      toast.dismiss();
      toast.success("Endorsement made successfully");

      return newAttestationUID;
    } catch (error) {
      console.error("Failed to make endorsement:", error);
      toast.dismiss();
      toast.error("Error endorsing project, please try again");
    }
  };

  return { createEndorsement };
};
