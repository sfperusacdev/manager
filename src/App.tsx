import { BrowserRouter } from 'react-router-dom'
import { Entry } from './routes/Entry'

export const App = () => {
  return (
    <BrowserRouter>
      <Entry />
    </BrowserRouter>
  )
}
