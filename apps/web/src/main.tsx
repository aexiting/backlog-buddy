import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import awsconfig from './graphql/amplifyconfiguration.json';
import { Amplify } from "aws-amplify";
import { ThemeProvider } from "@aws-amplify/ui-react";

// Uncomment this out if you want to test using local graphql instance
Amplify.configure({
    ...awsconfig,
    aws_appsync_graphqlEndpoint: 'http://localhost:20002/graphql',
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: awsconfig.aws_appsync_apiKey,  // same key shown by `amplify mock api`
});

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <App/>
    </ThemeProvider>,
)
