import {Client, cacheExchange, fetchExchange} from "@urql/core";

// TODO add getClient function based on chainID

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
})
