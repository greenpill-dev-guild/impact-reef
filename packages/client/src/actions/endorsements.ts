"use server";

import { EAS } from "@/constants";

import { easGraphQL, easSepoliaClient } from "@/modules/graphql";

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
    data?.attestations.map(({ id, attester, timeCreated, decodedDataJson }) =>
      parseDataToEndorsementItem(id, attester, timeCreated, decodedDataJson),
    ) ?? []
  );
};
