import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { FC, PropsWithChildren, createContext, useCallback, useState } from 'react'
import { Session, getStoredSession, removeSession, storeSession } from '../../../session/session'

const sessionContext = createContext({
  signed: false,
  signedAt: ((): string | undefined => '2006-01-02')(), //default golang format date
  closeSession: () => {},
  openSession: (session: Session) => console.log(session),
})

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: { queries: { keepPreviousData: true, refetchOnWindowFocus: false } },
    }),
  )
  const [session, setSession] = useState(getStoredSession)
  const openSession = useCallback((payload: Session) => {
    storeSession(payload)
    setSession({ logged: true, session: payload })
  }, [])
  const closeSession = useCallback(() => {
    removeSession()
    setSession({ logged: false })
    queryClient.clear()
  }, [])
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(
      sessionContext.Provider,
      { value: { signed: session.logged, signedAt: session.session?.date, closeSession, openSession } },
      children,
    ),
    React.createElement(ReactQueryDevtools, { initialIsOpen: false, position: 'bottom-right' }),
  )
}
export const useLogged = () => {
  const session = React.useContext(sessionContext)
  return {
    isSigned: session.signed,
    signedAt: session.signedAt,
    openSession: session.openSession,
    closeSession: session.closeSession,
  }
}
