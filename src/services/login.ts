import PB from '../pb/pb'
import { Session } from '../session/session'

export const loginService = async (login: { username: string; password: string }) => {
  const authData = await PB.collection('users').authWithPassword(login.username, login.password)
  return {
    token: authData.token,
  } as Session
}
