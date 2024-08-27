import { Client, cacheExchange, fetchExchange } from "@urql/core";

// TODO add getClient function based on chainID

export const easSepoliaClient = new Client({
  url: "https://sepolia.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export const easOptimismClient = new Client({
  url: "https://optimism.easscan.org/graphql",
  exchanges: [cacheExchange, fetchExchange],
});
