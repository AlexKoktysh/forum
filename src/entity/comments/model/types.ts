export type TComment = {
    id: number;
    postId: number;
    userId: number;
    text: string;
    createdAt: string;
};

export type TCommentsState = {
    data: { [postId: number]: TComment[] };
};
