import { Client, cacheExchange, fetchExchange } from "@urql/core";

export const easOptimismClient = new Client({
  url: "https://optimism.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: "cache-and-network",
});

export const osoClient = new Client({
  url: "https://www.opensource.observer/api/v1/graphql",
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: "cache-and-network",
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.OPEN_SOURCE_OBSERVER_API_KEY}`,
    },
  },
});
