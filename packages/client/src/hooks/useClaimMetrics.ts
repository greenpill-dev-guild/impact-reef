import {useEas} from "@/hooks/useEas";
import {SchemaEncoder, ZERO_ADDRESS} from "@ethereum-attestation-service/eas-sdk";
import {EAS} from "@/constants";
import {z} from "zod";
import toast from "react-hot-toast";
import {isHex} from "viem";


const claimMetricsSchema = z.object({
    projectUID: z.string(),
    metricUID: z.string(),
    value: z.string(),
    source: z.string(),
})

export type CreateMetricsClaimParams = z.infer<typeof claimMetricsSchema>;

export const useClaimMetrics = () => {
    const {eas} = useEas();

    const createMetricsClaim = async (params: CreateMetricsClaimParams) => {
        const {projectUID, metricUID, value, source} = claimMetricsSchema.parse(params);

        // Initialize SchemaEncoder with the schema string
        const schemaEncoder = new SchemaEncoder(EAS[11155111].PROJECT_METRICS.schema);

        const encodedData = schemaEncoder.encodeData([
            {name: "projectUID", value: projectUID, type: "bytes32"},
            {name: "metricUID", value: metricUID, type: "bytes32"},
            {name: "value", value: value, type: "string"},
            {name: "source", value: source, type: "string"},
        ]);

        console.log("Making metrics claim attestation...");

        const transaction = await eas
            .attest({
                schema: EAS[11155111].PROJECT_METRICS.uid,
                data: {
                    recipient: ZERO_ADDRESS,
                    expirationTime: BigInt(0),
                    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
                    data: encodedData,
                },
            })
            .then(async (transaction) => {
                const newAttestationUID = await transaction.wait();

                return newAttestationUID;
            })
            .catch((error) => {
                toast.error("Failed to create claim: " + error.message);
                console.error("Failed to create claim:", error);
            });

    }

    return {createMetricsClaim};
}