import { Client, cacheExchange, fetchExchange } from "@urql/core";

export const easOptimismClient = new Client({
  url: "https://optimism.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export const easOptimismSepoliaClient = new Client({
  url: "https://optimism-sepolia.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});
