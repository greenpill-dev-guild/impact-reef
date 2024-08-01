"use server";

import { graphql } from "gql.tada";
import {
  SchemaEncoder,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";

import { EAS } from "@/constants";

import { EAS as EAS_REGISTRY } from "@ethereum-attestation-service/eas-sdk";
import { easSepoliaClient } from "@/modules/urql";

import { parseDataToEndorsementItem } from "@/utils/parseData";

export const getProjectEndorsements = async (
  projectUID?: string | null
): Promise<Endorsement[]> => {
  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        id
        attester
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

  if (error) console.error(error);
  if (!data) console.error("No data found");

  return (
    data?.attestations.map(({ id, attester, decodedDataJson }) =>
      parseDataToEndorsementItem(id, attester, decodedDataJson)
    ) ?? []
  );
};

export const getUserEndorsements = async (
  address?: string | null
): Promise<Endorsement[]> => {
  if (!address) console.error("No address provided");

  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        id
        attester
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

  return (
    data?.attestations.map(({ id, attester, decodedDataJson }) =>
      parseDataToEndorsementItem(id, attester, decodedDataJson)
    ) ?? []
  );
};
