import { BacklogStatus, BacklogType } from "../data/types.ts";

export type BacklogItemProps = {
    status: BacklogStatus;
    type: BacklogType;
    title: string;
    image: string;
    rating: number;
    addedTime: string;
    id: string;
}

export const BacklogItem = ({
                                status,
                                title,
                                image,
                                rating,
                                type,
                                addedTime,
                                id
                            }: BacklogItemProps) => {
    return (
        <div key={id}>
            <img src={image} alt={title}/>
            <h1> {title}</h1>
            <h2> Rating: {rating}</h2>
            <span>{status}</span>
            <span>{type}</span>
            <span>{addedTime}</span>
        </div>
    )
}