import Calendar from './blocks/Calendar'
import Sidebar from './blocks/Sidebar'
import SidebarModal from './blocks/Modal'
import styled from 'styled-components'

const Main = () => {
  return (
    <div id='main' className='col-span-4 mx-5'>
      {/* <SidebarModal /> */}
      <Calendar />
    </div>
  )
}

const Home = () => {
  return (
    <div className='grid grid-cols-5'>
      <Sidebar />
      <Main />
    </div>
  )
}

export default Home
