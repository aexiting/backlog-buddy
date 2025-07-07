import { ItemStatus, ItemType } from "../graphql";

export type BacklogItemProps = {
    status: ItemStatus;
    type: ItemType;
    title: string;
    image: string;
    rating: number;
    createdAt: string;
    id: string;
}

export const BacklogItem = ({
                                status,
                                title,
                                image,
                                rating,
                                type,
                                createdAt,
                                id
                            }: BacklogItemProps) => {
    return (
        <div key={id}>
            <img src={image} alt={title}/>
            <h1> {title}</h1>
            <h2> Rating: {rating}</h2>
            <span>{status}</span>
            <span>{type}</span>
            <span>{createdAt}</span>
        </div>
    )
}