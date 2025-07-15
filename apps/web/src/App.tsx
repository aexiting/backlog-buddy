
import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from '@aws-amplify/ui-react-core';
import { useBacklogList } from "./components/use-backlog-list.ts";
import { BacklogList } from "./components/BacklogList.tsx";
import { BacklogInputForm } from "./components/BacklogInputForm.tsx";
import { useBacklogInput } from "./components/use-backlog-input.ts";


type AppProps = {
    signOut?: UseAuthenticator["signOut"];
    user?: AuthUser;
};

const App = withAuthenticator(({ signOut, user }: AppProps) => {
    if (!signOut || !user) return <div>An auth error occurred. Please refresh.</div>

    const [listState, listActions] = useBacklogList();

    const [inputState, inputActions] = useBacklogInput({addToBacklogList: listActions.loadMoreBacklog, username: user.username, activeItem: listState.activeItem, clearActiveItem: () => listActions.setActiveItem(undefined)});
    return (
        <div>
            <BacklogInputForm state={inputState} actions={inputActions}/>
            <Heading level={1}>Hello {user.username}</Heading>
            <Button onClick={signOut}>Sign out</Button>
            <h2>{user.username}'s Backlog Buddy</h2>
            <BacklogList state={listState} actions={listActions}/>
        </div>)
});

export default App;