import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Admin from './components/admin/Dashboard'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'

function App() {
  return (
    <>
      <Routes>
        <Route key='home' path='/' element={<Home />}></Route>
        <Route key='admin' path='/admin' element={<Admin />}></Route>
        <Route key='sign-up' path='/sign-up' element={<SignUp />}></Route>
        <Route key='login' path='/login' element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
