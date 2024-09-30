import { initGraphQLTada } from 'gql.tada';
import type { introspection } from '@/types/oso-env';

export const graphql = initGraphQLTada<{
    introspection: introspection;
}>();