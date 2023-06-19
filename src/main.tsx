import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { TopicProvider } from './context/TopicContext.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TopicProvider>
      <UserProvider>
        <Toaster />
        <App />
      </UserProvider>
    </TopicProvider>
  </React.StrictMode>,
)
