import { initGraphQLTada } from 'gql.tada';
import type { introspection } from '@/types/eas-env';

export const graphql = initGraphQLTada<{
    introspection: introspection;
}>();