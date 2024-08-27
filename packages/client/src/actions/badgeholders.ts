"use server";

import { graphql } from "gql.tada";

import { easOptimismClient } from "@/modules/urql";

import { EAS } from "@/constants";

export const getBadgeholder = async (
  address?: string | null
): Promise<boolean> => {
  if (!address) console.error("No address provided");

  // TODO add filter on 'where: {valid: true}'
  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        id
      }
    }
  `);

  const { data, error } = await easOptimismClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].BADGEHOLDERS.uid },
        attester: { equals: EAS["10"].OPTIMISM.address },
        recipient: { equals: address },
      },
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.error("No data found");

  console.log("User Badgeholder API", data);

  return !!data?.attestations.length;
};

export const getBadgeholders = async (): Promise<string[]> => {
  // TODO add filter on 'where: {valid: true}'
  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        recipient
      }
    }
  `);

  const { data, error } = await easOptimismClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].BADGEHOLDERS.uid },
        attester: { equals: EAS["10"].OPTIMISM.address },
      },
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.error("No data found");

  console.log("Badgeholders API", data);

  return data?.attestations.map((attest) => attest.recipient) ?? [];
};
