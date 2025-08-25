export type TComment = {
    id: number;
    postId: number;
    userName: string;
    text: string;
    createdAt: string;
};

export type TCommentsState = {
    data: { [postId: number]: TComment[] };
};
