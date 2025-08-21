import { baseInstance } from "../../../shared";
import type { TUser } from "../model";

const BASE_URL = "/users";

export const usersApi = baseInstance.enhanceEndpoints({ addTagTypes: ["users"] }).injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<TUser[], null>({
            query: () => ({
                url: `${BASE_URL}`,
            }),
            providesTags: ["users"],
        }),
    }),
});
