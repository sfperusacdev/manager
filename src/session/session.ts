import { format } from 'date-fns'
import memoizeOne from 'memoize-one'

const LOCA_STORAGE_KEY = '_auth.session'
export interface Session {
  token: string
  date: string
}

export const getStoredSession = () => {
  const stored = localStorage.getItem(LOCA_STORAGE_KEY)
  if (stored) {
    const session = JSON.parse(stored) as Session
    if (session.date != null && session.date !== format(new Date(), 'yyyy-MM-dd')) {
      removeSession()
      return { logged: false }
    }
    return { logged: true, session }
  }
  return { logged: false }
}
const getMemorizedSession = memoizeOne(getStoredSession)

export const sessionToken = () => {
  const session = getMemorizedSession()
  return session.session?.token ?? ''
}

export const storeSession = (payload: Session) => {
  localStorage.setItem(LOCA_STORAGE_KEY, JSON.stringify(payload))
  getMemorizedSession.clear()
}
export const removeSession = () => {
  localStorage.removeItem(LOCA_STORAGE_KEY)
  getMemorizedSession.clear()
}
