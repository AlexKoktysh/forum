import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const instance = {
    baseUrl: "https://jsonplaceholder.typicode.com",
};

const baseQuery = fetchBaseQuery(instance);

export const baseInstance = createApi({
    reducerPath: "api",
    baseQuery,
    endpoints: () => ({}),
    tagTypes: [],
});
