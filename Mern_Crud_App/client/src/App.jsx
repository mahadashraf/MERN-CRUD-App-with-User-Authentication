import './App.css'
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Signup from './Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
function App() {
  

  return (
   <div>
  <BrowserRouter>
  <Routes>
    <Route path='/home' element={<Users />}></Route>
    <Route path='/create' element={<CreateUser />}></Route>
    <Route path='/update/:id' element={<UpdateUser />}></Route>
    <Route path='/signup' element={<Signup />}></Route>
    <Route path='/' element={<Login />}></Route>

  </Routes>
  
  </BrowserRouter>    
   </div>
  )
}

export default App
