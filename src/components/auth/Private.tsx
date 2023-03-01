import { Navigate } from 'react-router-dom'

interface IProps {
  token: string | null
  redirectPath?: string
  children: JSX.Element
}

export const PrivateRoute = ({ token, redirectPath = '/', children }: IProps) => {
  return token ? children : <Navigate to={redirectPath} replace />
}
