import { initGraphQLTada } from "gql.tada";

import type { introspection as OSOIntrospection } from "@/types/oso-env";
import type { introspection as EASIntrospection } from "@/types/eas-env";

export const osoGraphQL = initGraphQLTada<{
  introspection: OSOIntrospection;
}>();

export const easGraphQL = initGraphQLTada<{
  introspection: EASIntrospection;
}>();
