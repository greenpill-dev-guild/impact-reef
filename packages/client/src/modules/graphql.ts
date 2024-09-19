import { initGraphQLTada } from "gql.tada";
import { Client, cacheExchange, fetchExchange } from "@urql/core";

import type { introspection as OSOIntrospection } from "@/types/oso-env";
import type { introspection as EASIntrospection } from "@/types/eas-env";

export const osoGraphQL = initGraphQLTada<{
  introspection: OSOIntrospection;
}>();

export const easGraphQL = initGraphQLTada<{
  introspection: EASIntrospection;
}>();

export const easSepoliaClient = new Client({
  url: "https://sepolia.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export const easOptimismClient = new Client({
  url: "https://optimism.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export const osoClient = new Client({
  url: "https://www.opensource.observer/api/v1/graphql",
  exchanges: [cacheExchange, fetchExchange],
});
