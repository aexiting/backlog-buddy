import type { BacklogItemProps } from "./BacklogItem.tsx";
import { BacklogItem } from "./BacklogItem.tsx";


type BacklogListProps = {
    items: BacklogItemProps[]
}

export const BacklogList = ({ items }: BacklogListProps) => {

    if (!items || items.length == 0) {
        return (
            <div>
                <p>No backlog items to display.</p>
            </div>
        )
    }

    return (
        <div>
            {items.map((item) => (
                <BacklogItem {...item}/>
            ))}
        </div>
    )
}