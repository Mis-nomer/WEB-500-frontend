import { Toaster } from 'react-hot-toast'
import { useEffect, useContext, useRef } from 'react'
import '../../styles/home.css'
import { GlobalStateContext } from '../../contexts/globalContext'
import { useActor } from '@xstate/react'
import { InputBox } from '../InputBox'
import { BarLoader } from 'react-spinners'
import { SpinningBox } from '../SpinningBox'

const Home = () => {
  const globalServices = useContext(GlobalStateContext)
  const [state, send] = useActor(globalServices.centralService)

  useEffect(() => {
    if (state.matches('Idle')) send('ACTIVATE')
  }, [state.value])

  return (
    <div className='home h-screen overflow-hidden relative'>
      <Toaster />
      <nav className='absolute z-10'>
        <h1 className='text-7xl bg-white font-main px-5 py-3 w-fit'>
          quietb<span className='opacity-0'>o</span>x
        </h1>
        <div className='logo-box fixed top-[2.75rem] left-[13rem] py-3'>
          <SpinningBox></SpinningBox>
        </div>
      </nav>
      <div className='box2 scale-[400%] absolute top-1/2 left-1/2'>
        <SpinningBox
          callback={() => {
            send('ACTIVATE')
          }}
        ></SpinningBox>
      </div>

      {/* <CardBoardBox></CardBoardBox> */}
      {/* <MarqueeWall text={state.context.text} /> */}
      {/* <canvas className='fixed top-0 left-0' id='bg'></canvas> */}
      {/* <InputBox /> */}
    </div>
  )
}

export default Home
