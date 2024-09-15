"use server";

import {graphql} from "gql.tada";

import {easOptimismClient, easSepoliaClient} from "@/modules/urql";

import {EAS} from "@/constants";
import {
    fetchMetadata,
    parseDataToProjectMetric, parseOpProjectToProjectItem,
} from "@/utils/parseData";

import {getProjectEndorsements} from "./endorsements";
import {getRetroFundingRoundProjects, getRetroFundingRoundProjectsResponse} from "@/__generated__/api/agora";
import {PageMetadata} from "@/__generated__/api/agora.schemas";

// // TODO add cache for metadata fetching
// export const getProjectBuilders = async (): Promise<any[]> => {
//     const QUERY = graphql(/* GraphQL */ `
//         query Attestations($where: AttestationWhereInput) {
//             attestations(where: $where) {
//                 data
//                 decodedDataJson
//             }
//         }
//     `);
//
//     const {data, error} = await easOptimismClient
//         .query(QUERY, {
//             where: {
//                 schemaId: {equals: EAS["10"].PROJECT_OWNERS.uid},
//             },
//         })
//         .toPromise();
//
//     if (error) console.error(error);
//     if (!data) console.error("No data found");
//
//     return (
//         data?.attestations.map((data) => {
//             const json = JSON.parse(data.decodedDataJson);
//             return json;
//         }) ?? []
//     );
//
//     // TODO - bit of a hack to cast as bigint, should be enforced by the schema tho
//     // return data.attestations
//     //   .map((ownerAttestation) =>
//     //     decodeAbiParameters(
//     //       parseAbiParameters(EAS["10"].PROJECT_OWNERS.schema),
//     //       ownerAttestation.data as Hex
//     //     )
//     //   )
//     //   .flatMap((decodedData) => decodedData) as bigint[];
// };


export type ProjectsResponse = {
    metadata?: PageMetadata;
    data?: Project[];
};

export const getProjects = async (): Promise<Partial<Project>[]> => {
    const projects = await getRetroFundingRoundProjects(5).then((results: getRetroFundingRoundProjectsResponse) => {
        const res: ProjectsResponse = results.data;
        return res.data;
    });

    if (!projects) return [];

    return projects.map((project: Project) => parseOpProjectToProjectItem(project));
};

// export const getProjectMetrics = async (
//     projectId?: string | null
// ): Promise<ProjectMetricItem[]> => {
//     if (!projectId) {
//         console.error("No project ID provided");
//         return [];
//     }
//
//     // TODO add 'where: valid: true' filter
//     const QUERY = graphql(/* GraphQL */ `
//         query Attestations($where: AttestationWhereInput) {
//             attestations(where: $where) {
//                 id
//                 recipient
//                 timeCreated
//                 decodedDataJson
//             }
//         }
//     `);
//
//     const {data, error} = await easSepoliaClient
//         .query(QUERY, {
//             where: {
//                 schemaId: {equals: EAS["11155111"].PROJECT_METRICS.uid},
//                 decodedDataJson: {contains: projectId},
//             },
//         })
//         .toPromise();
//
//     if (error) console.error(error);
//     if (!data) console.error("No data found");
//
//     return (
//         data?.attestations.map(({id, recipient, timeCreated, decodedDataJson}) =>
//             parseDataToProjectMetric(id, recipient, timeCreated, decodedDataJson)
//         ) ?? []
//     );
// };

export const getProjectDetails = async (
    projectId?: string | null
): Promise<Partial<Project> | undefined> => {
    if (!projectId) console.error("No project ID provided");

    const project = await getProjects().then((res) => res.find((project: Project) => project.id === projectId));

    console.log("Details found for project: ", project);

    return project
};
