import { Route, Routes, Navigate } from 'react-router-dom'
// import { HomePage } from '../../pages/HomePage'
import { PreferenciasHome } from '../../pages/preferencias/PreferenciasHome'

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path='/home' element={<PreferenciasHome />} />
      <Route path='*' element={<Navigate to='/home' replace />} />
    </Routes>
  )
}
