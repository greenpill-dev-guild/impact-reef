"use server";

import { graphql } from "gql.tada";

import { easOptimismClient } from "@/modules/urql";

import { EAS } from "@/constants";
import { parseDataToProjectItem, fetchMetadata } from "@/utils/parseData";

import { getProjectMetrics } from "./metrics";
import { getProjectEndorsements } from "./endorsements";

// TODO add cache for metadata fetching
export const getProjectBuilders = async (): Promise<any[]> => {
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

  if (error) console.error(error);
  if (!data) console.error("No data found");

  return (
    data?.attestations.map((data) => {
      const json = JSON.parse(data.decodedDataJson);
      return json;
    }) ?? []
  );

  // TODO - bit of a hack to cast as bigint, should be enforced by the schema tho
  // return data.attestations
  //   .map((ownerAttestation) =>
  //     decodeAbiParameters(
  //       parseAbiParameters(EAS["10"].PROJECT_OWNERS.schema),
  //       ownerAttestation.data as Hex
  //     )
  //   )
  //   .flatMap((decodedData) => decodedData) as bigint[];
};

export const getProjects = async (): Promise<ProjectItem[]> => {
  const QUERY = graphql(/* GraphQL */ `
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
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

  if (error) console.error(error);
  if (!data) console.error("No data found");

  // return type is Pick<ProjectItem, "id" | "title" | "avatar_image" | "category" | "updated_at">[]
  // TODO add zod schema validations on data
  return await Promise.all(
    data?.attestations.map(
      async ({ decodedDataJson }) =>
        await parseDataToProjectItem(decodedDataJson)
    ) ?? []
  );
};

export const getProjectDetails = async (
  projectId?: string | null
): Promise<Project | undefined> => {
  if (!projectId) console.error("No project ID provided");

  const QUERY = graphql(/* GraphQL */ `
    query Attestations(
      $where: AttestationWhereInput!
      $orderBy: [AttestationOrderByWithRelationInput!]
      $take: Int
    ) {
      attestations(where: $where, orderBy: $orderBy, take: $take) {
        id
        decodedDataJson
        timeCreated
      }
    }
  `);

  const { data, error } = await easOptimismClient
    .query(QUERY, {
      where: {
        schemaId: { equals: EAS["10"].PROJECT_METADATA.uid },
        decodedDataJson: { contains: projectId },
        revoked: { equals: false },
      },
      orderBy: [
        {
          timeCreated: "desc",
        },
      ],
      take: 1,
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.error("No data found");

  // TODO add placeholder image urls
  const parseDataToProjectDetails = async (data: any): Promise<Project> => {
    const metrics = await getProjectMetrics(projectId);
    const endorsements = await getProjectEndorsements(projectId);

    const _data = JSON.parse(data);
    const metadata = await fetchMetadata(
      _data.filter((d: any) => d.name === "metadataUrl")[0].value.value!
    );

    // TODO get metrics
    // TODO get grant_track
    // TODO get attestations and counts
    // TODO get creator
    // TODO get funding

    return {
      id: _data.filter((d: any) => d.name === "projectRefUID")[0]["value"]
        .value,
      title: _data.filter((d: any) => d.name === "name")[0].value.value!,
      creator: "vitalik.eth",
      avatar_image: metadata.projectAvatarUrl,
      banner_image: metadata.projectCoverImageUrl,
      category: _data.filter((d: any) => d.name === "category")[0].value.value!,
      description: metadata.description,
      endorsements,
      contracts: metadata?.contracts || [],
      funding: [],
      grant_track: "onchain-builders",
      repositories:
        metadata.github && metadata.github.length > 0 ? metadata.github : [],
      metrics,
      socials:
        metadata.socialLinks && metadata.socialLinks.length > 0
          ? Object.values(metadata.socialLinks)
          : [],
      updated_at: new Date().toISOString(),
    };
  };

  // console.log("Project data: ", data);

  if (!data || data?.attestations.length === 0) {
    console.error("No data found");
    return;
  }

  return await parseDataToProjectDetails(data.attestations[0].decodedDataJson);
};
