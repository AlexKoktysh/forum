import type { FC } from "react";
import { PostsList } from "../../../widgets";

export const FavoritePage: FC = () => {
    return <PostsList isFavorite={true} />;
};
