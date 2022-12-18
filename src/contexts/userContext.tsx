import { createContext } from 'react'
import { IUser } from '../api/interface'
export const UserContext = createContext<{
  user?: IUser
  setUser?: React.Dispatch<React.SetStateAction<IUser>>
}>({})
