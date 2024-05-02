"use client"; // remove this line if you choose Pages Router

import { supabaseDataProvider } from "ra-supabase";
import { Admin, Resource, ListGuesser } from "react-admin";

import { supabaseAnonKey, supabaseUrl } from "@/constants";

import { supabase as supabaseClient } from "@/modules/supabase";

import { EditTerm } from "@/components/Term/EditTerm";
import { EditKeyword } from "@/components/Keyword/EditKeyword";
import { EditCategory } from "@/components/Category/EditCategory";
import { EditImpactMetric } from "@/components/ImpactMetric/EditImpactMetric";

export const supabaseProvider = supabaseDataProvider({
  instanceUrl: supabaseUrl,
  apiKey: supabaseAnonKey,
  supabaseClient,
});

const AdminApp = () => (
  <Admin dataProvider={supabaseProvider}>
    <Resource
      name="impact_metrics"
      list={ListGuesser}
      edit={EditImpactMetric}
      recordRepresentation="name"
    />
    <Resource
      name="categories"
      list={ListGuesser}
      edit={EditCategory}
      recordRepresentation="name"
    />
    <Resource
      name="terms"
      list={ListGuesser}
      edit={EditTerm}
      recordRepresentation="name"
    />
    <Resource
      name="keywords"
      list={ListGuesser}
      edit={EditKeyword}
      recordRepresentation="name"
    />
  </Admin>
);

export default AdminApp;
