"use server";

import { graphql } from "gql.tada";
// import { getFarcasterUserDataById } from "@/actions/farcaster";
// import { Hex, decodeAbiParameters, parseAbiParameters } from "viem";

import { easOptimismClient } from "@/modules/urql";

import { EAS } from "@/constants";

import { metrics, endorsements, projects } from "@/utils/mockData";

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
    })[23][1] ?? []
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

  console.log(
    "Projects API",
    JSON.parse(data?.attestations[0].decodedDataJson!)
  );

  return projects;
};

export const getProject = async (
  projectId?: string | null
): Promise<Project> => {
  const project: Project = {
    id: "1",
    title: "Protocol Guild",
    creator: "0x00",
    attestation_counts: 0,
    transactions_count: 0,
    avatar_image: "/images/project-icon.png",
    banner_image: "/images/project-banner.jpg",
    category: "utility",
    description: `As a rollup, Optimism leverages Ethereum for settlement &
                security assurances. It also uses several core infrastructure
                components (client implementations, specifications, test suites,
                etc) developed and maintained by Protocol Guild contributors
                over the years. Optimism.`,
    endorsements,
    contracts: ["link1", "link2"],
    funding: [
      {
        date: new Date().toLocaleDateString(),
        description: "description goes here, i think its about 280 characters",
        funds_received: "50k OP",
        title: "Optimism Grants",
        link: "link",
      },
      {
        date: new Date().toLocaleDateString(),
        description: "description goes here, i think its about 280 characters",
        funds_received: "40k USD",
        title: "Venture Funding",
        link: "link",
      },
    ],
    grant_track: "onchain-builders",
    repositories: ["https://gtihub.com/wefa-labs/wefa", "link"],
    metrics,
    socials: [
      "https://twitter.com/wefaworld",
      "https://t.me/afo_wefa",
      "https://warpcast.com/wefa",
      "https://why.wefa.app",
    ],
    updated_at: "",
  };

  if (!projectId) console.error("No project ID provided");

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
        decodedDataJson: { contains: projectId },
      },
    })
    .toPromise();

  if (error) console.error(error);
  if (!data) console.error("No data found");

  console.log("Project API", data);

  return project;
};
