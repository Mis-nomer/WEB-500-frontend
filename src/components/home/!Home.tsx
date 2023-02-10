import Sidebar from './HomeSidebar'
import SidebarModal from './HomeModal'
import Collapsible from 'react-collapsible'
import { useState, useEffect } from 'react'
import Calendar from '../Calendar'
import Habit from '../../controllers/controller'
import toast, { Toaster } from 'react-hot-toast'
import { IHabit } from '../../api/interface'
import moment from 'moment'

const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }

const Main = ({
  modalState,
  setModalState,
  listHabit,
  setHabitState,
}: {
  modalState: Boolean
  setModalState: (state: Boolean) => void
  listHabit: IHabit[]
  setHabitState: (state: string) => void
}) => {
  //* useReducer would probably a better solution than passing in all that
  const handleDelete = (id: number) => {
    if (!reaffirm || reaffirm.id != id) {
      return setReaffirm({ id })
    } else {
      Habit.delete('/data/habit/' + id, config)
      setHabitState('delete')
      setReaffirm(null)
    }
  }

  const [reaffirm, setReaffirm] = useState<null | { id: number }>(null)

  return (
    <section id='main' className='col-span-4 grid grid-cols-1 md:grid-cols-5 gap-5 relative'>
      <div className='col-span-3'>
        {modalState && <SidebarModal modalState={modalState} setModalState={setModalState} setHabitState={setHabitState} />}
        <hr />
        <div className='mt-10'>
          <h1 className='mx-10 px-2 py-5 text-2xl font-bold'>All Habits</h1>
          {listHabit &&
            listHabit.map(habit => (
              <div key={habit._id} className='border-b transition-colors mx-10 px-2 py-2 hover:bg-neutral-100 cursor-pointer [&>*]:cursor-event-none'>
                <Collapsible
                  trigger={
                    <div>
                      <div className='flex justify-between'>
                        <p className='text-base font-semibold tracking-wide capitalize'>{habit.title}</p>
                        <p className='px-2 py-1'>
                          <i className='fa-solid fa-ellipsis-vertical'></i>
                        </p>
                      </div>
                      <p className='flex gap-1.5'>
                        {habit.labels &&
                          habit.labels.map(label => (
                            <span key={label} className='lowercase text-xs bg-neutral-100 px-1.5 py-1 text-neutral-500'>
                              {label}
                            </span>
                          ))}
                      </p>
                    </div>
                  }
                  transitionTime={150}
                  easing={'ease-in'}
                >
                  <div>
                    <ul className='mx-2'>
                      <li className='mt-2'>
                        <p className='text-sm py-5'>{'' + habit.description}</p>
                      </li>
                      <li className='my-2 text-sm flex items-center justify-between'>
                        <div className='flex items-center'>
                          {habit.repeat &&
                            habit.repeat.map(wd => (
                              <p key={wd} className={`mx-1 px-2.5 py-1 bg-white ${wd == moment().format('ddd') && 'bg-yellow-300'}`}>
                                {wd}
                              </p>
                            ))}
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              handleDelete(habit._id as number)
                            }}
                            className={`text-white ${
                              reaffirm && reaffirm.id == habit._id ? 'bg-red-600 hover:bg-red-700' : 'bg-red-400 hover:bg-red-500'
                            }  px-3 py-1.5 rounded-md font-medium`}
                          >
                            {reaffirm && reaffirm.id == habit._id ? 'Are you sure?' : 'Delete Habit'}
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Collapsible>
              </div>
            ))}
        </div>
      </div>
      <div className='col-span-2 w-3/4 mx-auto mt-10'>
        <h1 className='py-5 text-2xl font-bold'>Streak Heatmap</h1>
      </div>
    </section>
  )
}

const Home = () => {
  const [listHabit, setListHabit] = useState<IHabit[]>([])
  const [todayHabit, setTodayHabit] = useState<IHabit[]>([])
  const [modalState, setModalState] = useState<Boolean>(false)
  const [habitState, setHabitState] = useState<string>('')

  useEffect(() => {
    if (habitState == 'create') {
      toast('Habit added!')
    }
    if (habitState == 'delete') {
      toast('Habit deleted!')
    }
    if (habitState != '') setHabitState('')

    Habit.read('/data/habit/', config)
      .then(res => res.data)
      .then(res => {
        // render if habit start today, ignore if not
        let todayWeekday = moment().format('ddd')
        let todayList = res.data.filter((h: IHabit) => h.repeat?.includes(todayWeekday) && moment().diff(h.startDate, 'days') >= 0)
        setListHabit(res.data)
        setTodayHabit(todayList)
      })
  }, [habitState])

  return (
    <div className='grid lg:grid-cols-5 grid-cols-1'>
      <Toaster />
      <Sidebar habitState={habitState} setModalState={setModalState} modalState={modalState} todayHabit={todayHabit} setTodayHabit={setTodayHabit} />
      <Main modalState={modalState} setModalState={setModalState} setHabitState={setHabitState} listHabit={listHabit} />
    </div>
  )
}

export default Home
