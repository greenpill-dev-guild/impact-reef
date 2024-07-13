import {
  SchemaEncoder,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";

import { eas } from "@/modules/eas";
import { EAS } from "@/constants";

export async function createMetric(
  metric: CreateMetric,
  signer: TransactionSigner
) {
  "use client";

  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(EAS[10].METRICS.schema);

  const encodedData = schemaEncoder.encodeData([
    { name: "name", value: metric.name, type: "string" },
    { name: "description", value: metric.description, type: "string" },
    { name: "importnce", value: metric.impact, type: "string" },
    { name: "rationale", value: metric.rationale, type: "string" },
    { name: "keyword", value: metric.keyword, type: "string" },
    { name: "term", value: metric.term, type: "string" },
    { name: "category", value: metric.category, type: "string" },
  ]);

  const transaction = await eas.attest({
    schema: EAS[10].METRICS.uid,
    data: {
      recipient: "",
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await transaction.wait();

  console.log("New attestation UID:", newAttestationUID);
  console.log("Transaction receipt:", transaction.receipt);
}

export async function deprecateMetric(uid: string, signer: TransactionSigner) {
  "use client";

  eas.connect(signer);

  const transaction = await eas.revoke({
    schema: EAS[10].METRICS.uid,
    data: {
      uid,
    },
  });

  const newAttestationUID = await transaction.wait();

  console.log("Revoked UID:", newAttestationUID);
  console.log("Transaction receipt:", transaction.receipt);
}
