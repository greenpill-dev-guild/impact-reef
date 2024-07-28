"use server";

import { graphql } from "gql.tada";
// import { getFarcasterUserDataById } from "@/actions/farcaster";
// import { Hex, decodeAbiParameters, parseAbiParameters } from "viem";

import { easOptimismClient } from "@/modules/urql";
import { endorsements, metrics } from "@/utils/mockData";

import { EAS } from "@/constants";
import { parseDataToProjectItem, fetchMetadata } from "@/utils/parseData";

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

// TODO filter on 'where: valid: true'
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

  // console.log(
  //   "Projects API"
  //   // JSON.parse(data?.attestations[0].decodedDataJson!)
  // );

  // {
  //   id: "1",
  //   creator: "",
  //   title: "Project name",
  //   avatar_image: "/images/project-icon.png",
  //   category: "cefi",
  //   updated_at: new Date().toISOString(),
  // },

  // const data = [
  //   {
  //     name: "projectRefUID",
  //     type: "bytes32",
  //     signature: "bytes32 projectRefUID",
  //     value: {
  //       name: "projectRefUID",
  //       type: "bytes32",
  //       value:
  //         "0xa32db8cca8e3d1e4c052d37efe89f1cdad683793f26e0bb0e4923e3deb2696e1",
  //     },
  //   },
  //   {
  //     name: "name",
  //     type: "string",
  //     signature: "string name",
  //     value: { name: "name", type: "string", value: "Test" },
  //   },
  //   {
  //     name: "category",
  //     type: "string",
  //     signature: "string category",
  //     value: { name: "category", type: "string", value: "Test" },
  //   },
  //   {
  //     name: "parentProjectRefUID",
  //     type: "bytes32",
  //     signature: "bytes32 parentProjectRefUID",
  //     value: {
  //       name: "parentProjectRefUID",
  //       type: "bytes32",
  //       value:
  //         "0x0000000000000000000000000000000000000000000000000000000000000000",
  //     },
  //   },
  //   {
  //     name: "metadataType",
  //     type: "uint8",
  //     signature: "uint8 metadataType",
  //     value: { name: "metadataType", type: "uint8", value: 1 },
  //   },
  //   {
  //     name: "metadataUrl",
  //     type: "string",
  //     signature: "string metadataUrl",
  //     value: {
  //       name: "metadataUrl",
  //       type: "string",
  //       value:
  //         "https://op-atlas-test.mypinata.cloud/ipfs/QmdzJA1cniQD7zBkLpD2J4grUcHR4xtFwx1VA3P2rwYorE",
  //     },
  //   },
  // ];

  // return type is Pick<ProjectItem, "id" | "title" | "avatar_image" | "category" | "updated_at">[]
  // TODO add zod schema validations on data
  return await Promise.all(
    data.attestations.map(
      async ({ decodedDataJson }) =>
        await parseDataToProjectItem(decodedDataJson)
    )
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
      orderBy: {
        timeCreated: "desc"
      },
      take: 1
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.error("No data found");

  // TODO add placeholder image urls
  const parseDataToProjectDetails = async (data: any): Promise<Project> => {
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
      attestation_counts: 420,
      transactions_count: 69,
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

  console.log("Project data: ", data);

  if(data.attestations.length === 0) {
    console.error("No data found");
    return;
  }

  return await parseDataToProjectDetails(data.attestations[0].decodedDataJson);
};
