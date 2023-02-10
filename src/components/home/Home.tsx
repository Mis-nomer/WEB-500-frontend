import { IHabit } from '../../api/interface'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import { useMachine } from '@xstate/react'
import { centralMachine } from '../../controllers/controller'
import '../../styles/home.css'
import MarqueeWall from './MarqueeWall'

const Home = () => {
  const [state, send] = useMachine(centralMachine)

  useEffect(() => {
    send('ACTIVATE')
  }, [])

  useEffect(() => {}, [state.value])

  return (
    <div className='home h-screen overflow-hidden'>
      <Toaster />
      <h1 className='text-7xl font-main bg-white px-5 py-3'>.noisybox</h1>
      {!state.context.loading && (
        <div className='grid place-items-center'>
          <div className='box hover:cursor-pointer absolute top-[7%] left-[14.25em] flex justify-center items-center z-50'>
            <div className='left face'></div>
            <div className='right face'></div>
            <div className='front face'></div>
            <div className='back face'></div>
            <div className='top face'>
              <span className='vertical-center'></span>
            </div>
            <div className='bottom face'></div>
          </div>
        </div>
      )}
      <div>
        // !Performance Heavy
        {state.context.loading ? (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <BarLoader
              speedMultiplier={0.5}
              height={2}
              width={'40vmin'}
              loading={state.context.loading}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </div>
        ) : !state.context.cleanup ? (
          <MarqueeWall resource={state.context.resource} />
        ) : (
          ''
        )}
      </div>
      {!state.context.loading && (
        <div className='input-box vertical-center bg-white opacity-0 w-0 h-[40vmin] border-2 border-black '>
          <div className='grid text-2xl h-full items-stretch grid-rows-2 text-center'>
            <div className='transition-colors hover:shadow-2xl hover:bg-black hover:text-white hover:cursor-pointer relative input-box__content opacity-0 font-main'>
              <button onClick={() => send('CLICK')} className='vertical-center'>
                new box
              </button>
            </div>
            <div className='transition-colors hover:shadow-2xl hover:bg-black hover:text-white hover:cursor-pointer relative input-box__content opacity-0 font-main'>
              <button className='vertical-center'>get box</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
