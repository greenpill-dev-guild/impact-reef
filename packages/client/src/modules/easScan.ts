import {Client, cacheExchange, fetchExchange} from 'urql';

export const easScan = new Client({
    url: 'https://sepolia.easscan.org/graphql',
    exchanges: [cacheExchange, fetchExchange],
});
