import Heatmap from './HomeSidebarHeatmap'
import Sidebar from './HomeSidebar'
import SidebarModal from './HomeModal'
import { useState, useEffect } from 'react'
import Habit from '../../controllers/item.controller'
interface IHabit {
  _id: Number
  email: String
  title: String
  description: String
  startDate: Date
  repeat: String[]
  streak: Date[]
  options: {
    reminder: Boolean
  }
  completed: Boolean
}

const Main = ({ modalState, setModalState }: { modalState: Boolean; setModalState: (state: Boolean) => void }) => {
  return (
    <div id='main' className='col-span-4 relative'>
      <Heatmap />
      {modalState && <SidebarModal modalState={modalState} setModalState={setModalState} />}
    </div>
  )
}

const Home = () => {
  const [listHabit, setListHabit] = useState<IHabit[]>([])
  const [modalState, setModalState] = useState<Boolean>(false)
  const config = { params: { email: 'Judson.Kirlin@gmail.com' } }

  useEffect(() => {
    Habit.read(config)
      .then(res => res.data)
      .then(res => setListHabit(res.data))
  }, [])

  return (
    <div className='grid lg:grid-cols-5 grid-cols-1'>
      <Sidebar setModalState={setModalState} modalState={modalState} listHabit={listHabit} setListHabit={setListHabit} />
      <Main modalState={modalState} setModalState={setModalState} />
    </div>
  )
}

export default Home
