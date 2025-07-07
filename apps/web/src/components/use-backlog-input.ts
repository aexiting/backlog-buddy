import { BacklogStatus } from "../data/types.ts";
import { type BacklogItem, type CreateBacklogItemInput, ItemType } from "../API.ts";
import { generateClient } from "aws-amplify/api";
import { useCallback, useState } from "react";
import { createBacklogItem } from "../graphql";
import type { AuthUser } from "aws-amplify/auth";

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
}

type FormInput = Pick<CreateBacklogItemInput, 'title' | 'rating' | 'type'>;
export type BacklogInputState = {
    isLoading: boolean;
    isError: boolean;
    input: FormInput
}
export type BacklogInputActions = {
    setInput: (form: FormInput) => void;
    submitBacklogItem: () => void;
}

const initialInput = { title: '', rating: 3, type: ItemType.ANIME };
const initialState: BacklogInputState = {
    isLoading: false,
    isError: false,
    input: initialInput
}

export const useBacklogInput = ({ addToBacklogList, username }: UseBacklogInputProps): [BacklogInputState, BacklogInputActions] => {
    // make a function that will take the input and make a new row for backlog stuff.
    // set up state
    // based on state create new backlog function and add it
    // if success use callback to update the frontend as well....
    const client = generateClient();

    const [state, setState] = useState(initialState);


    const submitBacklogItem = useCallback(async () => {
        if (!state.input.title?.trim()) return;

        setState(prevState => ({ ...prevState, isLoading: true, isError: false }))

        const { image, fullTitle } = fetchMediaMeta(state.input.title, state.input.type)
        const backlogItem = {
            image,
            title: fullTitle ?? state.input.title,
            rating: state.input.rating,
            status: "NOT_STARTED",
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

    return [state, {
        setInput: (input: FormInput) => setState(prevState => ({ ...prevState, input: input })),
        submitBacklogItem
    }]

}