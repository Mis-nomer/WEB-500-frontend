import React, { isValidElement } from 'react'
import { Link } from 'react-router-dom'
import User from '../../instance'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'react-hot-toast'
interface IUser {
  email: string
  password: string
}

//
const Login = () => {
  const { register, handleSubmit } = useForm()
  const nav = useNavigate()
  const onSubmit = (data: IUser) => {
    User.post('/signin', data)
      .then(res => {
        toast.success('Login Successful')
        setTimeout(() => nav('/home'), 1000)
      })
      .catch(res => {
        if (res.status >= 400) {
          toast.error(res.response ? res.response.data : 'Cannot connect to the server. Please try again later')
        }
      })
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <Toaster />
      <div className='w-90% md:w-[526px] bg-white p-8 rounded-md shadow-xl'>
        <div className='flex gap-4 items-center w-fit ml-auto mb-6 text-xs md:text-sm'>
          Need an account ?
          <Link
            to='/sign-up'
            className='px-4 py-1 border border-neutral-900 rounded-md text-xs md:text-sm 
                        hover:bg-[#177e89] hover:text-white hover:border-[#177e89]'
          >
            Sign Up
          </Link>
        </div>
        <h1 className='text-neutral-900 font-semibold text-xl md:text-3xl leading-none mb-2'>Login</h1>
        <h2 className='text-neutral-500 font-normal text-sm md:text-lg leading-none mb-2'>Please fill in this form to sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-4 flex-col items-center relative pt-4 pb-6 mb-6 border-b border-neutral-200'>
            <input
              {...register('email', {
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
              type='email'
              placeholder='Email'
              className='p-2 w-full border border-neutral-900 rounded-md text-sm leading-none'
            />
            <input
              {...register('password', { required: true })}
              type='password'
              autoComplete='true'
              placeholder='Password'
              className='p-2 w-full border border-neutral-900 rounded-md text-sm'
            />
            <input type='submit' value='Login' className='cursor-pointer px-5 py-1.5 bg-[#ffc857] rounded-md font-semibold' />
            <h1 className='absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-full bg-white px-3 text-neutral-400 font-normal text-sm md:text-base leading-none'>
              OR LOGIN WITH
            </h1>
          </div>
        </form>
        <div className='flex gap-4 flex-col items-center'>
          <button className='bg-[#177e89] px-6 py-2 rounded-md text-white transition-all hover:bg-[#084c61] block w-2/3'>
            Login using Google Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
