import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Collapsible from 'react-collapsible'
const SignUp = () => {
  const signUpFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
    control,
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className=' min-h-screen flex justify-center items-center'>
      <div className='w-90% md:w-[526px] bg-white p-8 rounded-md shadow-xl'>
        <div className='flex gap-4 items-center w-fit ml-auto mb-6 text-xs md:text-sm'>
          Already have an account ?
          <Link
            to='/login'
            className='px-4 py-1 border border-neutral-900 rounded-md text-xs md:text-sm 
                        transition-all hover:bg-[#177e89] transition-all hover:text-white transition-all hover:border-[#177e89]'
          >
            Login
          </Link>
        </div>
        <h1 className='text-neutral-900 font-semibold text-xl md:text-3xl leading-none mb-2'>Sign Up</h1>
        <h2 className='text-neutral-500 font-normal text-sm md:text-lg leading-none mb-2'>Please fill in this form to create an account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className=''>
          <div className='flex gap-4 flex-col items-center relative pt-4 pb-6 mb-6 border-b border-neutral-200'>
            <input
              type='email'
              {...register('email')}
              required
              placeholder='Email'
              className='p-2 w-[30vw] border border-neutral-900 rounded-md text-sm leading-none'
            />
            <Collapsible
              trigger={
                <input
                  type='password'
                  {...register('password', {
                    required: true,
                  })}
                  placeholder='Password'
                  className='p-2 w-[30vw] border border-neutral-900 rounded-md text-sm'
                />
              }
            >
              <input
                type='password'
                {...register('confirmPassword', {
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Your passwords do not match'
                    }
                  },
                })}
                required
                placeholder='Confirm Password'
                className='p-2 w-full mt-4 border border-neutral-900 rounded-md text-sm'
              />
            </Collapsible>
            {errors.confirmPassword && <p className='bg-red-400 text-white p-2 w-[30vw] rounded-md'>Please enter a title</p>}
            <input type='submit' value='Submit' className='cursor-pointer px-5 py-1.5 bg-[#ffc857] rounded-md font-semibold' />
            <h1
              className='absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-max
                            bg-white px-3 text-neutral-400 font-normal text-sm md:text-base leading-none'
            >
              OR SIGN UP WITH
            </h1>
          </div>
        </form>
        <div className='flex gap-4 flex-col items-center'>
          <button className='bg-[#177e89] px-6 py-2 rounded-md text-white transition-all hover:bg-[#084c61] block w-2/3'>
            Sign up using Google Account
          </button>
          <button className='bg-[#177e89] px-6 py-2 rounded-md text-white transition-all hover:bg-[#084c61] block w-2/3'>
            Quick Sign Up and Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
