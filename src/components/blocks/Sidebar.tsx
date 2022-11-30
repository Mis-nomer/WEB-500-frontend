import React, { useEffect, useState } from 'react'
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

const TopSection = () => (
  <>
    <div className='bg-[#ffc857] mb-3 px-2 py-3 rounded-md flex justify-between items-center text-black'>
      <div>
        <img
          alt=''
          className='object-cover w-[32px] h-[32px] rounded-full inline-block'
        />
        <span className='px-2 font-semibold font-sans'>Username</span>
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

const MidSection = ({ listHabit, handleCheck }: { listHabit: IHabit[]; handleCheck: (a: any) => void }) => {
  return (
    <div className='mt-3 text-sm font-medium'>
      <div className='p-2 rounded-md bg-[#177e89] text-white'>
        <p className='font-bold text-lg'>Active Habits - {listHabit.filter(h => !h.completed).length}</p>
        <ul className='text-black'>
          {listHabit &&
            listHabit.map(habit => (
              <li
                key={String(habit._id)}
                onClick={handleCheck}
                className={`transition-colors p-2 hover:bg-green-400 cursor-pointer flex justify-between items-center my-2 rounded-sm ${
                  habit.completed ? 'opacity-50 bg-green-400' : 'bg-[#ffc857]'
                } 
            `}
              >
                <p className='text-base pointer-events-none select-none'>
                  {habit.title} - <span className='font-bold'>{}</span>
                </p>
                <label
                  htmlFor={habit._id as unknown as string}
                  className='transition-colors w-[24px] h-[24px] bg-neutral-100 block rounded-md pointer-events-none select-none'
                >
                  {habit.completed && <i className='fa-solid fa-check p-1'></i>}
                </label>
                <input type='checkbox' name={String(habit._id)} id={String(habit._id)} className='hidden pointer-events-none select-none' />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

const BotSection = ({ modalState, setModalState }: { modalState: Boolean; setModalState: (state: Boolean) => void }) => (
  <div className='text-medium text-white font-semibold'>
    {modalState && (
      <button className='block w-full mb-5 px-2 py-3 rounded-md hover:bg-[#ffc857] bg-[#177e89] hover:text-black hover:cursor-pointer transition-colors'>
        Add Habit
      </button>
    )}
    <button
      onClick={() => setModalState(!modalState)}
      className={`block w-full px-2 py-3 rounded-md hover:bg-[#ffc857] ${
        modalState ? 'bg-red-500' : 'bg-[#177e89]'
      } hover:text-black text-white hover:cursor-pointer transition-colors`}
    >
      {modalState ? <i className='fa-solid fa-xmark'></i> : <i className='fa-solid fa-plus'></i>}
      <span className='px-2'>{modalState ? 'Cancel' : 'New Habit'}</span>
    </button>
  </div>
)

export default ({ modalState, setModalState }: { modalState: Boolean; setModalState: any }) => {
  const config = { params: { email: 'Judson.Kirlin@gmail.com' } }
  const [listHabit, setListHabit] = useState<IHabit[]>([])

  useEffect(() => {
    Habit.read(config)
      .then(res => res.data)
      .then(res => setListHabit(res.data))
  }, [])

  const handleCheck = function ({ target }: any) {
    const checkbox = target.querySelector('input[type=checkbox]')
    const updated = listHabit.map(habit => {
      if (checkbox.id == habit._id) {
        habit.completed = checkbox.checked = !checkbox.checked
      }
      return habit
    })

    setListHabit(updated)
  }
  return (
    <div id='sidebar' className='z-50 col-span-1 bg-[#084c61] text-white p-2.5 min-h-screen font-sans'>
      <TopSection />
      <hr className='opacity-50 my-3' />
      <MidSection listHabit={listHabit} handleCheck={handleCheck} />
      <hr className='opacity-50 my-3' />
      <BotSection modalState={modalState} setModalState={setModalState} />
    </div>
  )
}
