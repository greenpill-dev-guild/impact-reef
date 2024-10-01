"use server";

import { EAS } from "@/constants";

import { easGraphQL } from "@/modules/graphql";
import { easOptimismClient } from "@/modules/urql";

import { parseDataToEndorsementItem } from "@/utils/parseData";

export const getProjectEndorsements = async (
  projectUID?: string | null,
): Promise<Endorsement[]> => {
  const QUERY = easGraphQL(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        id
        attester
        timeCreated
        decodedDataJson
      }
    }
  `);

  const { data, error } = await easOptimismClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].ENDORSEMENTS.uid },
        decodedDataJson: { contains: projectUID },
      },
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.error("No data found");

  return (
    data?.attestations.map(({ id, attester, timeCreated, decodedDataJson }) =>
      parseDataToEndorsementItem(id, attester, timeCreated, decodedDataJson),
    ) ?? []
  );
};

export const getUserEndorsements = async (
  address?: string | null,
): Promise<Endorsement[]> => {
  if (!address) {
    console.error("No address provided");
    return [];
  }

  const QUERY = easGraphQL(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        id
        attester
        timeCreated
        decodedDataJson
      }
    }
  `);

  const { data, error } = await easOptimismClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].ENDORSEMENTS.uid },
        attester: { equals: address },
      },
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.error("No data found");

  return (
    data?.attestations.map(({ id, attester, timeCreated, decodedDataJson }) =>
      parseDataToEndorsementItem(id, attester, timeCreated, decodedDataJson),
    ) ?? []
  );
};
