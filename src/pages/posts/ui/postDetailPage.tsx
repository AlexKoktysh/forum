import { useParams } from "react-router-dom";

export const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Пост #{id}</h1>
            <p>Здесь будет отображаться содержимое поста с ID: {id}</p>
        </div>
    );
};
