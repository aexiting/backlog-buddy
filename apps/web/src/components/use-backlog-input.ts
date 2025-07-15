import { type BacklogItem, type CreateBacklogItemInput, ItemStatus, ItemType } from "../API.ts";
import { generateClient } from "aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { createBacklogItem, deleteBacklogItem, updateBacklogItem } from "../graphql";

export interface MediaMeta {
    fullTitle: string;
    image?: string;
}

// This is just a mock function for populating image info for an anime or manga.
export const fetchMediaMeta = (title: string, type: ItemType): MediaMeta => {
    if (title && type)
        return {
            fullTitle: "Lazarus",
            image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx167336-KpGIIBie71OX.png"
        }
    return {
        fullTitle: "",
        image: ""
    }
}

type UseBacklogInputProps = {
    addToBacklogList: (newItem: BacklogItem) => void;
    username: string;
    activeItem: BacklogItem
    clearActiveItem: () => void;
}

type FormInput = Pick<CreateBacklogItemInput, 'title' | 'rating' | 'type' | 'status'>;
export type BacklogInputState = {
    isLoading: boolean;
    isError: boolean;
    input: FormInput;
    isEditMode: boolean;
}
export type BacklogInputActions = {
    setInput: (form: FormInput) => void;
    submitBacklogItem: () => void;
    submitBacklogEdit: () => void;
    submitBacklogDelete: () =>  void;
}

const initialInput = { title: '', rating: 3, type: ItemType.ANIME, status: ItemStatus.NOT_STARTED };
const initialState: BacklogInputState = {
    isLoading: false,
    isError: false,
    input: initialInput,
    isEditMode: false
}

export const useBacklogInput = ({
                                    username,
                                    activeItem,
                                    clearActiveItem
                                }: UseBacklogInputProps): [BacklogInputState, BacklogInputActions] => {
    // make a function that will take the input and make a new row for backlog stuff.
    // set up state
    // based on state create new backlog function and add it
    // if success use callback to update the frontend as well....
    const client = generateClient();

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (!activeItem) {
            return
        }
        console.log(activeItem.title)
        setState(prevState => ({
            ...prevState,
            isEditMode: true,
            input: {
                ...prevState.input,
                rating: activeItem.rating,
                type: activeItem.type,
                status: activeItem.status,
                title: activeItem.title
            }
        }))
    }, [activeItem]);

    const submitBacklogEdit = useCallback(async () => {
        setState(prevState => ({ ...prevState, isLoading: true, isError: false }))
        const backlogItem = {
            id: activeItem.id,
            rating: state.input.rating,
            status: state.input.status,
            type: state.input.type,
        }
        try {
            const response = await client.graphql({
                query: updateBacklogItem,
                variables: {
                    input: backlogItem
                },
                authMode: "userPool"
            })
            console.log(response)

            setState(prevState => ({ ...prevState, input: initialInput, isEditMode: false }));
            clearActiveItem()
        } catch (err) {

            setState(prevState => ({ ...prevState, isError: true }))
            console.log(`error editing backlog item`, err)
        } finally {
            setState(prevState => ({ ...prevState, isLoading: false }))
        }
    }, [state.input])

    const submitBacklogItem = useCallback(async () => {
        if (!state.input.title?.trim()) return;

        setState(prevState => ({ ...prevState, isLoading: true, isError: false }))

        const { image, fullTitle } = fetchMediaMeta(state.input.title, state.input.type)
        const backlogItem = {
            image,
            title: fullTitle ?? state.input.title,
            rating: state.input.rating,
            status: ItemStatus.NOT_STARTED,
            type: state.input.type,
            owner: username // Note to change this to be what
        }
        try {
            const response = await client.graphql({
                query: createBacklogItem,
                variables: {
                    input: backlogItem
                },
                authMode: "userPool"
            })
            console.log(response)
            console.log("do call")

            setState(prevState => ({ ...prevState, input: initialInput }));
        } catch (err) {

            setState(prevState => ({ ...prevState, isError: true }))
            console.log(`error adding to backlog`, err)
        } finally {
            setState(prevState => ({ ...prevState, isLoading: false }))
        }
    }, [state.input])
    const submitBacklogDelete = useCallback(async () => {
        setState(prevState => ({ ...prevState, isLoading: true, isError: false }))
        const backlogItem = {
            id: activeItem.id,
        }
        try {
            const response = await client.graphql({
                query: deleteBacklogItem,
                variables: {
                    input: backlogItem
                },
                authMode: "userPool"
            })
            console.log(response)

            setState(prevState => ({ ...prevState, input: initialInput, isEditMode: false }));
            clearActiveItem()
        } catch (err) {

            setState(prevState => ({ ...prevState, isError: true }))
            console.log(`error editing backlog item`, err)
        } finally {
            setState(prevState => ({ ...prevState, isLoading: false }))
        }
    }, [state.input])

    return [state, {
        setInput: (input: FormInput) => setState(prevState => ({ ...prevState, input: {...prevState, ...input} })),
        submitBacklogItem,
        submitBacklogEdit,
        submitBacklogDelete
    }]

}