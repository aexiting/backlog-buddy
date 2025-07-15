import {
    type BacklogItem,
    listBacklogItems,
    type ListBacklogItemsQuery,
    onCreateBacklogItem,
    onDeleteBacklogItem, onUpdateBacklogItem
} from '../graphql';
import { generateClient, type GraphQLQuery } from "aws-amplify/api";
import { useCallback, useEffect, useRef, useState } from "react";


export type BacklogListState = {
    isLoading: boolean;
    isError: boolean;
    items: BacklogItem[];
    hasMore: boolean;
    activeItem?: BacklogItem;
}

export type BacklogListActions = {
    loadMoreBacklog: () => void;
    setActiveItem: (item?: BacklogItem) => void;
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

    const fetchBacklog = useCallback(async () => {
        setState(prevState => ({ ...prevState, isError: false, isLoading: true }))
        try {
            const token = nextTokenRef.current
            const { data } = await client.graphql<
                GraphQLQuery<ListBacklogItemsQuery>
            >({
                query: listBacklogItems,
                variables: { limit: PAGE_LIMIT, nextToken: token },
                authMode: "userPool"
            })
            const backlogData = data.listBacklogItems

            if (!backlogData) {
                console.log("No backlog data available.")
                return
            }

            setState(prevState => ({
                ...prevState,
                hasMore: !!backlogData.nextToken,
                items: [...prevState.items, ...backlogData.items.filter(item => item !== null)]
            }))
            nextTokenRef.current = backlogData.nextToken ?? undefined

        } catch (err) {
            setState(prevState => ({ ...prevState, isError: true }))
            console.log(`error fetching backlog ${err}`)
        } finally {
            setState(prevState => ({ ...prevState, isLoading: false }))
        }
    }, [])

    useEffect(() => {
        if (state.items.length > 0) return
        fetchBacklog()
    }, [fetchBacklog]);

    useEffect(() => {
        const createSub = client.graphql({
            query: onCreateBacklogItem,
            authMode: 'userPool',
        }).subscribe({
            next: ({ data }) => setState(prevState => ({
                ...prevState,
                items: [...prevState.items, data.onCreateBacklogItem]
            }))
            ,
        });
        const updateSub = client.graphql({
            query: onUpdateBacklogItem,
            authMode: 'userPool',
        }).subscribe({
            next: ({ data }) => setState(prevState => ({
                ...prevState,
                items: prevState.items.map(item => item.id === data.onUpdateBacklogItem.id ? data.onUpdateBacklogItem : item )
            }))
            ,
        });
        const deleteSub = client.graphql({
            query: onDeleteBacklogItem,
            authMode: 'userPool',
        }).subscribe({
            next: ({ data }) => setState(prevState => ({
                ...prevState,
                items: prevState.items.filter(item => item.id !== data.onDeleteBacklogItem.id)
            }))
            ,
        });
        return () => {
            createSub.unsubscribe();
            updateSub.unsubscribe();
            deleteSub.unsubscribe();
        }
    }, []);

    return [state, {
        loadMoreBacklog,
        setActiveItem: (item?: BacklogItem) => setState(prevState => ({ ...prevState, activeItem: item }))
    }]
}