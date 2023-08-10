import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { SessionProvider } from './routes/security/session/auth.ts'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { ConfirmAlertProvider } from './components/modals/ConfirmAlert.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfirmAlertProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </ConfirmAlertProvider>
    <Toaster toastOptions={{ className: 'min-w-[200px]' }} position='top-right' />
  </React.StrictMode>,
)
