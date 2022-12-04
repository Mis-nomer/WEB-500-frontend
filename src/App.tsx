import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Admin from './components/admin/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route key='home' path='/' element={<Home />}></Route>
        <Route key='admin' path='/admin' element={<Admin />}></Route>
      </Routes>
    </>
  )
}

export default App
