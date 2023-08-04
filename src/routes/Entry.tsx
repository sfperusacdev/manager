import { Route, Routes } from 'react-router-dom'
import { IfSignedRedirect } from './security/IfSignedRedirect'
import { IfUnsignedRedirect } from './security/IfUnsignedRedirect'
import { PrivateRoutes } from './private/Routes'
import { LoginPage } from './security/LoginPage'
export const Entry = () => {
  return (
    <Routes>
      <Route path='/login' element={<IfSignedRedirect to='/home' node={<LoginPage />} />} />
      <Route path='*' element={<IfUnsignedRedirect to='/login' node={<PrivateRoutes />} />} />
    </Routes>
  )
}
