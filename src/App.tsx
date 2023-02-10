import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Admin from './components/admin/Dashboard'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import { PrivateRoute } from './components/auth/Private'

function App() {
  const token = localStorage.getItem('token')

  return (
    <>
      <Routes>
        <Route
          path='/home'
          element={
            <PrivateRoute token={token}>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
