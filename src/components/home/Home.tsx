import Heatmap from './HomeSidebarHeatmap'
import Sidebar from './HomeSidebar'
import SidebarModal from './HomeModal'
import { useState, useEffect } from 'react'
import Habit from '../../controllers/controller'
import toast, { Toaster } from 'react-hot-toast'
import { IHabit } from '../../interface/habit'
import moment from 'moment'

const Main = ({
  modalState,
  setModalState,
  listHabit,
  setListHabit,
}: {
  modalState: Boolean
  setModalState: (state: Boolean) => void
  listHabit: IHabit[]
  setListHabit: (habits: IHabit[]) => void
}) => {
  const [isSuccess, setIsSuccess] = useState<Boolean>(false)

  useEffect(() => {
    if (isSuccess) {
      toast('Habit added!')
      setIsSuccess(false)
    }
  }, [isSuccess])

  return (
    <div id='main' className='col-span-4 relative'>
      {/* <Heatmap listHabit={listHabit} setListHabit={setListHabit} /> */}
      {modalState && <SidebarModal modalState={modalState} setIsSuccess={setIsSuccess} setModalState={setModalState} />}
      <hr />
      <div className='mt-10'>
        <h1 className='mx-10 px-2 py-5 text-xl font-bold'>All Habits</h1>
        {listHabit &&
          listHabit.map(habit => (
            <div
              data-expand={false}
              key={habit._id}
              className='transition-colors mx-10 px-2 py-5 hover:bg-neutral-200 cursor-pointer [&>*]:cursor-event-none'
            >
              <p className='font-semibold tracking-wide capitalize'>
                <i className='fa-solid fa-thumbtack px-2 text-[#ffc857]'></i>
                {habit.title}
              </p>
              <p className='text-xs truncate w-1/2 mx-2'>{'' + habit.description}</p>
            </div>
          ))}
      </div>
      <Toaster />
    </div>
  )
}

const Home = () => {
  const [listHabit, setListHabit] = useState<IHabit[]>([])
  const [todayHabit, setTodayHabit] = useState<IHabit[]>([])

  const [modalState, setModalState] = useState<Boolean>(false)
  const config = { params: { email: 'Judson.Kirlin@gmail.com' } }

  useEffect(() => {
    Habit.read('/habit/', config)
      .then(res => res.data)
      .then(res => {
        // render if habit repeat today, ignore if startDate haven't come
        let todayWeekday = moment().format('ddd')
        let todayList = res.data.filter((h: IHabit) => h.repeat?.includes(todayWeekday) && moment().diff(h.startDate, 'days') >= 0)
        setListHabit(res.data)
        setTodayHabit(todayList)
      })
  }, [modalState])

  return (
    <div className='grid lg:grid-cols-5 grid-cols-1'>
      <Sidebar setModalState={setModalState} modalState={modalState} todayHabit={todayHabit} setTodayHabit={setTodayHabit} />
      <Main modalState={modalState} setModalState={setModalState} listHabit={listHabit} setListHabit={setListHabit} />
    </div>
  )
}

export default Home
