import React, { useEffect, useState } from 'react'
import Habit from '../../controllers/item.controller'

const habits = [
  {
    id: 1,
    title: 'Wake Up',
    time: '7:30',
    completed: false,
  },
  {
    id: 2,
    title: 'Practice Coding',
    time: '8:23',
    completed: false,
  },
  {
    id: 3,
    title: 'Lunch',
    time: '10:44',
    completed: false,
  },
]

export default ({ modalState, setModalState }: { modalState: Boolean; setModalState: any }) => {
  const [listHabit, setListHabits] = useState(habits)

  const handleCheck = function ({ target }: any) {
    const checkbox = target.querySelector('input[type=checkbox]')

    const updated = listHabit.map(habit => {
      if (checkbox.id == habit.id) {
        habit.completed = checkbox.checked = !checkbox.checked
      }
      return habit
    })

    setListHabits(updated)
  }
  return (
    <div id='sidebar' className='z-50 col-span-1 bg-[#084c61] text-white p-2.5 min-h-screen font-sans'>
      <div className='bg-[#ffc857] px-2 py-3 rounded-md flex justify-between items-center text-black'>
        <div className=''>
          <img
            src='https://i.ytimg.com/an_webp/kvkAoCbTM3Q/mqdefault_6s.webp?du=3000&sqp=CMi09ZsG&rs=AOn4CLBnmrjEuBCvgjK2AUloRMI-WcCu6Q'
            alt=''
            className='object-cover w-[32px] h-[32px] rounded-full inline-block'
          />
          <span className='px-2 font-semibold font-sans'>Username1</span>
        </div>
        <div className='hover:scale-125 transition-transform cursor-pointer'>
          <i className='fa-solid fa-user-gear'></i>
        </div>
      </div>
      <div className=' mt-3 text-sm font-medium'>
        <div className='p-2 rounded-md hover:bg-[#177e89] hover:cursor-pointer transition-colors'>
          <i className='fa-regular fa-calendar pointer-events-none'></i>
          <span className='px-3 pointer-events-none'>All Habits</span>
        </div>
        <div className='p-2 rounded-md hover:bg-[#177e89] hover:cursor-pointer transition-colors'>
          <i className='fa-regular fa-bookmark'></i>
          <span className='px-3'>Labels</span>
        </div>
        <hr className='opacity-50 my-3' />
        <div className='p-2 rounded-md bg-[#177e89] text-white'>
          <p className='font-bold text-lg'>Active Habits - {listHabit.filter(h => !h.completed).length}</p>
          <ul className='text-black'>
            {listHabit &&
              listHabit.map(habit => (
                <li
                  key={habit.id}
                  onClick={handleCheck}
                  className={`transition-colors p-2 hover:bg-green-400 cursor-pointer 
                    flex justify-between items-center my-2 rounded-sm 
                    ${habit.completed ? 'opacity-50 bg-green-400' : 'bg-[#ffc857]'} 
                  `}
                >
                  <p className='text-base pointer-events-none select-none'>
                    {habit.title} - <span className='font-bold'>{habit.time}</span>
                  </p>
                  <label
                    htmlFor={habit.id as unknown as string}
                    className='transition-colors w-[24px] h-[24px] bg-neutral-100 block rounded-md pointer-events-none select-none'
                  >
                    {habit.completed && <i className='fa-solid fa-check p-1'></i>}
                  </label>
                  <input
                    type='checkbox'
                    name='habit.completed'
                    id={habit.id as unknown as string}
                    className='hidden pointer-events-none select-none'
                  />
                </li>
              ))}
          </ul>
        </div>
        <hr className='opacity-50 my-3' />
        <button
          onClick={() => setModalState(!modalState)}
          className={`block w-full px-2 py-3 rounded-md hover:bg-[#ffc857] ${
            modalState ? 'bg-red-500' : 'bg-[#177e89]'
          } hover:text-black text-white hover:cursor-pointer transition-colors`}
        >
          {modalState ? <i className='fa-solid fa-xmark'></i> : <i className='fa-solid fa-plus'></i>}
          <span className='px-2 text-base font-semibold'>{modalState ? 'Cancel' : 'New Habit'}</span>
        </button>
        {modalState && (
          <button className='text-medium block mt-4 w-full px-2 py-3 rounded-md hover:bg-[#ffc857] bg-[#177e89] hover:text-black text-white hover:cursor-pointer transition-colors'>
            Add Habit
          </button>
        )}
      </div>
    </div>
  )
}
