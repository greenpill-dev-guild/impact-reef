import { z } from "zod";
import toast from "react-hot-toast";
import {
  AttestationRequestData,
  SchemaEncoder,
  ZERO_ADDRESS,
} from "@ethereum-attestation-service/eas-sdk";

import { EAS } from "@/constants";
import { useEas } from "@/hooks/useEas";

const claimMetricsSchema = z.array(
  z.object({
    projectUID: z.string(),
    metricUID: z.string(),
    value: z.string(),
    source: z.string(),
  })
);

export type CreateMetricsClaimParams = z.infer<typeof claimMetricsSchema>;

export const useClaimMetrics = () => {
  const { eas } = useEas();

  const createMetricsClaim = async (params: CreateMetricsClaimParams) => {
    const metrics = claimMetricsSchema.parse(params);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(
      EAS[11155111].PROJECT_METRICS.schema
    );

    const data = metrics.map<AttestationRequestData>((metric) => {
      const encodedData = schemaEncoder.encodeData([
        { name: "projectUID", value: metric.projectUID, type: "bytes32" },
        { name: "metricUID", value: metric.metricUID ?? "", type: "bytes32" },
        { name: "value", value: metric.value, type: "string" },
        { name: "source", value: metric.source, type: "string" },
      ]);

      return {
        recipient: ZERO_ADDRESS,
        expirationTime: BigInt(0),
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      };
    });

    try {
      toast.loading("Claiming Project Metrics...");

      const transaction = await eas.multiAttest([
        {
          schema: EAS[11155111].PROJECT_METRICS.uid,
          data,
        },
      ]);

      const uids = await transaction.wait();

      toast.dismiss();
      toast.success("Project metrics claimed successfully");
      console.log("New attestation UIDs:", uids);
      console.log("Transaction receipt:", transaction.receipt);

      return uids;
    } catch (error) {
      console.error("Failed to create claim:", error);
      toast.error("Error endorsing project");
    }
  };

  return { createMetricsClaim };
};
