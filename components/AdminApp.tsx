"use client"; // remove this line if you choose Pages Router
import {Admin, Resource, ListGuesser} from "react-admin";
import {supabaseDataProvider} from 'ra-supabase';
import {supabase as supabaseClient} from '@/libs/supabase';
import {supabaseAnonKey, supabaseUrl} from "@/utils/constants";
import {EditTerm} from "@/components/Term/EditTerm";
import {EditCategory} from "@/components/Category/EditCategory";
import {EditImpactMetric} from "@/components/ImpactMetric/EditImpactMetric";
import {EditKeyword} from "@/components/Keyword/EditKeyword";

export const supabaseProvider = supabaseDataProvider({
    instanceUrl: supabaseUrl,
    apiKey: supabaseAnonKey,
    supabaseClient
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