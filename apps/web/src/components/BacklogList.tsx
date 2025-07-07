import { BacklogItem } from "./BacklogItem.tsx";
import type { BacklogListActions, BacklogListState } from "./use-backlog-list.ts";


type BacklogListProps = {
    state: BacklogListState,
    actions: BacklogListActions
}

export const BacklogList = ({ state, actions }: BacklogListProps) => {
    console.log(state)
    const { items, hasMore, isLoading, isError } = state;
    const { loadMoreBacklog } = actions;
    if (!items || items.length == 0) {
        return (
            <div>
                {isError && <h1> There was an error when loading the backlog... please refresh.</h1>}
                <p>No backlog items to display.</p>
            </div>
        )
    }

    return (
        <div>
            {hasMore && (
                <button onClick={() => loadMoreBacklog()} disabled={isLoading}>
                    {isLoading ? 'Loading…' : 'Load more'}
                </button>
            )}
            {items.map((item) => (
                <BacklogItem {...item}/>
            ))}
        </div>
    )
}