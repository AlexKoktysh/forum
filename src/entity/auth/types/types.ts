export type TAuthDto = {
    email: string;
    isAdmin: boolean;
};

export type WithId<T> = T & { id: number };
