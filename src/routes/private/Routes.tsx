import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path='/home' element={<HomePage />} />
    </Routes>
  )
}
