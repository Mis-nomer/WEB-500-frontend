import Heatmap from './HomeSidebarHeatmap'
import Sidebar from './HomeSidebar'
import SidebarModal from './HomeModal'
import Collapsible from 'react-collapsible'
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
      <div className='mt-10 w-3/4 mx-auto'>
        <h1 className='mx-10 px-2 py-5 text-2xl font-bold'>All Habits</h1>
        {listHabit &&
          listHabit.map(habit => (
            <div key={habit._id} className='border-b transition-colors mx-10 px-2 py-2 hover:bg-neutral-200 cursor-pointer [&>*]:cursor-event-none'>
              <Collapsible
                trigger={
                  <div>
                    <div className='flex justify-between'>
                      <p className='text-base font-semibold tracking-wide capitalize'>{habit.title}</p>
                      <p className='px-2 py-1'>
                        <i className='fa-solid fa-caret-down'></i>
                      </p>
                    </div>
                    <p className='flex gap-1.5'>
                      {habit.labels &&
                        habit.labels.map(label => (
                          <span className='opacity-70 lowercase text-xs bg-neutral-50 px-1.5 py-1 text-neutral-500'>{label}</span>
                        ))}
                    </p>
                  </div>
                }
                transitionTime={150}
                easing={'ease-in'}
              >
                <ul className='w-1/2 mx-6'>
                  <li className='mt-2'>
                    <p className='text-xs py-5 px-1'>{'' + habit.description}</p>
                  </li>
                  <li className='mt-2 text-sm'>
                    <p>
                      {!!habit.repeat.length && 'Start on:'}
                      {habit.repeat.map(wd => (
                        <span className={`mx-1 px-2.5 py-1 bg-neutral-50 ${wd == moment().format('ddd') && 'bg-yellow-200'}`}>{wd}</span>
                      ))}
                    </p>
                  </li>
                </ul>
              </Collapsible>
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
