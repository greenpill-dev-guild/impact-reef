import {defineConfig} from 'orval';

export default defineConfig({
    "op-agora": {
        input: 'https://vote.optimism.io/api/v1/spec',
        output: {
            mode: 'split',
            target: './src/__generated__/api/agora.ts',
            client: 'fetch',
            baseUrl: 'https://vote.optimism.io/api/v1',
            mock: true,
            override: {
                mutator: {
                    path: './src/utils/custom-fetch.ts',
                    name: 'customFetch',
                },
            },
        },
        hooks: {
            afterAllFilesWrite: 'prettier --write',
        },
    },
});