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
      <div className='boxtrox w-3/12 mx-auto'>
        <span className='text-2xl font-bold'>Starting a new habit?</span>
        <span className='text-sm mt-1 font-medium px-1 py-1.5 text-[#084c61] w-full block'>Track your progress with</span>
        <Link to='home'>
          <img src='./logo-black.png' className='logo hover:invert' />
        </Link>
        <div className='auth opacity-0 mt-10'>
          <div className='text-[#084c61] grid grid-cols-2 items-center rounded-m font-semibold'>
            <button className='px-1 py-1.5 hover:border-[#084c61] hover:-skew-x-3 hover:-skew-y-3 border-r-4 border-transparent hover:-translate-x-2 transition-all'>
              <Link to='login'>Login</Link>
            </button>
            <button className='px-1 py-1.5 hover:skew-x-3 hover:skew-y-3 hover:border-[#084c61] border-l-4 border-transparent hover:translate-x-2 transition-all'>
              <Link to='sign-up'>Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Greet
