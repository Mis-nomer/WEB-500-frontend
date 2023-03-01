import { GlobalStateContext } from '../contexts/globalContext'
import { useActor } from '@xstate/react'
import { useEffect, useContext } from 'react'

const selectOptions = ['checklist', 'note', 'tracker']

export const InputBox = () => {
  const globalServices = useContext(GlobalStateContext)
  const [state, send] = useActor(globalServices.centralService)

  useEffect(() => {
    console.log(state.context)
  }, [state.value])

  // let a = (
  //   <main className='flex -mt-20 h-full justify-center items-center'>
  //     <p>{state.context.loading}</p>
  //     <div className='input-box border-2 border-black opacity-0 relative bg-white h-[40vh]'>
  //       {!state.context.boxSetup && (
  //         <div className='input-box__control grid text-2xl max-md:text-lg h-full w-full items-stretch grid-rows-2 text-center'>
  //           <div className='transition-colors hover:bg-black hover:text-white hover:cursor-pointer relative input-box__content opacity-0 font-main'>
  //             <button onClick={() => send('CLICK')} className='vertical-center'>
  //               new box
  //             </button>
  //           </div>
  //           <div className='transition-colors hover:bg-black hover:text-white hover:cursor-pointer relative input-box__content opacity-0 font-main'>
  //             <button className='vertical-center'>get box</button>
  //           </div>
  //         </div>
  //       )}

  //       <div className='relative top-0'>
  //         <div className='widget-divider opacity-0 border-b-2 border-black top-11 absolute w-full'></div>
  //         <ul className='widget text-lg max-md:text-sm items-baseline flex flex-row justify-between p-2'>
  //           <li id='note' className='opacity-0 cursor-pointer'>
  //             <button onClick={() => send({ type: 'SELECT', data: -1 })}>
  //               <i className='-mr-10 max-md:mr-0 max-md:text-md fa-solid fa-arrow-left-long'></i>
  //             </button>
  //           </li>
  //           <li id='checklist' className='opacity-0 cursor-pointer font-2'>
  //             {selectOptions[Math.abs(state.context.select % 3)]}
  //           </li>
  //           <li className='opacity-0 cursor-pointer'>
  //             <button onClick={() => send({ type: 'SELECT', data: 1 })}>
  //               <i className='-ml-10 max-md:ml-0 max-md:text-md fa-solid fa-arrow-right-long'></i>
  //             </button>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </main>
  // )
  return <img className='cardboard-box' src='/public/boxes/white_opened_box.svg' alt='' />
}
