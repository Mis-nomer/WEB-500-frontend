import { IHabit } from '../../api/interface'
import Habit from '../../controllers/controller'
import moment from 'moment'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { logError } from '../../api/utils'
import { AxiosError } from 'axios'
const today = moment().format('Y-M-D')

const TopSection = () => {
  const user = JSON.parse(localStorage.getItem('user') as string) ?? {}

  return (
    <>
      <div className='bg-[#ffc857] mb-3 px-2 py-3 rounded-md flex justify-between items-center text-black'>
        <div>
          <img src={user.avatar} alt='' className='object-cover w-[32px] h-[32px] rounded-full inline-block' />
          <span className='px-2 font-semibold font-sans'>{user.name}</span>
        </div>
        <div className='hover:scale-125 transition-transform cursor-pointer'>
          <i className='fa-solid fa-user-gear'></i>
        </div>
      </div>
      <div>
        <div className='p-2 rounded-md hover:bg-[#177e89] hover:cursor-pointer transition-colors'>
          <i className='fa-regular fa-calendar pointer-events-none'></i>
          <span className='px-3 pointer-events-none'>All Habits</span>
        </div>
        <div className='p-2 rounded-md hover:bg-[#177e89] hover:cursor-pointer transition-colors'>
          <i className='fa-regular fa-bookmark'></i>
          <span className='px-3'>Labels</span>
        </div>
      </div>
    </>
  )
}

const MidSection = ({ todayHabit, handleCheck }: { todayHabit: IHabit[]; handleCheck: (a: any) => void }) => {
  return (
    <div className='my-10 text-sm font-medium'>
      <div className='p-2 rounded-md bg-[#177e89] text-white'>
        <p className='font-bold text-lg'>Today's Habits - {todayHabit.filter(h => !h.streak.includes(today)).length}</p>
        <ul className='text-black mx-1  '>
          {todayHabit &&
            todayHabit.map(habit => (
              <li
                key={String(habit._id)}
                onClick={handleCheck}
                className={`transition-colors p-2 hover:bg-green-400 cursor-pointer flex justify-between items-center my-2 rounded-sm ${
                  habit.streak.includes(today) ? 'opacity-50 bg-green-400' : 'bg-[#ffc857]'
                } 
            `}
              >
                <p className='text-base pointer-events-none select-none truncate pr-1'>{habit.title}</p>

                <label
                  htmlFor={habit._id as unknown as string}
                  className='transition-colors w-[24px] h-[24px] bg-neutral-100 block rounded-md pointer-events-none select-none'
                >
                  {habit.streak.includes(today) && <i className='fa-solid fa-check p-1'></i>}
                </label>
                <input type='checkbox' name={String(habit._id)} id={String(habit._id)} className='hidden pointer-events-none select-none' />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

const BotSection = ({ modalState, setModalState }: { modalState: Boolean; setModalState: any }) => {
  return (
    <div>
      <button
        onClick={() => setModalState(!modalState)}
        className={`block w-full px-2 py-3 rounded-md hover:bg-[#ffc857] font-bold ${
          modalState ? 'bg-red-500' : 'bg-[#177e89]'
        } hover:text-black text-white hover:cursor-pointer transition-colors`}
      >
        {modalState ? 'Cancel' : 'New Habit'}
      </button>
    </div>
  )
}

export default ({
  habitState,
  modalState,
  setModalState,
  todayHabit,
  setTodayHabit,
}: {
  habitState: string
  modalState: Boolean
  setModalState: (state: Boolean) => void
  todayHabit: IHabit[]
  setTodayHabit: (habit: IHabit[]) => void
}) => {
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  useEffect(() => {
    Habit.read('/data/habit/', config)
      .then(res => res.data.data)
      .then(setTodayHabit)
      .catch(logError)
  }, [habitState])

  const handleCheck = function ({ target }: any) {
    const checkbox = target.querySelector('input[type=checkbox]')

    const updated = todayHabit.map(habit => {
      if (checkbox.id == habit._id) {
        if (habit.streak.includes(today)) {
          habit.streak = habit.streak.filter(s => s != today)
          checkbox.checked = false
        } else {
          habit.streak.push(today)
          checkbox.checked = true
          toast('Habit completed!')
        }
      }
      Habit.update('/data/habit/' + habit._id, habit)
      return habit
    })

    setTodayHabit(updated)
  }
  return (
    <div id='sidebar' className='z-50 col-span-1 bg-[#084c61] text-white p-2.5 min-h-screen font-sans'>
      <TopSection />
      <hr className='opacity-50 my-3' />
      <MidSection todayHabit={todayHabit} handleCheck={handleCheck} />
      <hr className='opacity-50 my-3' />
      <BotSection modalState={modalState} setModalState={setModalState} />
    </div>
  )
}
