import { type BacklogItem, listBacklogItems } from '../graphql';
import { generateClient } from "aws-amplify/api";
import { useCallback, useEffect, useRef, useState } from "react";



export type BacklogListState = {
    isLoading: boolean;
    isError: boolean;
    items: BacklogItem[];
    hasMore: boolean;
}

export type BacklogListActions = {
    loadMoreBacklog: () => void;
}

const initialState: BacklogListState = {
    isLoading: false,
    isError: false,
    items: [],
    hasMore: true
}

const PAGE_LIMIT = 10;
export const useBacklogList = (): [BacklogListState, BacklogListActions] => {
    // on mount get the backlog list for user done
    // maybe use some pagination. done
    // then display them for the user in a list done
    // later on we can add buttons to update the state for backlog items working...
    const client = generateClient();

    const [state, setState] = useState(initialState);
    const nextTokenRef = useRef<string | undefined>(undefined);

    const loadMoreBacklog = async () => {
        if (state.isLoading || !nextTokenRef.current) return;
        await fetchBacklog()
    }

    const fetchBacklog = useCallback( async () =>  {
        setState(prevState => ({ ...prevState, isError: false, isLoading: true }))
        try {
            const token = nextTokenRef.current
            const { data } = await client.graphql({
                query: listBacklogItems,
                variables: { limit: PAGE_LIMIT, nextToken: token },
                authMode: "userPool"
            })
            const backlogData = data.listBacklogItems
            setState(prevState => ({ ...prevState, hasMore: backlogData.nextToken != null, items: [...prevState.items, ...backlogData.items] }))
            nextTokenRef.current = backlogData.nextToken || undefined

        } catch (err) {
            setState(prevState => ({ ...prevState, isError: true }))
            console.log(`error fetching backlog ${err}`)
        } finally {
            setState(prevState => ({ ...prevState, isLoading: false }))
        }
    }, [])

    useEffect(() => {
        if (state.items.length > 0) return
        console.log('fetching')
        fetchBacklog()
    }, [fetchBacklog]);


    return [state, { loadMoreBacklog }]
}