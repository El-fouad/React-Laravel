import { BrowserRouter } from "react-router-dom"
import Navbar from "./Components/Navbar"
import MyRoutes from './Routes/MyRoutes.jsx'

function App() {

  return (
      <>
    <BrowserRouter>
      <Navbar/>
      <MyRoutes/>
    </BrowserRouter>
    </>
  )
}

export default App
