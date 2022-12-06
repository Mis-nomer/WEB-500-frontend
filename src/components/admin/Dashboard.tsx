import React, { ReactEventHandler, useEffect, useState } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import AdminSidebar from './AdminSidebar'
import User from '../../controllers/controller'
import toast, { Toaster } from 'react-hot-toast'

interface IUser {
  name: string
  email: string
  avatar: string
  createdDate: Date
  role: number
}
const Dashboard = () => {
  const [userData, setUserData] = useState<IUser[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    User.read('/users/').then(res =>
      setUserData(res.data.filter((user: IUser) => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)))
    )
  }, [search])

  const handleDelete = (user: {}) => {
    if (confirm('Confirm action')) {
      User.delete('/users/', user)
      User.read('/users/').then(res => setUserData(res.data))
      toast('User deleted!')
    }
  }

  const handleSearch = (e: React.ChangeEvent) => {
    let input = e.target?.value
    setSearch(input)
  }

  return (
    <>
      {/* <header className='fixed top-14 left-0 text-center right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between'>
        <div className='flex items-center text-lg text-gray-600'>
          <h1>Dashboard</h1>
        </div>
      </header> */}
      <div className='grid lg:grid-cols-5 grid-cols-1'>
        <Toaster />
        <AdminSidebar></AdminSidebar>
        <div className='p-6 mt-10 overflow-hidden col-span-4 text-center'>
          <section className='flex justify-evenly flex-wrap bg-white mt-5 rounded-md p-5'>
            <div className='w-full md:w-[32%]'>
              <p className='font-semibold text-xl mb-2'>User Analytics</p>
            </div>
            <div className='bg-white p-8 rounded-md w-full'>
              <div className=' flex items-center justify-between pb-6'>
                <div>
                  <h2 className='text-gray-600 font-semibold'>User list</h2>
                  <span className='text-xs'>All user</span>
                </div>
                <div className='flex items-center'>
                  <div className='flex bg-neutral-100 items-center p-2 rounded-md'>
                    <input
                      onChange={e => handleSearch(e)}
                      className='bg-neutral-100 outline-none block'
                      type='text'
                      name=''
                      id=''
                      placeholder='search user...'
                    />
                  </div>
                  <div className='lg:ml-10 space-x-8 justify-self-start'>
                    <button className='hover:brightness-90 bg-[#ffc857] px-4 py-2 rounded-md text-black font-semibold tracking-wide cursor-pointer'>
                      Create
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                  <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                    <table className='min-w-full leading-normal'>
                      <thead>
                        <tr>
                          <th className='px-5 py-3 border-b-2 border-gray-200 bg-neutral-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Username
                          </th>
                          <th className='px-5 py-3 border-b-2 border-gray-200 bg-neutral-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Role
                          </th>
                          <th className='px-5 py-3 border-b-2 border-gray-200 bg-neutral-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Email
                          </th>
                          <th className='px-5 py-3 border-b-2 border-gray-200 bg-neutral-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Habits
                          </th>
                          <th className='px-5 py-3 border-b-2 border-gray-200 bg-neutral-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData &&
                          userData.map(user => (
                            <tr key={user.name} className='text-left'>
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <div className='flex items-center'>
                                  <div className='flex-shrink-0 w-10 h-10'>
                                    <img className='w-full h-full rounded-full' src={user.avatar} alt='' />
                                  </div>
                                  <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap'>{user.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                                <p className='text-gray-900 whitespace-no-wrap'>{user.role ? 'Admin' : 'User'}</p>
                              </td>
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <p className='text-gray-900 whitespace-no-wrap'>{user.email}</p>
                              </td>
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <span className='relative'></span>
                              </td>
                              <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                <button className='block mb-2 hover:translate-y-1 hover:ring-2 ring-indigo-400  border-b-2 border-indigo-400 px-4 py-2 rounded-md text-indigo-400 font-semibold tracking-wide cursor-pointer transition-all'>
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(user)
                                  }}
                                  disabled={!!user.role}
                                  className={`${
                                    user.role ? 'opacity-40 pointer-event-none' : 'cursor-pointer hover:translate-y-1 hover:ring-2 ring-red-400'
                                  } block mb-2 border-b-2 border-red-400 px-4 py-2 rounded-md text-red-400 font-semibold tracking-wide  transition-all`}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          '>
                      {/* <span className='text-xs xs:text-sm text-gray-900'>Showing 1 to 4 of 50 Entries</span> */}
                      <div className='inline-flex mt-2 xs:mt-0'>
                        <button className='text-sm text-black transition duration-150 hover:translate-y-1 hover:ring-2 ring-[#ffc857] border-b-2 border-[#ffc857] font-semibold py-2 px-4 rounded-l'>
                          Prev
                        </button>
                        &nbsp; &nbsp;
                        <button className='text-sm text-black transition duration-150 hover:translate-y-1 hover:ring-2 ring-[#ffc857] border-b-2 border-[#ffc857] font-semibold py-2 px-4 rounded-r'>
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Dashboard
