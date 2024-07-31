"use server";

import { graphql } from "gql.tada";
import {
  SchemaEncoder,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";

import { EAS } from "@/constants";

import { eas } from "@/modules/eas";
import { easSepoliaClient } from "@/modules/urql";

import { endorsements } from "@/utils/mockData";

export const makeEndorsement = async (
  endorsement: CreateEndorsement,
  signer?: TransactionSigner
) => {
  "use client";

  if (!signer) throw new Error("No signer found");

  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(EAS[11155111].ENDORSEMENTS.schema);

  const encodedData = schemaEncoder.encodeData([
    { name: "projectUID", value: endorsement.projectUID, type: "bytes32" },
    { name: "metricUID", value: endorsement.metricUID ?? "", type: "bytes32" },
    { name: "description", value: endorsement.description, type: "string" },
  ]);

  const transaction = await eas.attest({
    schema: EAS[11155111].ENDORSEMENTS.uid,
    data: {
      recipient: endorsement.recipient ?? "",
      // expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await transaction.wait();

  console.log("New attestation UID:", newAttestationUID);
  console.log("Transaction receipt:", transaction.receipt);

  return newAttestationUID;
};

export const getProjectEndorsements = async (projectUID?: string | null) => {
  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        decodedDataJson
      }
    }
  `);

  const { data, error } = await easSepoliaClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["11155111"].ENDORSEMENTS.uid },
        decodedDataJson: { contains: projectUID },
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
};

export const getUserEndorsements = async (
  address?: string | null
): Promise<EndorsementItem[]> => {
  if (!address) console.error("No address provided");

  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        decodedDataJson
      }
    }
  `);

  const { data, error } = await easSepoliaClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["11155111"].ENDORSEMENTS.uid },
        attester: { equals: address },
      },
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.error("No data found");

  console.log("User endorsements", data);

  return endorsements;
};
