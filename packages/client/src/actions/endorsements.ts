"use server";
import { graphql } from "gql.tada";
import {
  SchemaEncoder,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";
import { Hex, decodeAbiParameters, parseAbiParameters } from "viem";

import { EAS } from "@/constants";

import { eas } from "@/modules/eas";
import { easOptimismSepoliaClient } from "@/modules/urql";

export const createEndorsements = async (
  endorsement: CreateEndorsement,
  signer: TransactionSigner
) => {
  "use client";

  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(EAS[10].ENDORSEMENTS.schema);

  const encodedData = schemaEncoder.encodeData([
    { name: "projectUID", value: endorsement.projectUID, type: "bytes32" },
    { name: "metricUID", value: endorsement.metricUID ?? "", type: "bytes32" },
    { name: "description", value: endorsement.description, type: "string" },
  ]);

  const transaction = await eas.attest({
    schema: EAS[10].ENDORSEMENTS.uid,
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
};

export const getProjectEndorsements = async (projectUID?: string | null) => {
  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        data
        decodedDataJson
      }
    }
  `);

  const { data, error } = await easOptimismSepoliaClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].ENDORSEMENTS.uid },
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

export const getAddressEndorsements = async (address?: string | null) => {
  if (!address) {
    console.error("No address provided");
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
        schemaId: { equals: EAS["10"].PROJECT_METADATA.uid },
        attester: { equals: address },
      },
    })
    .toPromise();
};
