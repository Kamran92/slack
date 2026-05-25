import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../../app/providers/AuthProvider'
import routes from '../../../app/routes'

export const AccessGuard = ({ children }) => {
  const auth = useContext(AuthContext)

  if (auth.user === null) {
    return <Navigate to={routes.login} />
  }

  return children
}