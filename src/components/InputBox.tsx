import { MachineContext } from '../contexts/globalContext'
import { useActor } from '@xstate/react'
import { BarLoader } from 'react-spinners'
import { useEffect, useContext } from 'react'

export const InputBox = () => {
  const globalServices = useContext(MachineContext)
  const [state, send] = useActor(globalServices.centralService)

  useEffect(() => {
    console.log(state.value)
  }, [state.value])

  return (
    <main className='flex -mt-20 h-full justify-center items-center'>
      <div className='input-box relative bg-white w-0 h-[40vmin]'>
        {!state.context.boxSetup && (
          <div className='input-box__control grid text-2xl h-full w-full items-stretch grid-rows-2 text-center'>
            <div className='transition-colors hover:bg-black hover:text-white hover:cursor-pointer relative input-box__content opacity-0 font-main'>
              <button onClick={() => send('CLICK')} className='vertical-center'>
                new box
              </button>
            </div>
            <div className='transition-colors hover:bg-black hover:text-white hover:cursor-pointer relative input-box__content opacity-0 font-main'>
              <button className='vertical-center'>get box</button>
            </div>
          </div>
        )}
        {!state.context.boxSetup ? (
          <BarLoader
            speedMultiplier={0.5}
            height={2}
            width={'100%'}
            loading={state.context.boxSetup}
            aria-label='Loading Spinner Box'
            data-testid='loader-box'
          />
        ) : (
          <div className=''>
            <ul className='widget absolute -top-6 items-baseline font-main text-lg flex flex-row gap-4'>
              <li className='hover:cursor-pointer hover:-translate-y-2 transition-transform pb-2'>Checklist</li>
              <li className='hover:cursor-pointer'>Note</li>
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}
