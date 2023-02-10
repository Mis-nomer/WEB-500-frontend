import { IHabit } from '../../api/interface'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import { useMachine } from '@xstate/react'
import { centralMachine } from '../../controllers/controller'
import '../../styles/home.css'
import MarqueeWall from './MarqueeWall'

const Home = () => {
  const [color, setColor] = useState('#23223a')
  const [state, send] = useMachine(centralMachine)

  useEffect(() => {
    send('ACTIVATE')
  }, [state])

  return (
    <div className='home h-screen overflow-y-hidden'>
      <Toaster />
      <h1 className='text-7xl font-main bg-white px-2 py-1'>.quietbox</h1>
      <div className='relative'>
        {state.context.loading ? (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <BarLoader speedMultiplier={0.7} width={'15vmax'} loading={state.context.loading} aria-label='Loading Spinner' data-testid='loader' />
          </div>
        ) : (
          <MarqueeWall resource={state.context.resource} />
        )}
      </div>
    </div>
  )
}

export default Home
