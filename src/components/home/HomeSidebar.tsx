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
          src='https://d33wubrfki0l68.cloudfront.net/56b13b3bf4c6a968ed185545896004efbe836a25/c7537/assets/rob@120w.c8436c81.webp'
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
    <div className='my-10 text-sm font-medium'>
      <div className='p-2 rounded-md bg-[#177e89] text-white'>
        <p className='font-bold text-lg'>Today's Habits - {listHabit.filter(h => !h.completed).length}</p>
        <ul className='text-black mx-1  '>
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

const BotSection = ({ modalState, setModalState }: { modalState: Boolean; setModalState: any }) => {
  return (
    <div>
      <button
        onClick={() => setModalState(!modalState)}
        className={`block w-full px-2 py-3 rounded-md hover:bg-[#ffc857] ${
          modalState ? 'bg-red-500' : 'bg-[#177e89]'
        } hover:text-black text-white hover:cursor-pointer transition-colors`}
      >
        {modalState ? 'Cancel' : 'New Habit'}
      </button>
    </div>
  )
}

export default ({
  modalState,
  setModalState,
  listHabit,
  setListHabit,
}: {
  modalState: Boolean
  setModalState: any
  listHabit: IHabit[]
  setListHabit: any
}) => {
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
