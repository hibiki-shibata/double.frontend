import { defineConfig } from 'orval';

export default defineConfig({
    api: {
        input: {
            target: '../../../openapi.json', // Path or URL to your OpenAPI spec (JSON or YAML)
        },
        output: {
            // target: './src/api/generated.ts',
            target: '../lib/api/orval/target',
            schemas: '../lib/api/orval/schema',
            client: 'react-query', // Options: 'fetch', 'axios', 'react-query', 'swr', 'vue-query', etc.
            httpClient: 'fetch',   // Options: 'fetch' or 'axios'
            clean: true,
            // mock: {
            //     type: 'msw',
            //     useExample: true
            // },
            // override: {
            //     mutator: {
            //         path: './'
            //     },
            //     query: {
            //         useQuery: true,
            //         options: {
            //             staleTime: 1000 * 60 * 5,
            //             retry: 2,
            //         }
            //     }
            // }
        },
    },
});