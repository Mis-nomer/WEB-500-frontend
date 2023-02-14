import { Toaster } from 'react-hot-toast'
import { useEffect, useContext } from 'react'
import { BarLoader } from 'react-spinners'
import '../../styles/home.css'
import { MachineContext } from '../../contexts/globalContext'
import { useActor } from '@xstate/react'
import { InputBox } from '../InputBox'

import MarqueeWall from '../MarqueeWall'

const Home = () => {
  const globalServices = useContext(MachineContext)
  const [state, send] = useActor(globalServices.centralService)

  useEffect(() => {
    if (state.matches('Idle')) send('ACTIVATE')
  }, [state.value])

  return (
    <div className='home h-screen overflow-hidden relative'>
      <Toaster />
      <nav>
        <h1 className='text-7xl font-main bg-white px-5 py-3'>.quietbox</h1>
        <div className='logo-box bg-white fixed top-[7%] left-[14em]'>
          <div className='box hover:cursor-pointer flex justify-center items-center z-50'>
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
      </nav>
      {/* // !Performance Heavy */}
      {state.context.loading && (
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
      )}
      {!(state.context.boxSetup && state.context.loading) && (
        <div className='absolute -z-50'>
          <MarqueeWall resource={state.context.text} />
        </div>
      )}
      <InputBox />
    </div>
  )
}

export default Home
