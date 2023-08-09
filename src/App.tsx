import { BrowserRouter } from 'react-router-dom'
import { Entry } from './routes/Entry'
import Div100vh from 'react-div-100vh'

export const App = () => {
  return (
    <Div100vh >
      <BrowserRouter>
        <Entry />
      </BrowserRouter>
    </Div100vh>
  )
}
