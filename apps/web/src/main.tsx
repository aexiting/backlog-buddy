import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import awsconfig from './graphql/amplifyconfiguration.json';
import { Amplify } from "aws-amplify";

Amplify.configure(awsconfig);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
