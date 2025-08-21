import { baseInstance } from "../../../shared";
import type { TPost } from "../model";

export const postsApi = baseInstance.enhanceEndpoints({ addTagTypes: ["posts"] }).injectEndpoints({
    endpoints: (build) => ({
        getAllPosts: build.query<TPost[], { userId: number } | null>({
            query: (query) => ({
                url: `/posts${query?.userId ? `?userId=${query.userId}` : ""}`,
            }),
            providesTags: ["posts"],
        }),
    }),
});
