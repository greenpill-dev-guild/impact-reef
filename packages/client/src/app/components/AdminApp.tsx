"use client"; // remove this line if you choose Pages Router
import {Admin, Resource, ListGuesser, EditGuesser} from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("/api");

const AdminApp = () => (
    <Admin dataProvider={dataProvider}>
        <Resource
            name="metrics"
            list={ListGuesser}
            edit={EditGuesser}
            recordRepresentation="name"
        />
    </Admin>
);

export default AdminApp;