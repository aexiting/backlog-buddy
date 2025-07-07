
import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from '@aws-amplify/ui-react-core';
import { useBacklogList } from "./components/use-backlog-list.ts";
import { BacklogList } from "./components/BacklogList.tsx";


type AppProps = {
    signOut?: UseAuthenticator["signOut"]; //() => void;
    user?: AuthUser;
};

const App = withAuthenticator(({ signOut, user }: AppProps) => {
    const [ state, actions ] = useBacklogList();

    if (!signOut || !user) return <div>An auth error occurred. Please refresh.</div>
    return (
        <div>
            <Heading level={1}>Hello {user.username}</Heading>
            <Button onClick={signOut}>Sign out</Button>
            <h2>{user.username}'s Backlog Buddy</h2>
            <BacklogList state={state} actions={actions}/>
        </div>)
});

export default App;