"use server";
import { graphql } from "gql.tada";
import {
  SchemaEncoder,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";
import { Hex, decodeAbiParameters, parseAbiParameters } from "viem";

import { eas } from "@/modules/eas";
import { easOptimismClient, easOptimismSepoliaClient } from "@/modules/urql";

import { EAS } from "@/constants";

export const claimProjectMetric = async (
  metric: CreateProjectMetric,
  signer: TransactionSigner
) => {
  "use client";

  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(EAS[10].PROJECT_METRICS.schema);

  const encodedData = schemaEncoder.encodeData([
    { name: "projectUID", value: metric.projectUID, type: "bytes32" },
    { name: "metricUID", value: metric.metricUID ?? "", type: "bytes32" },
    { name: "value", value: metric.value, type: "string" },
    { name: "source", value: metric.source, type: "string" },
  ]);

  const transaction = await eas.attest({
    schema: EAS[10].ENDORSEMENTS.uid,
    data: {
      recipient: metric.recipient ?? "",
      // expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await transaction.wait();

  console.log("New attestation UID:", newAttestationUID);
  console.log("Transaction receipt:", transaction.receipt);
};

export const getProjectBuilders = async () => {
  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        data
        decodedDataJson
      }
    }
  `);

  const { data, error } = await easOptimismClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].PROJECT_OWNERS.uid },
      },
    })
    .toPromise();

  if (error) {
    console.error(error);
    return;
  }

  if (!data) {
    console.error("No data found");
    return;
  }

  // TODO - bit of a hack to cast as bigint, should be enforced by the schema tho
  return data.attestations
    .map((ownerAttestation) =>
      decodeAbiParameters(
        parseAbiParameters(EAS["10"].PROJECT_OWNERS.schema),
        ownerAttestation.data as Hex
      )
    )
    .flatMap((decodedData) => decodedData) as bigint[];
};

export const getProjects = async () => {
  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        data
        decodedDataJson
      }
    }
  `);

  const { data, error } = await easOptimismClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].PROJECT_METADATA.uid },
      },
    })
    .toPromise();

  if (error) {
    console.error(error);
    return;
  }

  if (!data) {
    console.error("No data found");
    return;
  }

  // TODO - bit of a hack to cast as bigint, should be enforced by the schema tho
  return data.attestations
    .map((ownerAttestation) =>
      decodeAbiParameters(
        parseAbiParameters(EAS["10"].PROJECT_OWNERS.schema),
        ownerAttestation.data as Hex
      )
    )
    .flatMap((decodedData) => decodedData) as bigint[];
};

export const getProject = async (projectId?: string | null) => {
  if (!projectId) {
    console.error("No project ID provided");
    return;
  }

  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        data
        decodedDataJson
      }
    }
  `);

  return await easOptimismClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].PROJECT_METADATA.uid },
        decodedDataJson: { contains: projectId },
      },
    })
    .toPromise();
};

export const getProjectMetrics = async (projectId?: string | null) => {
  if (!projectId) {
    console.error("No project ID provided");
    return;
  }

  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        data
        decodedDataJson
      }
    }
  `);

  return await easOptimismSepoliaClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].PROJECT_METRICS.uid },
        decodedDataJson: { contains: projectId },
      },
    })
    .toPromise();
};
