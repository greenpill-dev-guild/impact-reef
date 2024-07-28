import { Client, cacheExchange, fetchExchange } from "@urql/core";

// TODO add getClient function based on chainID

export const easSepoliaScan = new Client({
  url: "https://sepolia.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export const easOptimismClient = new Client({
  url: "https://optimism.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export const easOptimismSepoliaClient = new Client({
  url: "https://optimism-sepolia.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});
