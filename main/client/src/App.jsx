import {io} from "socket.io-client"
import {BrowserRouter,Route,Routes} from "react-router-dom"
const server=io("http://localhost:8080")
import Home from "../src/pages/Home"
import Chats from "../src/pages/Chats"
import Login from "../src/pages/Login"
import Profile from "../src/pages/Profile"
import Signup from "../src/pages/Signup"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import { AppContextProvier } from "./context/AppContext"
import ProtectedRoute from "./Components/ProtectedRoute"

function App() {


  return (
    <>
    <AppContextProvier>
     <BrowserRouter>
     <Navbar/>
     
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Profile" element={ <ProtectedRoute><Profile/></ProtectedRoute>  }/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Profile/Chats" element={<ProtectedRoute> <Chats/></ProtectedRoute> }/>
     </Routes>
     <Footer/>
     </BrowserRouter>
     </AppContextProvier>
    </>
  )
}

export default App


// we willuse command of socket io to connect with server setImmediate,first we will do-
// npm i socket.io-client  this is for client 