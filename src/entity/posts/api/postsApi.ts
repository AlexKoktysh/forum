import { baseInstance } from "../../../shared";
import type { TPost } from "../model";

const BASE_URL = "/posts";

export const postsApi = baseInstance.enhanceEndpoints({ addTagTypes: ["posts"] }).injectEndpoints({
    endpoints: (build) => ({
        getAllPosts: build.query<TPost[], { userId: number } | null>({
            query: (query) => ({
                url: `${BASE_URL}${query?.userId ? `?userId=${query.userId}` : ""}`,
            }),
            providesTags: ["posts"],
        }),
        deletePost: build.mutation<null, { postId: number }>({
            query: ({ postId }) => ({
                url: `${BASE_URL}/${postId}`,
                method: "DELETE",
            }),
        }),
    }),
});
