import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import anime from 'animejs'

const Greet = () => {
  const xMax = 16

  useEffect(() => {
    const tl = anime.timeline({
      duration: 5000,
    })
    tl.add({
      targets: '.boxtrox',
      translateY: 250,
      duration: 1000,
      direction: 'forward',
      easing: 'spring(1, 80, 10, 0)',
    })
    tl.add({
      targets: '.logo',
      translateX: [xMax * -1, xMax, xMax / -2, xMax / 2, 0],
      easing: 'easeInOutSine',
      loop: 10,
      duration: 550,
    })
    tl.add(
      {
        targets: '.auth',
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 300,
      },
      3500
    )
  }, [])
  return (
    <div className='bg-[#ffc857] w-screen h-screen overflow-hidden'>
      <div className='boxtrox w-2/12 mx-auto'>
        <span className='text-2xl font-bold'>Starting a new habit?</span>
        <span className='text-sm font-medium opacity-50 '>Track your progress with</span>
        <Link to='home'>
          <img src='./logo-black.png' className='logo mt-3' />
        </Link>
        <div className='auth opacity-0 mt-10'>
          <p className='bg-neutral-800 text-white px-3 py-1 flex items-center justify-between rounded-md'>
            <span className='text-[#ffc857]'>
              <Link to='signin'>Login</Link>
            </span>
            <span className=' text-[#ffc857] bg-neutral-800'>
              <Link to='signup'>Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Greet
