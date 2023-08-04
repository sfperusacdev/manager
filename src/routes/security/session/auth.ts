import { QueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import React, { FC, PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react'
const LOCA_STORAGE_KEY = '_auth.session'
export interface Session {
  token: string
  date: string
}

const sessionContext = createContext({
  signed: false,
  signedAt: ((): string | undefined => '2006-01-02')(), //default golang format date
  closeSession: () => {},
  openSession: (session: Session) => console.log(session),
})

const queryClient = new QueryClient({
  defaultOptions: { queries: { keepPreviousData: true, refetchOnWindowFocus: false } },
})

export const getStoredToken = () => {
  const stored = localStorage.getItem(LOCA_STORAGE_KEY)
  if (stored) {
    return { logged: true, session: JSON.parse(stored) as Session }
  }
  return { logged: false }
}

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState(getStoredToken)
  const openSession = useCallback((payload: Session) => {
    localStorage.setItem(LOCA_STORAGE_KEY, JSON.stringify(payload))
    setSession({ logged: true, session: payload })
  }, [])
  const closeSession = useCallback(() => {
    localStorage.removeItem(LOCA_STORAGE_KEY)
    setSession({ logged: false })
    queryClient.clear()
  }, [])

  return React.createElement(
    sessionContext.Provider,
    { value: { signed: session.logged, signedAt: session.session?.date, closeSession, openSession } },
    children,
  )
}
export const useLogged = () => {
  const session = React.useContext(sessionContext)
  useEffect(() => {
    if (session.signed && session.signedAt !== format(new Date(), 'yyyy-MM-dd')) {
      session.closeSession()
    }
  }, [])
  return {
    isSigned: session.signed,
    signedAt: session.signedAt,
    openSession: session.openSession,
    closeSession: session.closeSession,
  }
}
