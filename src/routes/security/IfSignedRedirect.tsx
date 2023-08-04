import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useLogged } from './session/auth'
type props = { node: React.ReactNode | null; to: string }
export const IfSignedRedirect: FC<props> = ({ node, to }) => {
  const { isSigned } = useLogged()
  if (isSigned) return <Navigate to={to} replace />
  return <>{node}</>
}
