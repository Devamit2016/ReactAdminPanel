import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TokenProvider } from './contexts/ContextProvider.tsx'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <TokenProvider>
            <App />
        </TokenProvider>
    </React.StrictMode>,
)
