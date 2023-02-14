import { centralMachine } from '../controllers/controller'
import React, { createContext } from 'react'
import { useInterpret } from '@xstate/react'
import { ActorRefFrom } from 'xstate'

interface GlobalStateContextType {
  centralService: ActorRefFrom<typeof centralMachine>
}

export const MachineContext = createContext({} as GlobalStateContextType)

export const GlobalStateProvider = (props: any) => {
  const centralService = useInterpret(centralMachine)

  return <MachineContext.Provider value={{ centralService }}>{props.children}</MachineContext.Provider>
}
