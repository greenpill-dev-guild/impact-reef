'use server';
import { Client, cacheExchange, fetchExchange } from '@urql/core';
import { graphql } from 'gql.tada';
import {EAS_SCHEMA_IDS} from "@/constants";
import {Hex, decodeAbiParameters, parseAbiParameters} from "viem";


const client = new Client({
    url: 'https://optimism.easscan.org/graphql',
    exchanges: [cacheExchange, fetchExchange],
});

export const getProjectsOwners = async () => {
    "use server";

    const QUERY = graphql(/* GraphQL */`
        query Attestations($where: AttestationWhereInput) {
            attestations(where: $where) {
                data
                decodedDataJson
            }
        }
    `);

    const {data, error} = await client.query(QUERY, {
        where: {
            schemaId: { equals: EAS_SCHEMA_IDS["10"].PROJECT_OWNERS.uid},
        }
    }).toPromise();

    if (error) {
        console.error(error);
        return;
    }

    if (!data) {
        console.error("No data found");
        return;
    }

    // TODO - bit of a hack to cast as bigint, should be enforced by the schema tho
    return data.attestations.map((ownerAttestation) => decodeAbiParameters(
        parseAbiParameters(EAS_SCHEMA_IDS["10"].PROJECT_OWNERS.schema),
        ownerAttestation.data as Hex
    )).flatMap((decodedData) => decodedData) as bigint[];
}

export const getProjectMetadata = async (projectId?: string | null) => {
    "use server";

    if (!projectId) {
        console.error("No project ID provided");
        return;
    }

    const QUERY = graphql(/* GraphQL */`
        query Attestations($where: AttestationWhereInput) {
            attestations(where: $where) {
                data
                decodedDataJson
            }
        }
    `);

    return await client.query(QUERY, {
        where: {
            schemaId: { equals: EAS_SCHEMA_IDS["10"].PROJECT_METADATA.uid},
            decodedDataJson: { contains: projectId }
        }
    }).toPromise();
}
